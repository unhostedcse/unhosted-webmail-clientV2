function TCP_Interface(){
	document.addEventListener("MyAnswerEvent",function(e) { TCP_Interface.prototype.ExtensionAnswer(e); },false);
}

TCP_Interface.prototype.connect = function(act){
	var element = document.createElement("MyExtensionDataElement");		
	element.setAttribute("action",act);		
	document.documentElement.appendChild(element);
	var evt = document.createEvent("Events");
	evt.initEvent("MyExtensionEvent", true, false);
	element.dispatchEvent(evt);
}

TCP_Interface.prototype.ExtensionAnswer=function(EvtAnswer){
	var value=EvtAnswer.target.getAttribute("value");
	alert(value);
}