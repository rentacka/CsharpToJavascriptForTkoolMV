using Newtonsoft.Json;
using System;

namespace TkoolJsonData
{
	public class Ship
	{
		[JsonProperty("bgm")]
		public Bgm3 Bgm
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
