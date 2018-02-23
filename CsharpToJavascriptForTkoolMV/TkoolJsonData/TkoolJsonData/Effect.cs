using Newtonsoft.Json;
using System;

namespace TkoolJsonData
{
	public class Effect
	{
		[JsonProperty("code")]
		public int Code
		{
			get;
			set;
		}

		[JsonProperty("dataId")]
		public int DataId
		{
			get;
			set;
		}

		[JsonProperty("value1")]
		public int Value1
		{
			get;
			set;
		}

		[JsonProperty("value2")]
		public int Value2
		{
			get;
			set;
		}
	}
}
