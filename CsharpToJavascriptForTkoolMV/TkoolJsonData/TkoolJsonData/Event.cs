using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	public class Event
	{
		[JsonProperty("id")]
		public int? Id
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

		[JsonProperty("pages")]
		public IList<Page> Pages
		{
			get;
			set;
		}

		[JsonProperty("x")]
		public int? X
		{
			get;
			set;
		}

		[JsonProperty("y")]
		public int? Y
		{
			get;
			set;
		}
	}
}
