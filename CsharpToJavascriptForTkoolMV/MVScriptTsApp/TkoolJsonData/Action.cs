using Newtonsoft.Json;
using System;

namespace TkoolJsonData
{
	internal class Action
	{
		[JsonProperty("conditionParam1")]
		public int ConditionParam1
		{
			get;
			set;
		}

		[JsonProperty("conditionParam2")]
		public int ConditionParam2
		{
			get;
			set;
		}

		[JsonProperty("conditionType")]
		public int ConditionType
		{
			get;
			set;
		}

		[JsonProperty("rating")]
		public int Rating
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
