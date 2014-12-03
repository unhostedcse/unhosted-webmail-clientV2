// Interface for Chrome
function TCP_Interface_Chrome(server){
	this.server=server;
}

TCP_Interface_Chrome.prototype.connect = function(act,cmd,settings){
	self=this;
	var element = document.createElement("MyExtensionDataElement");		
	element.setAttribute("action",act);		
	element.setAttribute("command",cmd);		
	element.setAttribute("server",this.server.type);
	element.setAttribute("conID",this.server.imaps);
	printReq('request '+this.server.imaps+' '+act +'< '+JSON.parse(cmd).request+' \>');
	element.setAttribute("settings",settings);		
	document.documentElement.appendChild(element);
	// var evt = document.createEvent("Events");
	// evt.initEvent("MyExtensionEvent", true, false);
	// element.dispatchEvent(evt);


	var editorExtensionId = 'ikhibemopdnmbjfnhoepochhedbodhih';
	try{
		chrome.runtime.sendMessage(editorExtensionId, {actionEvt: act, command: cmd, settings:settings},
  		function(response) {
			if(response){
				self.server.result(response.message);
			}
			else
				//alert(response);
  	});
 	}catch(e){
		alert(e);
 	}
}

