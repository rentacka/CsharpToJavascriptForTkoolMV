///<reference path='mscorlib.ts'/>
class Resources extends NObject
{
	private static resourceMan: ResourceManager = null;
	private static resourceCulture: CultureInfo = null;
	static get ResourceManager(): ResourceManager
	{
		var flag: boolean = Resources.resourceMan === null;
		if (flag)
		{
			var resourceManager: ResourceManager = new ResourceManager("CsharpToJavascriptForTkoolMV.Properties.Resources", new Type("Resources").Assembly);
			Resources.resourceMan = resourceManager;
		}
		return Resources.resourceMan;
	}
	static set Culture(value: CultureInfo)
	{
		Resources.resourceCulture = value;
	}
	static get Culture(): CultureInfo
	{
		return Resources.resourceCulture;
	}
	constructor()
	{
		super();
	}
}
class Settings extends ApplicationSettingsBase
{
	private static defaultInstance: Settings = <Settings>SettingsBase.Synchronized(new Settings());
	static get Default(): Settings
	{
		return Settings.defaultInstance;
	}
	constructor()
	{
		super();
	}
}
class MVState extends NObject
{
	static Main(): void
	{
		NConsole.WriteLine("即時関数test");
		var t: TimeSpan = new TimeSpan(1);
		var t2: TimeSpan = new TimeSpan(1);
		var t3: TimeSpan = TimeSpan.op_Addition(t, t2);
		var t4: TimeSpan = TimeSpan.op_Subtraction(t, t2);
		var flag: boolean = TimeSpan.op_LessThanOrEqual(t3, t4);
		if (flag)
		{
			NConsole.WriteLine("");
		}
		var flag2: boolean = TimeSpan.op_Equality(t3, t4);
		if (flag2)
		{
			NConsole.WriteLine("");
		}
		var clientWebSocket: ClientWebSocket = new ClientWebSocket();
		clientWebSocket.ConnectAsync(new Uri(""), CancellationToken.None);
		var text: string = clientWebSocket.ToString();
	}
	_For(teigi: string, i: number, count: number): MVState_State
	{
		for (var j: number = 0; j < 10; j = j + 1)
		{
		}
		for (var k: number = 0; k < teigi.length; k = k + 1)
		{
			var c: number = teigi.charCodeAt(k);
		}
		return new MVState_State("for", NString.Concat([
			"for(var ", i, "=0;i<", count, ";i++)\r\n{", teigi, "}"
		]));
	}
	_Collon(): MVState_State
	{
		return new MVState_State("Collon", ";");
	}
	constructor()
	{
		super();
	}
}
class MVState_State extends NObject
{
	name: string = null;
	code: string = null;
	constructor(Name: string, Code: string)
	{
		super();
		this.name = Name;
		this.code = Code;
	}
}
class MVscript extends MVState
{
	private Code: string = null;
	private new static Main(): void
	{
		MVState.Main();
	}
	For(teigi: string, i: number, count: number): void
	{
		this.Code = this.Code + super._For(teigi, i, count).code;
	}
	constructor()
	{
		super();
	}
}
