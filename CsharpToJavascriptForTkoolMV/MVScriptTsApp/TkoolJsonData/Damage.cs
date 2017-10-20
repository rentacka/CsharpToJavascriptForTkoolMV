using Newtonsoft.Json;
using System;

namespace TkoolJsonData
{
	internal class Damage
	{
		[JsonProperty("critical")]
		public bool Critical
		{
			get;
			set;
		}

		[JsonProperty("elementId")]
		public int ElementId
		{
			get;
			set;
		}

		[JsonProperty("formula")]
		public string Formula
		{
			get;
			set;
		}

		[JsonProperty("type")]
		public int Type
		{
			get;
			set;
		}

		[JsonProperty("variance")]
		public int Variance
		{
			get;
			set;
		}
	}
}
