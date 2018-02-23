using Newtonsoft.Json;
using System;

namespace TkoolJsonData
{
	public class AttackMotion
	{
		[JsonProperty("type")]
		public int Type
		{
			get;
			set;
		}

		[JsonProperty("weaponImageId")]
		public int WeaponImageId
		{
			get;
			set;
		}
	}
}
