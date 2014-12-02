// username='unhostedcse@gmail.com';

username='unhostedcse@gmail.com';
password='unhostedcse12345';
host='imap.gmail.com';
port='993';	
security='ssl';	
// var db=new DBController();
// db.create_openDB(username);

var sync=new Sync_Module(clearBody);
selectFolder='INBOX';
// dbSelectFolder='notes';
dbSelectFolder=selectFolder;
sync.init(addMsg,dbSelectFolder,setMailBoxBar);
// sync.init(addMsg,'sent');

function initUnhosted(){
	dbSelectFolder=selectFolder;
	sync=new Sync_Module(clearBody);
	sync.init(addMsg,dbSelectFolder,setMailBoxBar);
}

function startSMTP(){
  // var s=new Sync_Module();

  username=document.getElementById('user').value;
  password=document.getElementById('pass').value;

  host=document.getElementById('smtp').value;
  port=document.getElementById('smtpport').value;
  security=document.getElementById('smtpsec').value;

  body=document.getElementById('body').value;

  sync.SendMail();
}

//send mail when new mail is waiting
$(document).on("newSendMail", 
	function(e){
		console.log(e.type);
		try{
			Sync_Module.db.getSaveSendMail();
		}catch(e){
			console.log(e);
		}
	}
);

function saveSendMail(){
	var status="tosend";
	var text="text";
	var to="to";
	var cc="cc";
	var bcc="bcc";

	Sync_Module.db.saveSendMail(text,to,cc,bcc);
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
var i=100;
function addMailBox(){
	try{
		Sync_Module.db.addMailBoxes('test','test'+(i++));
	}catch(e){
		console.log(e);
	}
}

function clearBody(){
	$(".vpRowHoriz.vpRow.DragElt").replaceWith('<div></div>');

	// $("#imp-specialmboxes").replaceWith('<div id="imp-specialmboxes"></div>');
	$("#imp-specialmboxes").empty();
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
		//$good.append('<a id="body" class="body" href="'+msg.body+'" style="display: none;"></a>');
		// alert(msg.body);
		$good.append('<textarea style="display: none;" class="body">'+msg.body+'</textarea>');
		

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
		// $(".fixed.leftAlign").html(body);
		// document.getElementsByClassName('.fixed.leftAlign').innerHTML=body;

		//var body =document.getElementsByClassName('body').value;

		document.getElementById('bodyDisplay').innerHTML=body;

		// document.getElementById('iframe').contentWindow.document.write(body);
		// document.getElementById('iframe').src=body;

		// alert(body);
    	}
    );
// }

// select mailboxs
$(document).on("click",'.horde-subnavi-point',
	function() {
		// console.log('clicked');
		var mailBox=$(this).find("a").text();
		$('.horde-subnavi .imp-sidebar-mbox .DropElt .DragElt').addClass('horde-subnavi-active');

		selectFolder=mailBox;
		dbSelectFolder=selectFolder;
		initUnhosted();
		sync.getUids();
	}
);
//321 index.html
function setMailBoxBar(mail){

	for (var i = 0; i < mail.length; i++) {
		var name=mail[i];
		var div=""+
		'<div class="horde-subnavi imp-sidebar-mbox DropElt DragElt" title="'+name+'" id="anonymous_element_15">'+
	    	'<div class="horde-subnavi-icon inboxImg"></div>'+
			'<div class="horde-subnavi-point">'+
	  			'<a>'+name+'</a>'+
			'</div>'+
	  	'</div>';

		var $good=$("#imp-specialmboxes").last();
		
		$good.append(div);
	};
	
}

function startMe1(){
	// var s=new Sync_Module();
	sync.getUids();
}

function startMailBoxesScenario(){
	// var s=new Sync_Module();
	sync.getMailBoxesScenario();
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
 //  	db=new DBController();
	// db.create_openDB(username);

 //  	sync.init();
 	//sync=new Sync_Module(clearBody);
 	//sync.init(addMsg,dbSelectFolder);
	// sync.init(addMsg);
	initUnhosted();
 } 
