
SMTP_Sendmail.prototype.func=function(response,id){
    console.log('SMTP '+id+'> '+response);
    if(SMTP_Sendmail.cmds.length > SMTP_Sendmail.nextFuncIndex+1){
          var nextFunc=SMTP_Sendmail.cmds[++SMTP_Sendmail.nextFuncIndex];
          console.log('SMTP> '+SMTP_Sendmail.nextFuncIndex);
          nextFunc();
    }
}

function SMTP_Sendmail(id){
  SMTP_Sendmail.smtp = new SMTP_Interface(this.func,id);
  SMTP_Sendmail.cmds = new Array();
  SMTP_Sendmail.nextFuncIndex=0;
}

SMTP_Sendmail.prototype.start = function(){
    var obj={
        host : host,
        port : port,
        sec : security
    };

    SMTP_Sendmail.smtp.start(obj);

}

SMTP_Sendmail.prototype.send = function(fun){  
  SMTP_Sendmail.cmds.push(this.start);

  SMTP_Sendmail.cmds.push(this.clearCmds);
  SMTP_Sendmail.cmds.push(fun);                 // called when all command executed

  SMTP_Sendmail.nextFuncIndex=0;
  var f=SMTP_Sendmail.cmds[SMTP_Sendmail.nextFuncIndex];
  f();
}



SMTP_Sendmail.prototype.sendmail = function(func){
  this.send(func);                // passs the last function
}

SMTP_Sendmail.prototype.clearCmds=function (){
  console.log('SMTP cmds clearing> ');
  SMTP_Sendmail.cmds=[];
}