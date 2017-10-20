using Newtonsoft.Json;
using System;

namespace TkoolJsonData
{
	internal class Airship
	{
		[JsonProperty("bgm")]
		public Bgm Bgm
		{
			get;
			set;
		}

		[JsonProperty("characterIndex")]
		public int CharacterIndex
		{
			get;
			set;
		}

		[JsonProperty("characterName")]
		public string CharacterName
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
	}
}
