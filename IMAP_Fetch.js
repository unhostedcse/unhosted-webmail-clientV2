function result(){}

IMAP_Fetch.prototype.func=function(response,id){
    //console.log(response);
    printRes('IMAP '+id+'> '+response);
    if(IMAP_Fetch.imap.onTheResponse){
        var val=IMAP_Fetch.imap.onTheResponse(response);
        IMAP_Fetch.imap.onTheResponse=null;        
        if(IMAP_Fetch.cmds.length > IMAP_Fetch.nextFuncIndex+1){
          nextFunc=IMAP_Fetch.cmds[++IMAP_Fetch.nextFuncIndex];
        }
        IMAP_Fetch.imap.setVal(val,nextFunc);
    }else{
        if(IMAP_Fetch.cmds.length > IMAP_Fetch.nextFuncIndex+1){
          nextFunc=IMAP_Fetch.cmds[++IMAP_Fetch.nextFuncIndex];
          nextFunc();
        }
    }

    

    if(IMAP_Fetch.cmds.length == IMAP_Fetch.nextFuncIndex+1){
      //IMAP_Fetch.ready();
    }
}

//var tt= new IMAP_Interface(func);

IMAP_Fetch.prototype.start=function(){
  obj={
        host : host,
        port : port,
        sec : security
    };

  IMAP_Fetch.imap.start(obj);
}

IMAP_Fetch.prototype.login=function(){
  var obj={
        username : username,
        password : password
      };

  IMAP_Fetch.imap.login(obj);
  //tt.login("unhostedcse@gmail.com","unhostedcse12345");
}

IMAP_Fetch.prototype.select=function(){
  cmd=IMAP_Fetch.imap.select('inbox');
  IMAP_Fetch.imap.onTheResponse=cmd.onResponse;
  IMAP_Fetch.imap.setVal=function(val,nextFunc){
      result.select=val;
      printCmd("id= "+this.imaps+" result select= "+result.select);
      nextFunc();
  }
}

IMAP_Fetch.prototype.fetchList=function(){
  cmd=IMAP_Fetch.imap.fetchList();
  IMAP_Fetch.imap.onTheResponse=cmd.onResponse;
  IMAP_Fetch.imap.setVal=function(val,nextFunc){
      result.fetchList=val;
      printCmd("id= "+this.imaps+" result fetchList= "+result.fetchList);
      nextFunc();
  }
}

IMAP_Fetch.prototype.fetchListFlags=function(){
  cmd=IMAP_Fetch.imap.fetchListFlags();
  IMAP_Fetch.imap.onTheResponse=cmd.onResponse;
  IMAP_Fetch.imap.setVal=function(val,nextFunc){
      result.fetchListFlags=val;
      printCmd("id= "+this.imaps+" result fetchListFlags= "+result.fetchListFlags);
      nextFunc();
  }
}

IMAP_Fetch.prototype.fetchBody=function(id){
  id=8;
  id=result.fetchList[2];
  cmd=IMAP_Fetch.imap.fetchBody(id,false);
  IMAP_Fetch.imap.onTheResponse=cmd.onResponse;
  IMAP_Fetch.imap.setVal=function(val,nextFunc){
      result.fetchBody=val;
      printCmd("id= "+this.imaps+" result fetchBody= "+result.fetchBody);
      nextFunc();
  }
}

IMAP_Fetch.prototype.expunge=function() {
  IMAP_Fetch.imap.expunge();
  IMAP_Fetch.imap.onTheResponse=null;
}

IMAP_Fetch.prototype.logout=function() {
  IMAP_Fetch.imap.logout();
  IMAP_Fetch.imap.onTheResponse=null;
}

IMAP_Fetch.prototype.getInboxIDs =function(f){  
  IMAP_Fetch.cmds.push(this.start);
  IMAP_Fetch.cmds.push(this.login);
  IMAP_Fetch.cmds.push(this.select);
  IMAP_Fetch.cmds.push(this.fetchList);
  IMAP_Fetch.cmds.push(this.fetchListFlags);
  IMAP_Fetch.cmds.push(this.fetchBody);
  //cmds.push(expunge);
  IMAP_Fetch.cmds.push(this.logout);

  IMAP_Fetch.cmds.push(clearCmds);
  IMAP_Fetch.cmds.push(f);                 // called when all command executed

  IMAP_Fetch.nextFuncIndex=0;
  var f=IMAP_Fetch.cmds[IMAP_Fetch.nextFuncIndex];
  f();
}

function IMAP_Fetch(i){
  this.imaps=i;
  IMAP_Fetch.imap= new IMAP_Interface(this.func,i);
  IMAP_Fetch.cmds=new Array();
  IMAP_Fetch.nextFuncIndex=0;
}

IMAP_Fetch.prototype.getUids = function(func){
  this.getInboxIDs(func);                // passs the last function
}

function clearCmds(){
  IMAP_Fetch.cmds=[];
}