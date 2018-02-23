var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
///<reference path='mscorlib.ts'/>
var Resources = (function (_super) {
    __extends(Resources, _super);
    function Resources() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Resources, "ResourceManager", {
        get: function () {
            var flag = Resources.resourceMan === null;
            if (flag) {
                var resourceManager = new ResourceManager("CsharpToJavascriptForTkoolMV.Properties.Resources", new Type("Resources").Assembly);
                Resources.resourceMan = resourceManager;
            }
            return Resources.resourceMan;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Resources, "Culture", {
        get: function () {
            return Resources.resourceCulture;
        },
        set: function (value) {
            Resources.resourceCulture = value;
        },
        enumerable: true,
        configurable: true
    });
    Resources.resourceMan = null;
    Resources.resourceCulture = null;
    return Resources;
}(NObject));
var Settings = (function (_super) {
    __extends(Settings, _super);
    function Settings() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Settings, "Default", {
        get: function () {
            return Settings.defaultInstance;
        },
        enumerable: true,
        configurable: true
    });
    Settings.defaultInstance = SettingsBase.Synchronized(new Settings());
    return Settings;
}(ApplicationSettingsBase));
var MVState = (function (_super) {
    __extends(MVState, _super);
    function MVState() {
        return _super.call(this) || this;
    }
    MVState.Main = function () {
        NConsole.WriteLine("即時関数test");
        var t = new TimeSpan(1);
        var t2 = new TimeSpan(1);
        var t3 = TimeSpan.op_Addition(t, t2);
        var t4 = TimeSpan.op_Subtraction(t, t2);
        var flag = TimeSpan.op_LessThanOrEqual(t3, t4);
        if (flag) {
            NConsole.WriteLine("");
        }
        var flag2 = TimeSpan.op_Equality(t3, t4);
        if (flag2) {
            NConsole.WriteLine("");
        }
        var clientWebSocket = new ClientWebSocket();
        clientWebSocket.ConnectAsync(new Uri(""), CancellationToken.None);
        var text = clientWebSocket.ToString();
    };
    MVState.prototype._For = function (teigi, i, count) {
        for (var j = 0; j < 10; j = j + 1) {
        }
        for (var k = 0; k < teigi.length; k = k + 1) {
            var c = teigi.charCodeAt(k);
        }
        return new MVState_State("for", NString.Concat([
            "for(var ", i, "=0;i<", count, ";i++)\r\n{", teigi, "}"
        ]));
    };
    MVState.prototype._Collon = function () {
        return new MVState_State("Collon", ";");
    };
    return MVState;
}(NObject));
var MVState_State = (function (_super) {
    __extends(MVState_State, _super);
    function MVState_State(Name, Code) {
        var _this = _super.call(this) || this;
        _this.name = null;
        _this.code = null;
        _this.name = Name;
        _this.code = Code;
        return _this;
    }
    return MVState_State;
}(NObject));
var MVscript = (function (_super) {
    __extends(MVscript, _super);
    function MVscript() {
        var _this = _super.call(this) || this;
        _this.Code = null;
        return _this;
    }
    MVscript.prototype.For = function (teigi, i, count) {
        this.Code = this.Code + _super.prototype._For.call(this, teigi, i, count).code;
    };
    return MVscript;
}(MVState));
(function () {
    MVState.Main();
}());
//# sourceMappingURL=TkoolOfJavascriptTheCross.js.map