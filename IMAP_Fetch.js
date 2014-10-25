var cmd;
var cmds=new Array();
var nextFunc;
var nextFuncIndex=0;

function result(){}

var func=function(response){
    console.log(response);
    if(tt.onTheResponse){
        var val=tt.onTheResponse(response);
        //alert("val: "+val+" "+tt.onTheResponse.toString());
        tt.setVal(val);
    }else{
        //alert('false ok');
    }

    if(cmds.length > nextFuncIndex+1){
      nextFunc=cmds[++nextFuncIndex];
      nextFunc();
    }

    if(cmds.length == nextFuncIndex+1){
      //IMAP_Fetch.ready();
    }
}

var tt= new IMAP_Interface(func);

function start(){
  tt.start();
}

function login(){
  tt.login("rukshan","17806");
}

function select(){
  cmd=tt.select('inbox');
  tt.onTheResponse=cmd.onResponse;
  tt.setVal=function(val){
      result.select=val;
      console.log("result select= "+result.select);
  }
}

function fetchList(){
  cmd=tt.fetchList();
  tt.onTheResponse=cmd.onResponse;
  tt.setVal=function(val){
      result.fetchList=val;
      console.log("result fetchList= "+result.fetchList);
  }
}

function getInboxIDs(f){  
  cmds.push(start);
  cmds.push(login);
  cmds.push(select);
  cmds.push(fetchList);
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