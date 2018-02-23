using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	public class Skills
	{
		[JsonProperty("id")]
		public int? Id
		{
			get;
			set;
		}

		[JsonProperty("animationId")]
		public int? AnimationId
		{
			get;
			set;
		}

		[JsonProperty("damage")]
		public Damage Damage
		{
			get;
			set;
		}

		[JsonProperty("description")]
		public string Description
		{
			get;
			set;
		}

		[JsonProperty("effects")]
		public IList<Effect> Effects
		{
			get;
			set;
		}

		[JsonProperty("hitType")]
		public int? HitType
		{
			get;
			set;
		}

		[JsonProperty("iconIndex")]
		public int? IconIndex
		{
			get;
			set;
		}

		[JsonProperty("message1")]
		public string Message1
		{
			get;
			set;
		}

		[JsonProperty("message2")]
		public string Message2
		{
			get;
			set;
		}

		[JsonProperty("mpCost")]
		public int? MpCost
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

		[JsonProperty("occasion")]
		public int? Occasion
		{
			get;
			set;
		}

		[JsonProperty("repeats")]
		public int? Repeats
		{
			get;
			set;
		}

		[JsonProperty("requiredWtypeId1")]
		public int? RequiredWtypeId1
		{
			get;
			set;
		}

		[JsonProperty("requiredWtypeId2")]
		public int? RequiredWtypeId2
		{
			get;
			set;
		}

		[JsonProperty("scope")]
		public int? Scope
		{
			get;
			set;
		}

		[JsonProperty("speed")]
		public int? Speed
		{
			get;
			set;
		}

		[JsonProperty("stypeId")]
		public int? StypeId
		{
			get;
			set;
		}

		[JsonProperty("successRate")]
		public int? SuccessRate
		{
			get;
			set;
		}

		[JsonProperty("tpCost")]
		public int? TpCost
		{
			get;
			set;
		}

		[JsonProperty("tpGain")]
		public int? TpGain
		{
			get;
			set;
		}
	}
}
