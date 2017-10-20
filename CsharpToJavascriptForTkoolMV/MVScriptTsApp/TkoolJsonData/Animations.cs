using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	internal class Animations
	{
		[JsonProperty("id")]
		public int Id
		{
			get;
			set;
		}

		[JsonProperty("animation1Hue")]
		public int Animation1Hue
		{
			get;
			set;
		}

		[JsonProperty("animation1Name")]
		public string Animation1Name
		{
			get;
			set;
		}

		[JsonProperty("animation2Hue")]
		public int Animation2Hue
		{
			get;
			set;
		}

		[JsonProperty("animation2Name")]
		public string Animation2Name
		{
			get;
			set;
		}

		[JsonProperty("frames")]
		public IList<IList<IList<int>>> Frames
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

		[JsonProperty("position")]
		public int Position
		{
			get;
			set;
		}

		[JsonProperty("timings")]
		public IList<Timing> Timings
		{
			get;
			set;
		}
	}
}
