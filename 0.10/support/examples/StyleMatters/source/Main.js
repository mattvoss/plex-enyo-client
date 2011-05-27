/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
enyo.kind({
	name: "Main",
	kind: enyo.VFlexBox,
	flex: 1, 
	components: [
		{kind: "FadeScroller", flex: 1, components: [
			{defaultKind: "ViewItem", components: [
			
				{kind: "Divider", caption: "VIEW BASICS"},
				{className: "enyo-first", viewKind: "toolbar.Main", title: "Toolbars",
					description: "Toolbars for displaying buttons and menus"},
				{viewKind: "headers.PageHeader",
					title: "Page Header",
					description: "the topmost element of the scrollable content; commonly used atop preference views"},
				{className: "enyo-last", viewKind: "scrims.Spinner",
					title: "Scrims",
					description: "a translucent layer used to obscure background UI, when modal foreground UI is layered on top of the current view"},
				
				{kind: "Divider", caption: "DIVIDERS"},
				{className: "enyo-first", viewKind: "dividers.SolidDividers",
					title: "Solid Dividers",
					description: "lines used to divide a view or list of rows"},
				{viewKind: "dividers.LabeledDividers",
					title: "Labeled Dividers",
					description: "lines with labels; used to divide a view or list of rows"},
				{viewKind: "dividers.AlphaDividers",
					title: "Alphabetical Dividers",
					description: "lines containing a single character; used to divide a view or list of rows"},
				{viewKind: "dividers.CollapsDividers",
					title: "Collapsible Dividers",
					description: "dividers that control corresponding drawers of content"},
				{className: "enyo-last", viewKind: "dividers.NestedDividers",
					title: "Nested/Truncating Dividers",
					description: "dividers with truncating contents and dividers nested inside each other"},
			
				{kind: "Divider", caption: "PAGE CONTAINERS"},
				{className: "enyo-first", viewKind: "containers.LabeledGroup",
					title: "Labeled Group",
					description: "visually group a list with a label"},
				{viewKind: "containers.UnlabeledGroup",
					title: "Unlabeled Group",
					description: "visually group a list without a label"},
				{className: "enyo-last", viewKind: "containers.Drawers",
					title: "Drawers",
					description: "hide UI or lists with an area that animates open and closed"},
			
				{kind: "Divider", caption: "POPUPS"},
				{className: "enyo-first", viewKind: "popups.ModalDialogs", title: "Modal Dialogs", description: "a popup dialog box that requires a user-interaction"},
				{viewKind: "popups.Popups", title: "Popups", description: "a generic popup box"},
				{className: "enyo-last", viewKind: "popups.Menus",
					title: "Menus",
					description: "a popup panel containing UI or lists, floating above all other view UI"},
			
				{kind: "Divider", caption: "UI WIDGETS"},
				{className: "enyo-first", viewKind: "widgets.Checkboxes",
					title: "Checkboxes"},
				{viewKind: "widgets.ToggleButtons",
					title: "Toggle Buttons"},
				{viewKind: "widgets.Buttons",
					title: "Buttons"},
				{viewKind: "widgets.ActivityButtons",
					title: "Activity Buttons"},
				{viewKind: "widgets.RadioButtons",
					title: "Radio Buttons"},
				{viewKind: "widgets.ListSelectors",
					title: "List Selectors"},
				{viewKind: "widgets.Sliders",
					title: "Sliders"},
				{viewKind: "widgets.Activity",
					title: "Activity Indicators"},
				{viewKind: "widgets.Pickers",
					title: "Pickers"},
				{viewKind: "widgets.IntegerPickers",
					title: "Integer Pickers"},
				{viewKind: "widgets.TimePickers",
					title: "Time Pickers"},
				{viewKind: "widgets.DatePickers",
					title: "Date Pickers"},
				{viewKind: "widgets.ImageViews",
					title: "Image Views"},
				{viewKind: "widgets.Textfields",
					title: "Textfields"},
				{viewKind: "widgets.ToolInputs",
					title: "Tool Inputs"},
				{className: "enyo-last", viewKind: "widgets.ProgressButton",
					title: "Progress Button"}
			]}
		]}
	]
});
