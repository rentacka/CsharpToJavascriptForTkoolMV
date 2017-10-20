using Newtonsoft.Json;
using System;

namespace TkoolJsonData
{
	internal class AttackMotion
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
