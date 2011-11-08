enyo.kind({
	name: "plex.PreferencesView",
	kind: enyo.VFlexBox,
	className: "basic-back",
	published: {
		browserPreferences: {},
		systemPreferences: {},
		searchPreferences: [],
		defaultSearch: ""
	},
	events: {
		onPreferenceChanged: "",
		onClose: ""
	},
	components: [
		{kind: enyo.Pane, flex: 1, components: [
			{name: "browserBonjour", kind: "PalmService", service: "palm://com.palm.zeroconf/", 
				method: "browse", subscribe: true, onSuccess: "gotBrowsed", onFailure: "genericFailure"},
			{name: "resolverBonjour", kind: "PalmService", service: "palm://com.palm.zeroconf/", 
					method: "resolve", subscribe: true, onSuccess: "gotResolved", onFailure: "genericFailure"},
			{name: "serverForm", kind: "plex.ServerFormView", onSave: "newServerAdded", onDelete: "serverRemoved",onCancel: "backHandler", lazy: true, showing: false},
			{name: "mainPrefs", kind: enyo.Control, layoutKind: "VFlexLayout", components:[
				{name: "header", kind: "PageHeader", className: "preferences-header", pack: "center", components: [
					{kind: "Image", src: "images/PlexIcon.png", className: "preferences-header-image"},
					{content: $L("Preferences")}
				]},
				{kind: "Scroller", flex: 1, components: [
					{kind: "Control", className: "enyo-preferences-box", components: [
						{content:$L("All servers set to 'Show' will be available for browsing."), className: "prefs-body-text", style:"margin:none;"},
						{kind: "RowGroup", caption: $L("Plex Media Servers"), style: "margin-bottom: 10px", components: [
							{name: "serverList", kind:enyo.VirtualRepeater, style: "margin: -10px;", onSetupRow: "listSetupRow",components: [
								{kind: enyo.Item, className: "server-list-item", components: [
									{kind: "LabeledContainer", name: "serverName", onclick: "listItemTap", label: "Server nr 1", components: [
										{kind: "ToggleButton", name: "includeServer", onclick: "", onLabel: $L("Show"), offLabel: $L("Hide"), onChange: "togglePreferenceClick",}
									]},
								]}
							]}
						]},
						{kind: "Button", caption: $L("Add new server ..."), onclick: "showAddServerForm"},
						/*
						{kind: "RowGroup", caption: $L("Autofill"), components: [
							{kind: "LabeledContainer", caption: $L("Names and Passwords"), components: [
								{kind: "ToggleButton", name: "rememberPasswords", onChange: "togglePreferenceClick", preference: "rememberPasswords"}
							]}
						]},
						{kind: "Button", caption: $L("Clear Autofill Information"), onclick: "", dialog: ""},
						*/
						{kind: "RowGroup", caption: $L("Video quality"), components: [
							{kind: "ListSelector", name: "videoQuality", value: 1, onChange: "videoQualityChange", items: [
								{caption: $L("8 Mbps, 1080p"), value: 1},
								{caption: $L("4 Mbps, 720p"), value: 1},
								{caption: $L("3 Mbps, 720p"), value: 1},
								{caption: $L("2 Mbps, 720p"), value: 1},
								{caption: $L("1.5 Mbps, 480p"), value: 1},
								{caption: $L("720 kbps, 320p"), value: 1},
							]}
						]},
						{content:$L('Higher quality settings provide better looking video, but require more network bandwith.'), className: "prefs-body-text", style:"margin-bottom:8px"},
					]},
					{name: "console", kind: "HtmlContent", style: "font-size: 10pt; background-color: white;"},
				]},
				{kind: "Toolbar", pack: "center", className: "enyo-toolbar-light", components: [
		 	   	{kind: "Button", caption: $L("Done"), onclick: "doClose", className: "enyo-preference-button enyo-button-affirmative"}
				]},
			]}
		]},			
	],
	create: function() {
		this.inherited(arguments);
		this.plexReq = new PlexRequest();
		this.servers = [];
		this.loadPrefs();
		this.$.browserBonjour.call({"regType":"_plexmediasvr._tcp", "domainName":"local."});
		this.$.pane.selectViewByName("mainPrefs");
	},
	gotBrowsed: function(inSender, inResponse) {
	  if (inResponse.returnValue) {
	    //just a msg that it went well, skip it
	    return;
	  }
		this.$.console.addContent("BROWSE> " + JSON.stringify(inResponse.instanceName) + "<br/>");

    //we've found something, let's resolve this to get some details about the machine
		this.$.resolverBonjour.call({"regType":inResponse.regType, "domainName":inResponse.domainName,
		                            "instanceName":inResponse.instanceName, "subscribe": true});
	},
	gotResolved: function(inSender, inResponse) {
  	if (inResponse.returnValue) {
	    //just a msg that it went well, skip it
  	  return;
  	}
	
		this.$.console.addContent("RESOLVE>: " + JSON.stringify(inResponse)+ "<br/>");

    //add found server to server list
    var serverName = inResponse.targetName;
    var serverUrl = "http://" + inResponse.IPv4Address; //no http included when found via bonjour
    
    var foundServer = {name:serverName,
    		  		host:serverUrl, 
    		  		port:32400, //always 32400
    		  		user:null,
    		  		pass:null,
    		  		include: true};
    
    var existingServer = this.plexReq.serverForUrl(serverUrl);
    if (!existingServer) {
      this.servers.push(foundServer);
      this.savePrefs();
      this.$.serverList.render();; //force-refresh list
    }
	},
	genericFailure: function(inSender, inResponse) {
		this.log("failure: " + JSON.stringify(inResponse));
	},
	loadPrefs: function() {
			this.servers = this.plexReq.servers;
			this.$.serverList.render();
	},
	savePrefs: function() {
		this.plexReq.savePrefs();
	},
	showAddServerForm: function(inSender) {
		this.$.pane.selectViewByName("serverForm");
		this.$.serverForm.setServer(undefined);
		this.$.serverForm.setShowing(true);
	},
	newServerAdded: function(inSender, inServer) {
		this.servers.push(inServer);
		this.savePrefs();
		this.$.pane.back();
		
		this.loadPrefs(); //force refresh of settings
	},
	serverRemoved: function(inSender, inServerIndex) {
		this.servers.remove(inServerIndex);
		this.savePrefs();
		this.$.pane.back();
		
		this.loadPrefs(); //force refresh of settings
	},
	backHandler: function(inSender) {
		this.$.pane.back();
	},
	listSetupRow: function(inSender, inIndex) {
		this.log("listar servers");
		
    // check if the row is selected
		if (this.servers !== undefined && inIndex < this.servers.length) {
			this.$.serverName.setLabel(this.servers[inIndex].name);
			this.$.includeServer.setState(this.servers[inIndex].include)
			return true;
		}
	},
	listItemTap: function(inSender, inEvent) {
		selectedRow = inEvent.rowIndex;
		if (selectedRow < this.servers.length) {
			var server = this.servers[selectedRow];
			this.$.pane.selectViewByName("serverForm");
			this.$.serverForm.setServer(server);
			
		}
	},
	togglePreferenceClick: function(inSender, inState) {
	    this.log("Toggled to state" + inState + " for server:"+inSender);
	},
	
});
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

