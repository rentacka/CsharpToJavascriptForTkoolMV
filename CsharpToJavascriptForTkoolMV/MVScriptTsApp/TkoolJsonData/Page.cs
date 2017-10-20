using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TkoolJsonData
{
	internal class Page
	{
		[JsonProperty("conditions")]
		public Conditions Conditions
		{
			get;
			set;
		}

		[JsonProperty("directionFix")]
		public bool DirectionFix
		{
			get;
			set;
		}

		[JsonProperty("image")]
		public Image Image
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

		[JsonProperty("moveFrequency")]
		public int MoveFrequency
		{
			get;
			set;
		}

		[JsonProperty("moveRoute")]
		public MoveRoute MoveRoute
		{
			get;
			set;
		}

		[JsonProperty("moveSpeed")]
		public int MoveSpeed
		{
			get;
			set;
		}

		[JsonProperty("moveType")]
		public int MoveType
		{
			get;
			set;
		}

		[JsonProperty("priorityType")]
		public int PriorityType
		{
			get;
			set;
		}

		[JsonProperty("stepAnime")]
		public bool StepAnime
		{
			get;
			set;
		}

		[JsonProperty("through")]
		public bool Through
		{
			get;
			set;
		}

		[JsonProperty("trigger")]
		public int Trigger
		{
			get;
			set;
		}

		[JsonProperty("walkAnime")]
		public bool WalkAnime
		{
			get;
			set;
		}
	}
}
