using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	internal class Classes
	{
		[JsonProperty("id")]
		public int? Id
		{
			get;
			set;
		}

		[JsonProperty("expParams")]
		public IList<int> ExpParams
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

		[JsonProperty("learnings")]
		public IList<Learning> Learnings
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
		public IList<IList<int>> Params
		{
			get;
			set;
		}
	}
}
