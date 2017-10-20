using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TkoolCsharpSample
{
    public class MVState
    {
        // 即時関数にはならない
        public static void Main()
        {
            Console.WriteLine("即時関数test");

            TimeSpan s1 = new TimeSpan(1), s2 = new TimeSpan(1);

            var s3 = s1 + s2;
            var s4 = s1 - s2;

            if (s3 <= s4) { Console.WriteLine(""); }
            if (s3 == s4) { Console.WriteLine(""); }

            var ws = new System.Net.WebSockets.ClientWebSocket();

            ws.ConnectAsync(new Uri(""), System.Threading.CancellationToken.None);

            var ss = ws.ToString();
        }

        public class State
        {
            public State(string Name, string Code)
            {
                name = Name;
                code = Code;
            }

            public string name;
            public string code;
        }

        protected State _For(string teigi, int i, int count)
        {

            for (int j=0; j < 10; j++)
            {
                // test
            }

            foreach (var ss in teigi)
            {
                // test2
            }

            return new State("for", @"for(var " + i + @"=0;i<" + count + @";i++)
{"
+
teigi
+ @"}");
        }

        protected State _Collon()
        {
            return new State("Collon", @";");
        }

    }
}
