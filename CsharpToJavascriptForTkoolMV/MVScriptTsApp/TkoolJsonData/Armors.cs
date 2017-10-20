using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	internal class Armors
	{
		[JsonProperty("id")]
		public int? Id
		{
			get;
			set;
		}

		[JsonProperty("atypeId")]
		public int? AtypeId
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
		public IList<Trait_Int> Traits
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
	}
}
