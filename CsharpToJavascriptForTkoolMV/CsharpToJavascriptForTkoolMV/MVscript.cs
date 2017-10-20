using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TkoolCsharpSample
{
    /// <summary>
    /// ツクールMV用のスクリプト
    /// </summary>
    public class MVscript: MVState
    {
        // 即時関数
        static new void Main()
        {
            MVState.Main();
        }

        public MVscript()
        {
            // 即時関数テスト
            // やっぱりできない
            // Functionの最初に実行するだけ・・・
        }

        string Code;

        public void For(string teigi, int i, int count)
        {
            Code += base._For(teigi,i,count).code;
        }

        // TODO:ツクールのソースコードからメソッドを自動変換して追加
    }
}
