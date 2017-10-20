using Newtonsoft.Json;
using System;

namespace TkoolJsonData
{
	internal class DropItem
	{
		[JsonProperty("dataId")]
		public int DataId
		{
			get;
			set;
		}

		[JsonProperty("denominator")]
		public int Denominator
		{
			get;
			set;
		}

		[JsonProperty("kind")]
		public int Kind
		{
			get;
			set;
		}
	}
}
