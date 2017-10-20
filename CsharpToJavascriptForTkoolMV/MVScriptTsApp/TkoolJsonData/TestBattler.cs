using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	internal class TestBattler
	{
		[JsonProperty("actorId")]
		public int ActorId
		{
			get;
			set;
		}

		[JsonProperty("equips")]
		public IList<int> Equips
		{
			get;
			set;
		}

		[JsonProperty("level")]
		public int Level
		{
			get;
			set;
		}
	}
}
