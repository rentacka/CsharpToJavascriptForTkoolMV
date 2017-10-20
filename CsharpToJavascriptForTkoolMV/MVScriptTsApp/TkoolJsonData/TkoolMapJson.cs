using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using TkoolJsonData;

namespace jsCallEditor
{
	internal class TkoolMapJson
	{
		private Event targetEvent;

		private int EventId;

		private Page lastPage;

        public class Point
        {
            public int X;
            public int Y;
        }

		private Point ActorPos;

		public TkoolMapJson(Map mapData, int curEventId, Point curActorPos)
		{
			if (curEventId == 0)
			{
				this.targetEvent = new Event();
				this.targetEvent.Id = new int?(mapData.Events.Count);
				this.targetEvent.Name = "EV" + mapData.Events.Count.ToString("000");
				this.targetEvent.Note = "";
				mapData.Events.Add(this.targetEvent);
			}
			else
			{
				foreach (Event current in mapData.Events)
				{
					if (current != null && current.Id == curEventId)
					{
						this.targetEvent = current;
						break;
					}
				}
			}
			this.EventId = curEventId;
			this.ActorPos = curActorPos;
			if (this.EventId == 0)
			{
				this.AddEventPage();
			}
			else
			{
				this.lastPage = this.targetEvent.Pages.Last<Page>();
			}
			this.targetEvent.X = new int?(this.ActorPos.X);
			this.targetEvent.Y = new int?(this.ActorPos.Y);
		}

		public Page AddEventPage()
		{
			this.lastPage = new Page();
			this.lastPage.Conditions = new Conditions();
			this.lastPage.Conditions.ActorId = 1;
			this.lastPage.Conditions.ActorValid = false;
			this.lastPage.Conditions.ItemId = 1;
			this.lastPage.Conditions.ItemValid = false;
			this.lastPage.Conditions.SelfSwitchCh = "A";
			this.lastPage.Conditions.SelfSwitchValid = false;
			this.lastPage.Conditions.Switch1Id = 1;
			this.lastPage.Conditions.Switch1Valid = false;
			this.lastPage.Conditions.Switch2Id = 1;
			this.lastPage.Conditions.Switch2Valid = false;
			this.lastPage.Conditions.VariableId = 1;
			this.lastPage.Conditions.VariableValid = false;
			this.lastPage.Conditions.VariableValue = 0;
			this.lastPage.DirectionFix = false;
			this.lastPage.Image = new TkoolJsonData.Image();
			this.lastPage.Image.CharacterIndex = 1;
			this.lastPage.Image.CharacterName = "";
			this.lastPage.Image.Direction = 2;
			this.lastPage.Image.Pattern = 2;
			this.lastPage.Image.TileId = 0;
			if (this.targetEvent.Pages == null)
			{
				this.targetEvent.Pages = new List<Page>();
			}
			this.targetEvent.Pages.Add(this.lastPage);
			this.AddCode(0, new List<object>());
			if (this.EventId == 0)
			{
				this.lastPage.MoveFrequency = 3;
				List2 list = new List2();
				list.Code = 0;
				list.Parameters = new List<object>();
				this.lastPage.MoveRoute = new MoveRoute();
				this.lastPage.MoveRoute.List = new List<List2>();
				this.lastPage.MoveRoute.List.Add(list);
				this.lastPage.MoveRoute.Repeat = true;
				this.lastPage.MoveRoute.Skippable = false;
				this.lastPage.MoveRoute.Wait = false;
				this.lastPage.MoveSpeed = 3;
				this.lastPage.MoveType = 0;
				this.lastPage.PriorityType = 0;
				this.lastPage.StepAnime = false;
				this.lastPage.Through = false;
				this.lastPage.Trigger = 0;
				this.lastPage.WalkAnime = true;
			}
			return this.lastPage;
		}

		public void ChangeLastPage(int pageNumber)
		{
			this.lastPage = this.targetEvent.Pages[pageNumber - 1];
		}

		public void ChangeCode_Script(int line, string script)
		{
			int index = line - 1;
			List expr_15 = this.lastPage.List[index];
			expr_15.Code = 355;
			expr_15.Parameters = new List<object>
			{
				script
			};
		}

		public void ChangeCode_PluginCommand(int line, string script)
		{
			int index = line - 1;
			List expr_15 = this.lastPage.List[index];
			expr_15.Code = 356;
			expr_15.Parameters = new List<object>
			{
				script
			};
		}

		public void ChangeCode(int line, int code, List<object> parameters)
		{
			int index = line - 1;
			List expr_15 = this.lastPage.List[index];
			expr_15.Code = code;
			expr_15.Parameters = parameters;
		}

		public void AddCode_Script(string script)
		{
			this.AddCode(355, new List<object>
			{
				script
			});
		}

		public void AddCode_PluginCommand(string script)
		{
			this.AddCode(356, new List<object>
			{
				script
			});
		}

		public void AddCode(int code, List<object> parameters)
		{
			List list = new List();
			list.Code = code;
			list.Indent = 0;
			list.Parameters = parameters;
			if (this.lastPage.List == null)
			{
				this.lastPage.List = new List<List>();
			}
			this.lastPage.List.Add(list);
		}
	}
}
