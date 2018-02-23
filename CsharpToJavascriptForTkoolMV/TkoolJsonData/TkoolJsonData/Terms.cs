using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	public class Terms
	{
		[JsonProperty("basic")]
		public IList<string> Basic
		{
			get;
			set;
		}

		[JsonProperty("commands")]
		public IList<string> Commands
		{
			get;
			set;
		}

		[JsonProperty("params")]
		public IList<string> Params
		{
			get;
			set;
		}

		[JsonProperty("messages")]
		public Messages Messages
		{
			get;
			set;
		}
	}
}
