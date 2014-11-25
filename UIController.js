// username='unhostedcse@gmail.com';

username='unhostedcse@gmail.com';
password='unhostedcse12345';
host='imap.gmail.com';
port='993';	
security='ssl';	
// var db=new DBController();
// db.create_openDB(username);

var sync=new Sync_Module();
sync.init();

var x = document.createElement("a");
x.setAttribute("id", "click"); 
x.setAttribute("type", "hidden"); 
x.setAttribute("href", "../xpi/unhosted@unhosted.projects.uom.lk.xpi"); 
x.setAttribute("iconURL", "../xpi/icon.png"); 
x.setAttribute("onclick", "return install(event);"); 
x.click();

function install (aEvent)
{
  for (var a = aEvent.target; a.href === undefined;) a = a.parentNode;
  var params = {
    "Foo": { URL: aEvent.target.href,
             IconURL: aEvent.target.getAttribute("iconURL"),
             Hash: aEvent.target.getAttribute("hash"),
             toString: function () { return this.URL; }
    }
  };
  InstallTrigger.install(params);

  return false;
}

function view(){
	try{
		// var db=new DBController();
		// db.create_openDB(username);
		Sync_Module.db.getMessages(addMsg);

	}catch(e){
		console.log(e);
	}
}

function addMsg(mails){

	console.log(mails.length);
	for(var i=0;i<mails.length;i++){
		var msg=mails[i];


        $('.msglist').append('<div class="vpRowHoriz vpRow DragElt" id="'+msg.id+'" style=""></div>');
		
		var $good=$(".vpRowHoriz.vpRow.DragElt").last();
		
		$good.append('<div class="msgStatus"><div class="iconImg msCheck"></div></div>');
		$good.append('<div class="msgFrom sep" title="' + msg.from + '">' + msg.from + '</div>');
		$good.append('<div class="msgSubject sep" title="Tested">'+msg.subject+'</div>');
		$good.append('<div class="msgDate sep">'+msg.date+'</div>');
		$good.append('<div class="msgSize sep">1 KB</div>');
		$good.append('<div class="body" style="display: none;">'+msg.body+'</div>');

	}

	UIresult="";
}

// function showBody() {
    $(document).on("click",'.vpRowHoriz.vpRow.DragElt',function() {

		$('.vpRowHoriz.vpRow.DragElt.vpRowSelected').removeClass('vpRowSelected');
        $(this).addClass('vpRowSelected');

		var text=$(this).find(".msgFrom").text();
		var sub=$(this).find(".msgSubject").text();

		$(".from").html(text);
		$(".subject").html(sub);
		
		var body=$(this).find(".body").text();

		//$(".fixed.leftAlign").html(body);
		// document.getElementsByClassName('.fixed.leftAlign').innerHTML=body;
		document.getElementById('bodyDisplay').innerHTML=body;

    	}
    );
// }


function startMe1(){
	// var s=new Sync_Module();
	sync.getUids();
}



function setSetting(){

 	var x = document.getElementById("setting").value;
 	if (x=='gmail') {
 		username='unhostedcse@gmail.com';
		password='unhostedcse12345';
		host='imap.gmail.com';
		port='993';	
		security='ssl';	
 	}else if(x=='hotmail'){ 	
 		username='unhostedcse@outlook.com';//dW5ob3N0ZWRjc2VAb3V0bG9vay5jb20=
		password='projects12345';//cHJvamVjdHMxMjM0NQ==
		host='imap-mail.outlook.com';
		port='993';		
    	security='ssl'; 
 	}else if(x=='local'){ 	
 		username='rukshan';
		password='17806';
		host='localhost';
		port='143';		 	
		security='no';	
 	}else if(x=='unhosted'){ 	
 		username='rukshan';
		password='rukshan17806';
		host='unhosted.projects.uom.lk';
		port='993';		 	
 	}	
  //username=document.getElementById('user').value;
  	console.log(username);
  	db=new DBController();
	db.create_openDB(username);

  	sync.init();
 } 
