using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	public class List2
	{
		[JsonProperty("code")]
		public int Code
		{
			get;
			set;
		}

		[JsonProperty("parameters")]
		public IList<object> Parameters
		{
			get;
			set;
		}
	}
}
