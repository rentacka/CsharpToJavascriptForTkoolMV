using Newtonsoft.Json;
using System;

namespace TkoolJsonData
{
	public class Trait_Int
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
		public int Value
		{
			get;
			set;
		}
	}
}
