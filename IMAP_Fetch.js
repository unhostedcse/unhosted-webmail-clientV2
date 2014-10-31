var cmd;
var cmds=new Array();
var nextFunc;
var nextFuncIndex=0;

function result(){}

var func=function(response){
    console.log(response);
    if(tt.onTheResponse){
        var val=tt.onTheResponse(response);
        tt.onTheResponse=null;        
        if(cmds.length > nextFuncIndex+1){
          nextFunc=cmds[++nextFuncIndex];
        }
        tt.setVal(val,nextFunc);
    }else{
        if(cmds.length > nextFuncIndex+1){
          nextFunc=cmds[++nextFuncIndex];
          nextFunc();
        }
    }

    

    if(cmds.length == nextFuncIndex+1){
      //IMAP_Fetch.ready();
    }
}

var tt= new IMAP_Interface(func);

function start(){
  var obj={
        host : "imap.gmail.com",
        port : 993,
        sec : "ssl"
      };

  obj={
        host : "localhost",
        port : 143,
        sec : "no"
      };

  obj={
        host : host,
        port : port,
        sec : security
    };


  tt.start(obj);
}

function login(){
  var obj={
        username : username,
        password : password
      };

  tt.login(obj);
  //tt.login("unhostedcse@gmail.com","unhostedcse12345");
}

function select(){
  cmd=tt.select('inbox');
  tt.onTheResponse=cmd.onResponse;
  tt.setVal=function(val,nextFunc){
      result.select=val;
      //console.log("result select= "+result.select);
      nextFunc();
  }
}

function fetchList(){
  cmd=tt.fetchList();
  tt.onTheResponse=cmd.onResponse;
  tt.setVal=function(val,nextFunc){
      result.fetchList=val;
      //console.log("result fetchList= "+result.fetchList);
      nextFunc();
  }
}

function fetchListFlags(){
  cmd=tt.fetchListFlags();
  tt.onTheResponse=cmd.onResponse;
  tt.setVal=function(val,nextFunc){
      result.fetchListFlags=val;
      //console.log("result fetchListFlags= "+result.fetchListFlags);
      nextFunc();
  }
}

function fetchBody(id){
  id=8;
  cmd=tt.fetchBody(id,false);
  tt.onTheResponse=cmd.onResponse;
  tt.setVal=function(val,nextFunc){
      result.fetchBody=val;
      //console.log("result fetchBody= "+result.fetchBody);
      nextFunc();
  }
}

function expunge() {
  tt.expunge();
  tt.onTheResponse=null;
}

function logout () {
  tt.logout();
  tt.onTheResponse=null;
}

function getInboxIDs(f){  
  cmds.push(start);
  cmds.push(login);
  cmds.push(select);
  cmds.push(fetchList);
  cmds.push(fetchListFlags);
  cmds.push(fetchBody);
  //cmds.push(expunge);
  cmds.push(logout);

  cmds.push(clearCmds);
  cmds.push(f);                 // called when all command executed

  nextFuncIndex=0;
  var f=cmds[nextFuncIndex];
  f();
}

function IMAP_Fetch(){
}

IMAP_Fetch.prototype.getUids = function(func){
  getInboxIDs(func);                // passs the last function
}

function clearCmds(){
  cmds=[];
}