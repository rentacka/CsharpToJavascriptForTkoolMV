using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	public class TkoolSystem
	{
		[JsonProperty("airship")]
		public Airship Airship
		{
			get;
			set;
		}

		[JsonProperty("armorTypes")]
		public IList<string> ArmorTypes
		{
			get;
			set;
		}

		[JsonProperty("attackMotions")]
		public IList<AttackMotion> AttackMotions
		{
			get;
			set;
		}

		[JsonProperty("battleBgm")]
		public BattleBgm BattleBgm
		{
			get;
			set;
		}

		[JsonProperty("battleback1Name")]
		public string Battleback1Name
		{
			get;
			set;
		}

		[JsonProperty("battleback2Name")]
		public string Battleback2Name
		{
			get;
			set;
		}

		[JsonProperty("battlerHue")]
		public int BattlerHue
		{
			get;
			set;
		}

		[JsonProperty("battlerName")]
		public string BattlerName
		{
			get;
			set;
		}

		[JsonProperty("boat")]
		public Boat Boat
		{
			get;
			set;
		}

		[JsonProperty("currencyUnit")]
		public string CurrencyUnit
		{
			get;
			set;
		}

		[JsonProperty("defeatMe")]
		public DefeatMe DefeatMe
		{
			get;
			set;
		}

		[JsonProperty("editMapId")]
		public int EditMapId
		{
			get;
			set;
		}

		[JsonProperty("elements")]
		public IList<string> Elements
		{
			get;
			set;
		}

		[JsonProperty("equipTypes")]
		public IList<string> EquipTypes
		{
			get;
			set;
		}

		[JsonProperty("gameTitle")]
		public string GameTitle
		{
			get;
			set;
		}

		[JsonProperty("gameoverMe")]
		public GameoverMe GameoverMe
		{
			get;
			set;
		}

		[JsonProperty("locale")]
		public string Locale
		{
			get;
			set;
		}

		[JsonProperty("magicSkills")]
		public IList<int> MagicSkills
		{
			get;
			set;
		}

		[JsonProperty("menuCommands")]
		public IList<bool> MenuCommands
		{
			get;
			set;
		}

		[JsonProperty("optDisplayTp")]
		public bool OptDisplayTp
		{
			get;
			set;
		}

		[JsonProperty("optDrawTitle")]
		public bool OptDrawTitle
		{
			get;
			set;
		}

		[JsonProperty("optExtraExp")]
		public bool OptExtraExp
		{
			get;
			set;
		}

		[JsonProperty("optFloorDeath")]
		public bool OptFloorDeath
		{
			get;
			set;
		}

		[JsonProperty("optFollowers")]
		public bool OptFollowers
		{
			get;
			set;
		}

		[JsonProperty("optSideView")]
		public bool OptSideView
		{
			get;
			set;
		}

		[JsonProperty("optSlipDeath")]
		public bool OptSlipDeath
		{
			get;
			set;
		}

		[JsonProperty("optTransparent")]
		public bool OptTransparent
		{
			get;
			set;
		}

		[JsonProperty("partyMembers")]
		public IList<int> PartyMembers
		{
			get;
			set;
		}

		[JsonProperty("ship")]
		public Ship Ship
		{
			get;
			set;
		}

		[JsonProperty("skillTypes")]
		public IList<string> SkillTypes
		{
			get;
			set;
		}

		[JsonProperty("sounds")]
		public IList<Sound> Sounds
		{
			get;
			set;
		}

		[JsonProperty("startMapId")]
		public int StartMapId
		{
			get;
			set;
		}

		[JsonProperty("startX")]
		public int StartX
		{
			get;
			set;
		}

		[JsonProperty("startY")]
		public int StartY
		{
			get;
			set;
		}

		[JsonProperty("switches")]
		public IList<string> Switches
		{
			get;
			set;
		}

		[JsonProperty("terms")]
		public Terms Terms
		{
			get;
			set;
		}

		[JsonProperty("testBattlers")]
		public IList<TestBattler> TestBattlers
		{
			get;
			set;
		}

		[JsonProperty("testTroopId")]
		public int TestTroopId
		{
			get;
			set;
		}

		[JsonProperty("title1Name")]
		public string Title1Name
		{
			get;
			set;
		}

		[JsonProperty("title2Name")]
		public string Title2Name
		{
			get;
			set;
		}

		[JsonProperty("titleBgm")]
		public TitleBgm TitleBgm
		{
			get;
			set;
		}

		[JsonProperty("variables")]
		public IList<string> Variables
		{
			get;
			set;
		}

		[JsonProperty("versionId")]
		public int VersionId
		{
			get;
			set;
		}

		[JsonProperty("victoryMe")]
		public VictoryMe VictoryMe
		{
			get;
			set;
		}

		[JsonProperty("weaponTypes")]
		public IList<string> WeaponTypes
		{
			get;
			set;
		}

		[JsonProperty("windowTone")]
		public IList<int> WindowTone
		{
			get;
			set;
		}
	}
}
