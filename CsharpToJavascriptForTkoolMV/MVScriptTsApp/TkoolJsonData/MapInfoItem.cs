using Newtonsoft.Json;
using System;

namespace TkoolJsonData
{
	internal class MapInfoItem
	{
		[JsonProperty("id")]
		public int Id
		{
			get;
			set;
		}

		[JsonProperty("expanded")]
		public bool Expanded
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

		[JsonProperty("order")]
		public int Order
		{
			get;
			set;
		}

		[JsonProperty("parentId")]
		public int ParentId
		{
			get;
			set;
		}

		[JsonProperty("scrollX")]
		public double ScrollX
		{
			get;
			set;
		}

		[JsonProperty("scrollY")]
		public int ScrollY
		{
			get;
			set;
		}
	}
}
