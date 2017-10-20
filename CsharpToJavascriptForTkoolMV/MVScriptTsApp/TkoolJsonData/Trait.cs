using Newtonsoft.Json;
using System;

namespace TkoolJsonData
{
	internal class Trait
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

		[JsonProperty("value")]
		public double Value
		{
			get;
			set;
		}
	}
}
