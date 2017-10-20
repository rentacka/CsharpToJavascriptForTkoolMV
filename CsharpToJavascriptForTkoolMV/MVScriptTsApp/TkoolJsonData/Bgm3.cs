using Newtonsoft.Json;
using System;

namespace TkoolJsonData
{
	internal class Bgm3
	{
		[JsonProperty("name")]
		public string Name
		{
			get;
			set;
		}

		[JsonProperty("pan")]
		public int Pan
		{
			get;
			set;
		}

		[JsonProperty("pitch")]
		public int Pitch
		{
			get;
			set;
		}

		[JsonProperty("volume")]
		public int Volume
		{
			get;
			set;
		}
	}
}
