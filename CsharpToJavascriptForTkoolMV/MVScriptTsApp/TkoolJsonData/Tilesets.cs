using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	internal class Tilesets
	{
		[JsonProperty("id")]
		public int? Id
		{
			get;
			set;
		}

		[JsonProperty("flags")]
		public IList<int> Flags
		{
			get;
			set;
		}

		[JsonProperty("mode")]
		public int? Mode
		{
			get;
			set;
		}

		[JsonProperty("name")]
		public string Name
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

		[JsonProperty("tilesetNames")]
		public IList<string> TilesetNames
		{
			get;
			set;
		}
	}
}
