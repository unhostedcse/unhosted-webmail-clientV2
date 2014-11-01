function TCP_Interface(server){
	this.server=server;
	document.addEventListener("MyAnswerEvent",function(e) { TCP_Interface.prototype.ExtensionAnswer(e,server); },false);
}

TCP_Interface.prototype.connect = function(act,cmd,settings){
	var element = document.createElement("MyExtensionDataElement");		
	element.setAttribute("action",act);		
	element.setAttribute("command",cmd);		
	printReq('request '+' '+act +'< '+JSON.parse(cmd).request+' \>');
	element.setAttribute("settings",settings);		
	document.documentElement.appendChild(element);
	var evt = document.createEvent("Events");
	evt.initEvent("MyExtensionEvent", true, false);
	element.dispatchEvent(evt);
}

TCP_Interface.prototype.ExtensionAnswer=function(EvtAnswer,server){
	var value=EvtAnswer.target.getAttribute("value");
	server.result(value);
}