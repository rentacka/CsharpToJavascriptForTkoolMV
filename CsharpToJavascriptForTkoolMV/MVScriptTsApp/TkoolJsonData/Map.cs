using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	internal class Map
	{
		[JsonProperty("autoplayBgm")]
		public bool AutoplayBgm
		{
			get;
			set;
		}

		[JsonProperty("autoplayBgs")]
		public bool AutoplayBgs
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

		[JsonProperty("bgm")]
		public Bgm Bgm
		{
			get;
			set;
		}

		[JsonProperty("bgs")]
		public Bgs Bgs
		{
			get;
			set;
		}

		[JsonProperty("disableDashing")]
		public bool DisableDashing
		{
			get;
			set;
		}

		[JsonProperty("displayName")]
		public string DisplayName
		{
			get;
			set;
		}

		[JsonProperty("encounterList")]
		public IList<object> EncounterList
		{
			get;
			set;
		}

		[JsonProperty("encounterStep")]
		public int EncounterStep
		{
			get;
			set;
		}

		[JsonProperty("height")]
		public int Height
		{
			get;
			set;
		}

		[JsonProperty("note")]
		public string Note
		{
			get;
			set;
		}

		[JsonProperty("parallaxLoopX")]
		public bool ParallaxLoopX
		{
			get;
			set;
		}

		[JsonProperty("parallaxLoopY")]
		public bool ParallaxLoopY
		{
			get;
			set;
		}

		[JsonProperty("parallaxName")]
		public string ParallaxName
		{
			get;
			set;
		}

		[JsonProperty("parallaxShow")]
		public bool ParallaxShow
		{
			get;
			set;
		}

		[JsonProperty("parallaxSx")]
		public int ParallaxSx
		{
			get;
			set;
		}

		[JsonProperty("parallaxSy")]
		public int ParallaxSy
		{
			get;
			set;
		}

		[JsonProperty("scrollType")]
		public int ScrollType
		{
			get;
			set;
		}

		[JsonProperty("specifyBattleback")]
		public bool SpecifyBattleback
		{
			get;
			set;
		}

		[JsonProperty("tilesetId")]
		public int TilesetId
		{
			get;
			set;
		}

		[JsonProperty("width")]
		public int Width
		{
			get;
			set;
		}

		[JsonProperty("data")]
		public IList<int> Data
		{
			get;
			set;
		}

		[JsonProperty("events")]
		public IList<Event> Events
		{
			get;
			set;
		}
	}
}
