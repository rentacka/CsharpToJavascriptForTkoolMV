using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	public class Troops
	{
		[JsonProperty("id")]
		public int? Id
		{
			get;
			set;
		}

		[JsonProperty("members")]
		public IList<Member> Members
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

		[JsonProperty("pages")]
		public IList<Page_Troops> Pages
		{
			get;
			set;
		}
	}
}
