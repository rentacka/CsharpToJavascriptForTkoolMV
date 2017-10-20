using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	internal class Timing
	{
		[JsonProperty("flashColor")]
		public IList<int> FlashColor
		{
			get;
			set;
		}

		[JsonProperty("flashDuration")]
		public int FlashDuration
		{
			get;
			set;
		}

		[JsonProperty("flashScope")]
		public int FlashScope
		{
			get;
			set;
		}

		[JsonProperty("frame")]
		public int Frame
		{
			get;
			set;
		}

		[JsonProperty("se")]
		public Se Se
		{
			get;
			set;
		}
	}
}
