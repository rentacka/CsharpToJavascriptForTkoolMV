using Newtonsoft.Json;
using System;

namespace TkoolJsonData
{
	internal class Image
	{
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

		[JsonProperty("direction")]
		public int Direction
		{
			get;
			set;
		}

		[JsonProperty("pattern")]
		public int Pattern
		{
			get;
			set;
		}

		[JsonProperty("tileId")]
		public int TileId
		{
			get;
			set;
		}
	}
}
