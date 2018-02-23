using Newtonsoft.Json;
using System;

namespace TkoolJsonData
{
	public class Conditions
	{
		[JsonProperty("actorId")]
		public int ActorId
		{
			get;
			set;
		}

		[JsonProperty("actorValid")]
		public bool ActorValid
		{
			get;
			set;
		}

		[JsonProperty("itemId")]
		public int ItemId
		{
			get;
			set;
		}

		[JsonProperty("itemValid")]
		public bool ItemValid
		{
			get;
			set;
		}

		[JsonProperty("selfSwitchCh")]
		public string SelfSwitchCh
		{
			get;
			set;
		}

		[JsonProperty("selfSwitchValid")]
		public bool SelfSwitchValid
		{
			get;
			set;
		}

		[JsonProperty("switch1Id")]
		public int Switch1Id
		{
			get;
			set;
		}

		[JsonProperty("switch1Valid")]
		public bool Switch1Valid
		{
			get;
			set;
		}

		[JsonProperty("switch2Id")]
		public int Switch2Id
		{
			get;
			set;
		}

		[JsonProperty("switch2Valid")]
		public bool Switch2Valid
		{
			get;
			set;
		}

		[JsonProperty("variableId")]
		public int VariableId
		{
			get;
			set;
		}

		[JsonProperty("variableValid")]
		public bool VariableValid
		{
			get;
			set;
		}

		[JsonProperty("variableValue")]
		public int VariableValue
		{
			get;
			set;
		}
	}
}
