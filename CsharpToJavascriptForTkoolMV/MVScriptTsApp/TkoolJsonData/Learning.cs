using Newtonsoft.Json;
using System;

namespace TkoolJsonData
{
	internal class Learning
	{
		[JsonProperty("level")]
		public int Level
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

		[JsonProperty("skillId")]
		public int SkillId
		{
			get;
			set;
		}
	}
}
