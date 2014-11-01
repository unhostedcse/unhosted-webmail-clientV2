function SMTP_Interface(res){
	this.tcp=new TCP_Interface(this);
	this.tag=0;
	SMTP_Interface.onResponse=res;	
}

SMTP_Interface.prototype.result=function(value){
	SMTP_Interface.onResponse(value);	
}

 SMTP_Interface.prototype.start = function(obj) {
    var cmd=new SMTPCommand(null,null,null,null);
    this.tcp.connect('connect',JSON.stringify(cmd),JSON.stringify(obj));
    return cmd;
  }

function SMTPCommand(request, onResponse, responseStart, responseEnd) {
	this.request = request;
	this.onResponse = onResponse;
	this.responseStart = responseStart || /^2/;
	this.responseEnd = responseEnd || /\r\n$/;
}

