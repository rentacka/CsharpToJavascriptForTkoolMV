using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVScriptTsApp
{
    public static class TsToJsAssist
    {
        public static Encoding ender = Encoding.UTF8;
        //Encoding.GetEncoding("Shift_JIS");

        public static void ToImmediateMethod(string startTsPath)
        {
            int iMain = 0;
            StreamReader srMain = new StreamReader(startTsPath, ender);
            while (srMain.Peek() > -1)
            {
                var target = srMain.ReadLine();
                if (target.Contains("Main(): void"))
                {
                    iMain++;
                }
            }
            srMain.Close();

            int iMain2 = 0;
            int iMainSpace = 0;
            // 読み込んでコンパイルエラーを削除
            StreamReader sr = new StreamReader(startTsPath, ender);
            List<string> lines = new List<string>();
            List<string> Mainlines = new List<string>();
            bool isTargetLine = false;
            while (sr.Peek() > -1)
            {
                var target = sr.ReadLine();
                if (target.Contains("Main(): void"))
                    iMain2++;

                if (iMain2 == iMain)
                {
                    if (isTargetLine == false)
                    {
                        //if (target.IndexOf("Main(): void") > -1 && target.IndexOf("private ") == -1 && target.IndexOf("public ") == -1)
                        //    iMainSpace = target.IndexOf("Main(): void");
                        //if (target.IndexOf("private Main(): void") > -1)
                        //    iMainSpace = target.IndexOf("private Main(): void");
                        if (target.IndexOf("static Main(): void") > -1 && target.IndexOf("private ") == -1 && target.IndexOf("public ") == -1)
                            iMainSpace = target.IndexOf("static Main(): void");
                        if (target.IndexOf("private static Main(): void") > -1)
                            iMainSpace = target.IndexOf("private static Main(): void");

                        if (target.IndexOf("static new Main(): void") > -1 && target.IndexOf("private ") == -1 && target.IndexOf("public ") == -1)
                            iMainSpace = target.IndexOf("static new Main(): void");
                        if (target.IndexOf("new static Main(): void") > -1 && target.IndexOf("private ") == -1 && target.IndexOf("public ") == -1)
                            iMainSpace = target.IndexOf("new  static Main(): void");

                        if (target.IndexOf("private static new Main(): void") > -1)
                            iMainSpace = target.IndexOf("private static new Main(): void");
                        if (target.IndexOf("new private static Main(): void") > -1)
                            iMainSpace = target.IndexOf("new private static Main(): void");
                        if (target.IndexOf("private new static Main(): void") > -1)
                            iMainSpace = target.IndexOf("private new static Main(): void");

                        //if (target.IndexOf("public static new Main(): void") > -1)
                        //    iMainSpace = target.IndexOf("public static new Main(): void");
                        //if (target.IndexOf("new public static Main(): void") > -1)
                        //    iMainSpace = target.IndexOf("new public static Main(): void");
                        //if (target.IndexOf("public new static Main(): void") > -1)
                        //    iMainSpace = target.IndexOf("public new static Main(): void");
                    }

                    isTargetLine = true;
                }

                if (isTargetLine)
                {
                    isTargetLine = true;
                }
                else
                    lines.Add(target);

                if (isTargetLine && target.Contains("Main(): void") == false)
                    Mainlines.Add(target);

                if (isTargetLine && target.IndexOf("}") == iMainSpace)
                {
                    isTargetLine = false;

                    iMain2 = -1;
                }
            }
            sr.Close();

            // 書き込み
            StreamWriter sw = new StreamWriter(startTsPath, false, ender);
            foreach (var item in lines)
            {
                sw.WriteLine(item);
            }

            // 文末に即時関数を追加
            int iLine2 = 0;
            foreach (var item in Mainlines)
            {
                if (iLine2 == 0)
                    sw.WriteLine("(function()" + item);
                else
                {

                    if(iLine2 < Mainlines.Count-1)
                        sw.WriteLine(item);
                    if (iLine2 == Mainlines.Count-1)
                        sw.WriteLine(item + "());");
                }

                iLine2++;
            }

            sw.Close();
        }

        public static void ToErrorRemove(string startTsPath,string text)
        {
            var textLines = new List<string>();
            var sr0 = new StringReader(text);
            while (sr0.Peek() > -1)
            {
                var line = sr0.ReadLine();
                textLines.Add(line);
            }
            sr0.Close();

            bool isResource = false;
            if (textLines.First()==(@"	private static resourceMan: ResourceManager = null;"))
                isResource = true;

            // 読み込んでコンパイルエラーを削除
            StreamReader sr = new StreamReader(startTsPath, System.Text.Encoding.GetEncoding("shift_jis"));
            List<string> lines = new List<string>();
            int iLine = 0;
            bool isTargetLine = false;
            while (sr.Peek() > -1)
            {
                if (iLine == textLines.Count)
                {
                    isTargetLine = false;
                    iLine = 0;
                }

                var target = sr.ReadLine();

                if (target==(@"	private static resourceCulture: CultureInfo = null;") == false)
                {
                    if (target==(textLines.First()) || isTargetLine)
                    {
                        iLine++;

                        isTargetLine = true;
                    }
                    else
                        lines.Add(target);
                }
                else
                {
                    if (isResource)
                        iLine++;

                    lines.Add(target);
                }
            }
            sr.Close();

            // 書き込み
            StreamWriter sw = new StreamWriter(startTsPath, false, ender);
            foreach (var item in lines)
            {
                sw.WriteLine(item);
            }
            sw.Close();
        }
    }
}
