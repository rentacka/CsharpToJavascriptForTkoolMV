using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	internal class Items
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

		[JsonProperty("consumable")]
		public bool? Consumable
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

		[JsonProperty("itypeId")]
		public int? ItypeId
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

		[JsonProperty("price")]
		public int? Price
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

		[JsonProperty("successRate")]
		public int? SuccessRate
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
