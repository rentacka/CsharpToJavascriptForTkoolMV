using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	public class Enemies
	{
		[JsonProperty("id")]
		public int? Id
		{
			get;
			set;
		}

		[JsonProperty("actions")]
		public IList<Action> Actions
		{
			get;
			set;
		}

		[JsonProperty("battlerHue")]
		public int? BattlerHue
		{
			get;
			set;
		}

		[JsonProperty("battlerName")]
		public string BattlerName
		{
			get;
			set;
		}

		[JsonProperty("dropItems")]
		public IList<DropItem> DropItems
		{
			get;
			set;
		}

		[JsonProperty("exp")]
		public int? Exp
		{
			get;
			set;
		}

		[JsonProperty("traits")]
		public IList<Trait> Traits
		{
			get;
			set;
		}

		[JsonProperty("gold")]
		public int? Gold
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

		[JsonProperty("params")]
		public IList<int> Params
		{
			get;
			set;
		}
	}
}
