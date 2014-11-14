function result(){}

IMAP_Fetch.prototype.func=function(response,id){
    //console.log(response);
    printRes('IMAP '+id+'> '+response);
    if(IMAP_Fetch.imap.onTheResponse){
        var val=IMAP_Fetch.imap.onTheResponse(response);
        IMAP_Fetch.imap.onTheResponse=null;        
        if(IMAP_Fetch.cmds.length > IMAP_Fetch.nextFuncIndex+1){
          nextFunc=IMAP_Fetch.cmds[++IMAP_Fetch.nextFuncIndex];
          if(nextFunc instanceof Array){
            para=nextFunc[1];
            // console.log("para "+para);
            nextFunc=nextFunc[0];
          }
          // console.log(nextFunc);
        }        
        IMAP_Fetch.imap.setVal(val,nextFunc,para);
    }else{
        if(IMAP_Fetch.cmds.length > IMAP_Fetch.nextFuncIndex+1){
          nextFunc=IMAP_Fetch.cmds[++IMAP_Fetch.nextFuncIndex];
          // console.log(nextFunc);
          para="";
          if(nextFunc instanceof Array){
            para=nextFunc[1];
            nextFunc=nextFunc[0];
          }
           
          nextFunc(para);
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


IMAP_Fetch.prototype.ListFolder=function(){
  cmd=IMAP_Fetch.imap.ListFolder();
  IMAP_Fetch.imap.onTheResponse=cmd.onResponse;
  IMAP_Fetch.imap.setVal=function(val,nextFunc,para){
      result.ListFolder=val;
      //+result.ListFolder
      printCmd("id= "+this.imaps+" result ListFolder= ");
      for(var i=0;i<val.length;i++){
        console.log(val[i].type+" "+val[i].folder);
      }
      nextFunc(para);
  }
}

IMAP_Fetch.prototype.select=function(folder){
  cmd=IMAP_Fetch.imap.select(folder || 'inbox');
  //cmd=IMAP_Fetch.imap.select('[Gmail]/Drafts');
  IMAP_Fetch.imap.onTheResponse=cmd.onResponse;
  IMAP_Fetch.imap.setVal=function(val,nextFunc,para){
      result.select=val;
      printCmd("id= "+this.imaps+" result select= "+result.select);
      nextFunc(para);
  }
}

IMAP_Fetch.prototype.fetchList=function(){
  cmd=IMAP_Fetch.imap.fetchList();
  IMAP_Fetch.imap.onTheResponse=cmd.onResponse;
  IMAP_Fetch.imap.setVal=function(val,nextFunc,para){
      result.fetchList=val;
      printCmd("id= "+this.imaps+" result fetchList= "+result.fetchList);
      nextFunc(para);
  }
}

IMAP_Fetch.prototype.fetchListFlags=function(){
  cmd=IMAP_Fetch.imap.fetchListFlags();
  IMAP_Fetch.imap.onTheResponse=cmd.onResponse;
  IMAP_Fetch.imap.setVal=function(val,nextFunc,para){
      result.fetchListFlags=val;
      printCmd("id= "+this.imaps+" result fetchListFlags= "+result.fetchListFlags);
      nextFunc(para);
  }
}

IMAP_Fetch.prototype.fetchBody=function(id){
  // id=8;
  // id=result.fetchList[2];
  //id=IMAP_Fetch.id;
  cmd=IMAP_Fetch.imap.fetchBody(id,false);
  IMAP_Fetch.imap.onTheResponse=cmd.onResponse;
  IMAP_Fetch.imap.setVal=function(val,nextFunc,para){
      
      if(!result.fetchBody){
        result.fetchBody=new Array();
      }
      result.fetchBody[id]=val;
      printCmd("id= "+this.imaps+" result fetchBody= "+id+" "+result.fetchBody[id]);
      nextFunc(para);
  }
}

IMAP_Fetch.prototype.fetchBodys=function(id){

  for(var i=0;i<result.fetchList.length;i++){
      var id=result.fetchList[i];
      IMAP_Fetch.fetchBody(id);
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
  IMAP_Fetch.cmds.push(this.ListFolder);


  IMAP_Fetch.cmds.push(this.select);
  IMAP_Fetch.cmds.push(this.fetchList);
  IMAP_Fetch.cmds.push(this.fetchListFlags);
  //IMAP_Fetch.cmds.push(this.fetchBodys);

  // for(var i=0;i<result.fetchList.length;i++){
  //     var id=result.fetchList[i];
  //     IMAP_Fetch.id=id;
  //     IMAP_Fetch.cmds.push(this.fetchBody);
  // }
  // IMAP_Fetch.cmds.push(this.expunge);
  IMAP_Fetch.cmds.push(this.logout);

  
  IMAP_Fetch.cmds.push(f);                 // called when all command executed
  IMAP_Fetch.cmds.push(this.clearCmds);

  IMAP_Fetch.nextFuncIndex=0;
  var f=IMAP_Fetch.cmds[IMAP_Fetch.nextFuncIndex];
  f();
}

IMAP_Fetch.prototype.getGetBody =function(f){  
  IMAP_Fetch.cmds.push(this.start);
  IMAP_Fetch.cmds.push(this.login);
  IMAP_Fetch.cmds.push(this.select);

  for(var i=0;i<result.fetchList.length;i++){
      var id=result.fetchList[i];
      if(result.keys.indexOf(parseInt(id))<0){
        IMAP_Fetch.cmds.push([this.fetchBody,id]);
        console.log('id '+id+" not in DB");
        // console.log(typeof(id)+" "+typeof(result.keys[i]));
      }
      else
        console.log('id '+id+" alread in DB");
  }
  IMAP_Fetch.cmds.push(this.logout);

  
  IMAP_Fetch.cmds.push(f);                 // called when all command executed
  IMAP_Fetch.cmds.push(this.clearCmds);
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

IMAP_Fetch.prototype.clearCmds=function (){
  console.log('clearing');
  IMAP_Fetch.cmds=[];
  IMAP_Fetch.imap.onTheResponse=null;
}