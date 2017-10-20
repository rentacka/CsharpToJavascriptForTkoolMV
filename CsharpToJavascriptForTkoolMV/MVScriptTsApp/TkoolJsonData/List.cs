using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	internal class List
	{
		[JsonProperty("code")]
		public int Code
		{
			get;
			set;
		}

		[JsonProperty("indent")]
		public int Indent
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
