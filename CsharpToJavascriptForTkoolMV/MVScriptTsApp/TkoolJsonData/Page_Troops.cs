using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	internal class Page_Troops
	{
		[JsonProperty("conditions")]
		public Conditions Conditions
		{
			get;
			set;
		}

		[JsonProperty("list")]
		public IList<List> List
		{
			get;
			set;
		}

		[JsonProperty("span")]
		public int Span
		{
			get;
			set;
		}
	}
}
