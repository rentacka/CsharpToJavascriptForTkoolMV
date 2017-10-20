using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TkoolJsonData;

namespace jsCallEditor
{
    public class TkoolPluginJs
    {
        TkoolJson tkoolJson = new TkoolJson();

        List<PluguinJs> plugins;
        
        public void Load()
        {
            plugins = DeSerializePluginsJs().ToList();
        }

        public void Save()
        {
            SerializePluginsJs(plugins.ToArray());
        }

        PluguinJs[] DeSerializePluginsJs()
        {
            return tkoolJson.DeSerializePluginsJs();
        }

        void SerializePluginsJs(PluguinJs[] mapObj)
        {
            tkoolJson.SerializePluginsJs(mapObj);
        }

        internal void Add(string pluginName)
        {
            this.Add(new PluguinJs() { Name = pluginName,Status=true });
        }

        internal void Add(TkoolJsonData.PluguinJs plugin)
        {
            // プロジェクトのplugins.jsの最後の欄にプラグインを追加（重複してたら、追加しない
            bool isCont = false;
            foreach (var item in plugins.ToArray())
            {
                if (item.Name == plugin.Name)
                {
                    isCont = true;
                    break;
                }
            }

            if (isCont == false)
            {
                var newPlugin = new TkoolJsonData.PluguinJs();
                newPlugin.Name = plugin.Name;
                newPlugin.Status = plugin.Status;
                newPlugin.Parameters = plugin.Parameters;
                plugins.Add(newPlugin);
            }
        }
    }
}
