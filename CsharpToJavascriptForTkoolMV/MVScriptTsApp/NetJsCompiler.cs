using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using Mono.Cecil;
using ICSharpCode.Decompiler;
using Netjs;
using ICSharpCode.Decompiler.Ast;

namespace MVScriptTsApp
{
    class NetJsCompiler : IAssemblyResolver
    {
        public static Encoding ender = Encoding.UTF8;
        //Encoding ender = Encoding.UTF8;

        public class Config
        {
            public List<string> AssembliesToDecompile = new List<string>();
            public bool IncludeRefs = false;
        }

        public void Run(Config config)
        {
            string outPath = "";
            var asmPaths = new List<string>();

            foreach (var asmRelPath in config.AssembliesToDecompile)
            {
                var asmPath = Path.GetFullPath(asmRelPath);
                asmPaths.Add(asmPath);

                if (string.IsNullOrEmpty(outPath))
                {
                    outPath = Path.ChangeExtension(asmPath, ".ts");
                }

                var asmDir = Path.GetDirectoryName(asmPath);
                if (!asmSearchPaths.Exists(x => x.Item1 == asmDir))
                {
                    asmSearchPaths.Add(Tuple.Create(asmDir, config.IncludeRefs));
                }
            }

            Step("Reading IL");
            globalReaderParameters.AssemblyResolver = this;
            globalReaderParameters.ReadingMode = ReadingMode.Immediate;
            //globalReaderParameters.ReadSymbols = true;

              var libDir = Path.GetDirectoryName(typeof(String).Assembly.Location);
            asmSearchPaths.Add(Tuple.Create(libDir, false));
            asmSearchPaths.Add(Tuple.Create(Path.Combine(libDir, "Facades"), false));

            AssemblyDefinition firstAsm = null;
            foreach (var asmPath in asmPaths)
            {
                // 言語指定して読み込み
                using (var readAsmStream = new StreamReader(asmPath, ender))
                {
                    var asm = AssemblyDefinition.ReadAssembly(readAsmStream.BaseStream, globalReaderParameters);
                    if (firstAsm == null)
                        firstAsm = asm;
                    referencedAssemblies[asm.Name.Name] = asm;
                    decompileAssemblies.Add(asm);
                }
            }

            Step("Decompiling IL to C#");
            var context = new DecompilerContext(firstAsm.MainModule);
            context.Settings.ForEachStatement = false;
            context.Settings.ObjectOrCollectionInitializers = false;
            context.Settings.UsingStatement = false;
            context.Settings.AsyncAwait = false;
            context.Settings.AutomaticProperties = true;
            context.Settings.AutomaticEvents = true;
            context.Settings.QueryExpressions = false;
            context.Settings.AlwaysGenerateExceptionVariableForCatchBlocks = true;
            context.Settings.UsingDeclarations = false;
            context.Settings.FullyQualifyAmbiguousTypeNames = true;
            context.Settings.YieldReturn = false;
            var builder = new AstBuilder(context);
            var decompiled = new HashSet<string>();
            for (;;)
            {
                var a = decompileAssemblies.FirstOrDefault(x => !decompiled.Contains(x.FullName));
                if (a != null)
                {
                    Info("  Decompiling {0}", a.FullName);
                    // syntaxTreeへ追加
                    builder.AddAssembly(a);
                    decompiled.Add(a.FullName);
                }
                else
                {
                    break;
                }
            }
            builder.RunTransformations();

            Step("Translating C# to TypeScript");
            new CsToTs().Run(builder.SyntaxTree);

            Step("Writing");

            using (var outputWriter = new StreamWriter(outPath,false, ender))
            {
                var output = new PlainTextOutput(outputWriter);
                builder.GenerateCode(output, (s, e) => new TsOutputVisitor(s, e));
            }

            Step("Done");
        }

        #region Logging

        public static void Step(string message)
        {
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine(message);
            Console.ResetColor();
        }

        public static void Warning(string format, params object[] args)
        {
            Warning(string.Format(format, args));
        }

        public static void Warning(string message)
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine(message);
            Console.ResetColor();
        }

        public static void Error(string format, params object[] args)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine(format, args);
            Console.ResetColor();
        }

        public static void Info(string format, params object[] args)
        {
            Console.WriteLine(format, args);
        }

        #endregion

        readonly ReaderParameters globalReaderParameters = new ReaderParameters();
        readonly List<Tuple<string, bool>> asmSearchPaths = new List<Tuple<string, bool>>();
        readonly Dictionary<string, AssemblyDefinition> referencedAssemblies = new Dictionary<string, AssemblyDefinition>();
        readonly List<AssemblyDefinition> decompileAssemblies = new List<AssemblyDefinition>();
        #region IAssemblyResolver implementation
        public AssemblyDefinition Resolve(AssemblyNameReference name)
        {
            //Info ("R1: {0}", name);
            return Resolve(name, globalReaderParameters);
        }
        public AssemblyDefinition Resolve(AssemblyNameReference name, ReaderParameters parameters)
        {
            //Info ("R2: {0}", name);
            var n = name.Name;
            AssemblyDefinition asm;
            if (!referencedAssemblies.TryGetValue(n, out asm))
            {
                foreach (var x in asmSearchPaths)
                {
                    var asmDir = x.Item1;
                    var fn = Path.Combine(asmDir, name.Name + ".dll");
                    if (File.Exists(fn))
                    {
                        asm = AssemblyDefinition.ReadAssembly(fn, parameters);
                        referencedAssemblies[n] = asm;
                        if (x.Item2)
                        {
                            decompileAssemblies.Add(asm);
                        }
                        Info("    Loaded {0} (decompile={1})", fn, x.Item2);
                        break;
                    }
                }
                if (asm == null)
                {
                    Error("    Could not find assembly {0}", name);
                }
            }
            return asm;
        }
        public AssemblyDefinition Resolve(string fullName)
        {
            //Info ("R3: {0}", fullName);
            return null;
        }
        public AssemblyDefinition Resolve(string fullName, ReaderParameters parameters)
        {
            //Info ("R4: {0}", fullName);
            return null;
        }

        #endregion
    }
}
