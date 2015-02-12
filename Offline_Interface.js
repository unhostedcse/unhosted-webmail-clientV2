function Offline_Interface(res,i){
  this.imaps=0;
  this.type='offline';
  if(isFirefox){
    this.tcp=new TCP_Interface(this);
  }else if(isChrome){
    this.tcp = new TCP_Interface_Chrome(this);
  }else{

  }	   
	Offline_Interface.onResponse=res;
}

Offline_Interface.prototype.result=function(value,id){
  Offline_Interface.onResponse(value,id);  
}

Offline_Interface.prototype.ping = function(){
  var cmd=new Command(null, null, "\\* OK", "\r\n");
  var obj={
        host : 'imap.gmail.com',
        port : 993,
        sec : 'ssl'
  };

  this.tcp.connect('connect',JSON.stringify(cmd),JSON.stringify(obj));
  return cmd;
}

function Command(request, onResponse, responseStart, responseEnd) {
      this.request = request;
      this.onResponse = onResponse;
      this.responseStart = responseStart;
      this.responseEnd = responseEnd;
}