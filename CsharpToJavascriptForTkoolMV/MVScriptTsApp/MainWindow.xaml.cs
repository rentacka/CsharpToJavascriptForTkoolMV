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
        public static string prjDir = @"E:\Mydocument\RPGMV\Test";

        TkoolJson tkoolJson = new TkoolJson();

        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            NetJsCompiler.ender = Encoding.UTF8;
            TsToJsAssist.ender = Encoding.UTF8;

            string prjDll = Path.Combine(System.Windows.Forms.Application.StartupPath, "TkoolOfJavascriptTheCross.dll");

            var config = new NetJsCompiler.Config();
            config.AssembliesToDecompile.Add(prjDll);

            NetJsCompiler netJs = new NetJsCompiler();

            // TkoolOfJavascriptTheCross.dllから、TkoolOfJavascriptTheCross.tsを作成
            netJs.Run(config);

            var startPath = System.Windows.Forms.Application.StartupPath;
            var TsToJsProjPath = System.IO.Path.Combine(startPath, "TypescriptToJs");

            var inTsPath = Path.Combine(startPath, "TkoolOfJavascriptTheCross.ts");
            var outTsPath = Path.Combine(TsToJsProjPath, "TkoolOfJavascriptTheCross.ts");

            // TypescriptToJsにTkoolOfJavascriptTheCross.tsをコピー
            File.Copy(inTsPath, outTsPath, true);

            // static void Main()を削除して、即時関数にして文末に書き込み
            TsToJsAssist.ToImmediateMethod(outTsPath);

            var dirInfo = new DirectoryInfo(GamePathTextbox.Text);
            var winPath = Path.Combine(dirInfo.Parent.FullName, dirInfo.Name + "_Win");
            var winExePath = Path.Combine(winPath, dirInfo.Name);
            var wwwPath = Path.Combine(winExePath, "www");

            // TypescriptToJsをMSビルド
            var tsBuildBatPath = Path.Combine(TsToJsProjPath, "TsBuild.bat");
            StreamWriter sw = new StreamWriter(tsBuildBatPath, false, TsToJsAssist.ender);
            sw.WriteLine("chcp 65001");
            sw.WriteLine(@"""" + @"C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\MSBuild\15.0\Bin\MSBuild.exe" + @"""" + " " + @"""" + Path.Combine(TsToJsProjPath, "TypescriptToJs.csproj") + @"""" + " " + "/property:Configuration=Release");
            sw.WriteLine("pause");
            sw.Close();
            Process.Start(tsBuildBatPath).WaitForExit();

            // E:\Mydocument\RPGMV\Test\TestにJsをコピー
            File.Copy(Path.Combine(TsToJsProjPath, "TkoolOfJavascriptTheCross.js"), Path.Combine(dirInfo.FullName, @"js\plugins\TkoolOfJavascriptTheCross.js"), true);
            // mscorelib.jsをコピー
            File.Copy(Path.Combine(TsToJsProjPath, "mscorlib.js"), Path.Combine(dirInfo.FullName, @"js\plugins\mscorlib.js"), true);

            TkoolPluginJs tkoolPlugins = new TkoolPluginJs();
            tkoolPlugins.Load();
            // tkoolPlugins.Add("lib.d");
            tkoolPlugins.Add("mscorlib");
            tkoolPlugins.Add("TkoolOfJavascriptTheCross");
            tkoolPlugins.Save();
        }

        private void GamePathTextbox_TextChanged(object sender, System.Windows.Controls.TextChangedEventArgs e)
        {
            prjDir = GamePathTextbox.Text;
        }

        private void TkoolRunButton_Click(object sender, RoutedEventArgs e)
        {
            Process.Start(System.IO.Path.Combine(@"C:\Program Files (x86)\KADOKAWA\RPGMV", "RPGMV Launch.exe"));
        }
    }
}