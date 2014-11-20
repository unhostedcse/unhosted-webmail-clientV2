var imaps=0;
function Sync_Module(){
	
}

Sync_Module.prototype.init = function(){
	Sync_Module.db=new DBController();
	Sync_Module.db.create_openDB(username);
	console.log('username '+username);
}

Sync_Module.prototype.getUids = function(){
	var imap=new IMAP_Fetch(++imaps);
	imap.getUids(this.getUidsReady);
	console.log('crated imap service');
}

Sync_Module.prototype.getUidsReady = function(){
	console.log('finished getUids');
	console.log("final result select= "+result.select);
	console.log("final result fetchList= "+result.fetchList);
	console.log("final result fetchListFlags= "+result.fetchListFlags);
	// console.log("final result fetchBody= "+result.fetchBody);
	// Sync_Module.prototype.getBody();
	Sync_Module.db.getKeys(Sync_Module.prototype.getBody);
}

Sync_Module.prototype.getBody = function(){
	var imap=new IMAP_Fetch(++imaps);
	imap.getGetBody(Sync_Module.prototype.getBodyReady);
	console.log('crated imap body service');
}

Sync_Module.prototype.getBodyHeader = function(){
	var imap=new IMAP_Fetch(++imaps);
	imap.getGetBody(Sync_Module.prototype.getTextReady);
	console.log('crated imap body header service');
}

Sync_Module.prototype.getBodyReady = function(){
	
	console.log('finished getbodyheader');
	console.log("final result select= "+result.select);
	console.log("final result fetchList= "+result.fetchList);
	console.log("final result fetchListFlags= "+result.fetchListFlags);
	//console.log("final result fetchBody= "+ (result.fetchBody || 'empty'));

	if(result.fetchMIME){
		for (var i = 0; result.fetchMIME && i < result.fetchMIME.length; i++) {

			var record=result.fetchMIME[i];
			if(record){
				Sync_Module.db.addContain(record,i);
			}
		};
	}else{
		console.log("DB is upto date");
	}

	result.fetchMIME=new Array();
	console.log("finished adding DB");
	
}

Sync_Module.prototype.SendMailReady = function(){
	console.log('finished SendMailReady');
}

Sync_Module.prototype.SendMail = function(){
	console.log('SMTP command starting');
	var smtp=new SMTP_Sendmail(++imaps);
	smtp.sendmail(this.SendMailReady);
}

Sync_Module.prototype.StartDB = function(){
	this.db=new DBController();
	this.db.create_openDB('nilushan');
}

 Sync_Module.prototype.add = function(){
 	this.db.add();
 }

Sync_Module.prototype.viewDB = function(){
	// Sync_Module.db=new DBController();
	// console.log(username);
	// Sync_Module.db.create_openDB(username);
 	Sync_Module.db.view();
 }

Sync_Module.prototype.test = function(){
 	Sync_Module.db.getKeys();
 }
