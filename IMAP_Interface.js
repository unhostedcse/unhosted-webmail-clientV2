function IMAP_Interface(res){
	this.tcp=new TCP_Interface(this);
	this.tag=0;
	IMAP_Interface.onResponse=res;
}

IMAP_Interface.prototype.send = function(){
	this.tcp.connect('connect');
}

IMAP_Interface.prototype.result=function(value){
	IMAP_Interface.onResponse(value);	
}

IMAP_Interface.prototype.start = function(obj){
	var cmd=new Command(null, null, /\* OK/, /\r\n/);   

	this.tcp.connect('connect',JSON.stringify(cmd),JSON.stringify(obj));
}

IMAP_Interface.prototype.login = function(obj) {
	this.tag++;
	var cmd=new IMAPCommand(this.tag,"LOGIN " + obj.username + " " + obj.password);
	this.tcp.connect('LOGIN',JSON.stringify(cmd));
}

IMAP_Interface.prototype.select = function(folder) {
	this.tag++;
	var f=function(response) {
      //alert(response);
      var regexp = /\* (\d+) EXISTS/;
      var count = regexp.exec(response)[1];
      return parseInt(count, 10);
    };
	var cmd=new IMAPCommand(this.tag,"SELECT " + folder,f);
	this.tcp.connect('select',JSON.stringify(cmd));
	return cmd;
}

IMAP_Interface.prototype.fetchList = function() {
    var f=function(response) {
      // "UID xx", "RFC822.SIZE yy", "FLAGS (zz)" order may differ
        var regexp = /((UID (\w+)|RFC822.SIZE (\w+)|FLAGS \((.*?)\))[\s)]+){3}/g;
        var regid = /(UID (\w+))/g;
        var regsize = /(RFC822.SIZE (\w+))/g; 
        var regflag = /(FLAGS \((.*?)\))/g;
        var getres, getid, getsize, getflag, sizes = new Array(),ids = new Array();
        var i=0;
        while((getres = regexp.exec(response))){
          getflag = regflag.exec(response);
          var flags = getflag[2];
          getsize = regsize.exec(response);
          getid = regid.exec(response) ;
          if (!flags.match(/Deleted/)) {
            sizes[getid[2]] = getsize[2];
            ids[i++]=getid[2];
          }
        }
        return ids;
      }

    this.tag++;
    var cmd=new IMAPCommand(this.tag,"FETCH 1:* (UID RFC822.SIZE FLAGS)",f);
	this.tcp.connect('fetchList',JSON.stringify(cmd));
	return cmd;

  }

IMAP_Interface.prototype.fetchListFlags = function() {
    var f= function(response) {
      // "UID xx", "RFC822.SIZE yy", "FLAGS (zz)" order may differ
        var regexp = /((UID (\w+)|RFC822.SIZE (\w+)|FLAGS \((.*?)\))[\s)]+){3}/g;
        var regid = /(UID (\w+))/g;
        var regsize = /(RFC822.SIZE (\w+))/g; 
        var regflag = /(FLAGS \((.*?)\))/g;
        var getres, getid, getsize, getflag, Flags = new Array();
        while((getres = regexp.exec(response))){
          getflag = regflag.exec(response);
          var flags = getflag[2];
          getsize = regsize.exec(response);
          getid = regid.exec(response) ;
          if (!flags.match(/Deleted/)) {
            Flags[getid[2]] = getflag[2];
          }
        }
        return Flags;
      }

    this.tag++;
    var cmd=new IMAPCommand(this.tag,"FETCH 1:* (UID RFC822.SIZE FLAGS)",f);
    this.tcp.connect('fetchListFlags',JSON.stringify(cmd));
    return cmd;
  }

   IMAP_Interface.prototype.fetchBody = function(uid, headersOnly) {

    var f=function(response) {
        return response.replace(/^.*\r\n|\)?\r\n.*\r\n.*\r\n$/g, "");
    }
    this.tag++;
    var cmd=new IMAPCommand(this.tag,"UID FETCH " + uid + (headersOnly ? " BODY[HEADER]" : " BODY[]"),f);
    this.tcp.connect('fetchBody',JSON.stringify(cmd));
    return cmd;
  }

IMAP_Interface.prototype.expunge = function() {

  var f=function(response) {
  }

  this.tag++;
  var cmd=new IMAPCommand(this.tag,"EXPUNGE ",f);
  this.tcp.connect('expunge',JSON.stringify(cmd));
  return cmd;
}

IMAP_Interface.prototype.logout = function() {

  var f=function(response) {
  }
  this.tag++;
  var cmd=new IMAPCommand(this.tag,"LOGOUT",f);
  this.tcp.connect('logout',JSON.stringify(cmd));
  return cmd;
}

function Command(request, onResponse, responseStart, responseEnd) {
      this.request = request;
      this.onResponse = onResponse;
      this.responseStart = responseStart;
      this.responseEnd = responseEnd;
}


function IMAPCommand(tag,request, onResponse, responseStart, responseEnd) {
	this.request = tag + " " + request;
	this.onResponse = onResponse;
	this.responseStart = new RegExp("(^|\r\n)" + tag + " OK");
	this.responseEnd = new RegExp("(^|\r\n)" + tag + " ");
}
