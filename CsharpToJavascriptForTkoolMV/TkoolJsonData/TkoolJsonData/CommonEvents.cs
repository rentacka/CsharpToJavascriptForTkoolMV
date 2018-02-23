using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	public class CommonEvents
	{
		[JsonProperty("id")]
		public int? Id
		{
			get;
			set;
		}

		[JsonProperty("list")]
		public IList<List> List
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

		[JsonProperty("switchId")]
		public int? SwitchId
		{
			get;
			set;
		}

		[JsonProperty("trigger")]
		public int? Trigger
		{
			get;
			set;
		}
	}
}
