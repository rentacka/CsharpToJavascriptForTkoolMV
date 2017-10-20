using Newtonsoft.Json;
using System;

namespace TkoolJsonData
{
	internal class Member
	{
		[JsonProperty("enemyId")]
		public int EnemyId
		{
			get;
			set;
		}

		[JsonProperty("x")]
		public int X
		{
			get;
			set;
		}

		[JsonProperty("y")]
		public int Y
		{
			get;
			set;
		}

		[JsonProperty("hidden")]
		public bool Hidden
		{
			get;
			set;
		}
	}
}
