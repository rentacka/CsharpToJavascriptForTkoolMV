using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	public class Weapons
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

		[JsonProperty("description")]
		public string Description
		{
			get;
			set;
		}

		[JsonProperty("etypeId")]
		public int? EtypeId
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

		[JsonProperty("iconIndex")]
		public int? IconIndex
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

		[JsonProperty("price")]
		public int? Price
		{
			get;
			set;
		}

		[JsonProperty("wtypeId")]
		public int? WtypeId
		{
			get;
			set;
		}
	}
}
