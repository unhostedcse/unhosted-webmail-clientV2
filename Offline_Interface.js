function Offline_Interface(res,i){

var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;    // At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
var isIE = /*@cc_on!@*/false || !!document.documentMode; 

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