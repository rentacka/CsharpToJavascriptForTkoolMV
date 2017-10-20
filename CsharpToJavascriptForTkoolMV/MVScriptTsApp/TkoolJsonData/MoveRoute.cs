using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	internal class MoveRoute
	{
		[JsonProperty("list")]
		public IList<List2> List
		{
			get;
			set;
		}

		[JsonProperty("repeat")]
		public bool Repeat
		{
			get;
			set;
		}

		[JsonProperty("skippable")]
		public bool Skippable
		{
			get;
			set;
		}

		[JsonProperty("wait")]
		public bool Wait
		{
			get;
			set;
		}
	}
}
