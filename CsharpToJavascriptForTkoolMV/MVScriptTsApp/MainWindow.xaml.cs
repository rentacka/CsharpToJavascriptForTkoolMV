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
using System.Diagnostics;
using System.IO.Compression;
using jsCallEditor;

namespace MVScriptTsApp
{
    /// <summary>
    /// MainWindow.xaml の相互作用ロジック
    /// </summary>
    public partial class MainWindow : Window
    {
        public static string prjDir = @"E:\Mydocument\RPGMV\Test\Test";

        string prjDll = Path.Combine(System.Windows.Forms.Application.StartupPath,"TkoolOfJavascriptTheCross.dll");

        TkoolJson tkoolJson = new TkoolJson();

        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            NetJsCompiler.ender = Encoding.UTF8;
            TsToJsAssist.ender = Encoding.UTF8;

            var config = new NetJsCompiler.Config();
            config.AssembliesToDecompile.Add(prjDll);

            NetJsCompiler netJs = new NetJsCompiler();

            // TkoolOfJavascriptTheCross.dllから、TkoolOfJavascriptTheCross.tsを作成
            netJs.Run(config);

            var startPath = System.Windows.Forms.Application.StartupPath;
            var startTsPath = Path.Combine(startPath, "TkoolOfJavascriptTheCross.ts");
            var outTsPath = Path.Combine(TsToJsProjPathTextbox2.Text, "TkoolOfJavascriptTheCross.ts");

            // TypescriptToJsにTkoolOfJavascriptTheCross.tsをコピー
            File.Copy(startTsPath, outTsPath, true);

            // static void Main()を削除して、即時関数にして文末に書き込み
            TsToJsAssist.ToImmediateMethod(outTsPath);

            var dirInfo = new DirectoryInfo(GamePathTextbox.Text);
            var winPath = Path.Combine(dirInfo.Parent.FullName, dirInfo.Name + "_Win");
            var winExePath = Path.Combine(winPath, dirInfo.Name);
            var wwwPath = Path.Combine(winExePath, "www");

            // TypescriptToJsをMSビルド
            Process.Start(Path.Combine(TsToJsProjPathTextbox2.Text,"TsBuild.bat")).WaitForExit();

            // E:\Mydocument\RPGMV\Test\TestにJsをコピー
            File.Copy(Path.Combine(TsToJsProjPathTextbox2.Text, "TkoolOfJavascriptTheCross.js"), Path.Combine(dirInfo.FullName, @"js\plugins\TkoolOfJavascriptTheCross.js"), true);
            File.Copy(Path.Combine(dirInfo.FullName, @"js\plugins\TkoolOfJavascriptTheCross.js"), Path.Combine(wwwPath, @"js\plugins\TkoolOfJavascriptTheCross.js"), true);
            // mscorelib.jsをコピー
            File.Copy(Path.Combine(TsToJsProjPathTextbox2.Text, "mscorlib.js"), Path.Combine(dirInfo.FullName, @"js\plugins\mscorlib.js"), true);
            File.Copy(Path.Combine(dirInfo.FullName, @"js\plugins\mscorlib.js"), Path.Combine(wwwPath, @"js\plugins\mscorlib.js"), true);

            /*
            // lib.d.tsをコピー
            File.Copy(Path.Combine(TsToJsProjPathTextbox2.Text, "lib.d.ts"), Path.Combine(dirInfo.FullName, @"js\plugins\lib.d.js"), true);
            File.Copy(Path.Combine(dirInfo.FullName, @"js\plugins\lib.d.js"), Path.Combine(wwwPath, @"js\plugins\lib.d.js"), true);
            */

            /*
                         var userlibPath = Path.Combine(TsToJsProjPathTextbox2.Text, "TkoolOfJavascriptTheCross.js");
            List<string> userlibData = new List<string>();
            // 読み込み
            StreamReader srMain0 = new StreamReader(userlibPath, TsToJsAssist.ender);
            while (srMain0.Peek() > -1)
            {
                var target = srMain0.ReadLine();
                userlibData.Add(target);
            }
            srMain0.Close();

            var libPath = Path.Combine(TsToJsProjPathTextbox2.Text, "mscorlib.js");
            List<string> libData = new List<string>();
            // 読み込み
            StreamReader srMain = new StreamReader(libPath, TsToJsAssist.ender);
            while (srMain.Peek() > -1)
            {
                var target = srMain.ReadLine();
                libData.Add(target);
            }
            srMain.Close();

            // 書き込み
            StreamWriter sw = new StreamWriter(Path.Combine(dirInfo.FullName, @"js\plugins\TkoolOfJavascriptTheCross.js"), false, TsToJsAssist.ender);
            foreach (var item in libData)
            {
                sw.WriteLine(item);
            }
            foreach (var item in userlibData)
            {
                sw.WriteLine(item);
            }
            sw.Close();
             */

            if (Directory.Exists(winPath) && Directory.Exists(winExePath))
            {
                TkoolPluginJs tkoolPlugins = new TkoolPluginJs();
                tkoolPlugins.Load();
               // tkoolPlugins.Add("lib.d");
                tkoolPlugins.Add("mscorlib");
                tkoolPlugins.Add("TkoolOfJavascriptTheCross");
                tkoolPlugins.Save();
            }
        }

        private void GamePathTextbox_TextChanged(object sender, System.Windows.Controls.TextChangedEventArgs e)
        {
            prjDir = GamePathTextbox.Text;
        }
    }
}