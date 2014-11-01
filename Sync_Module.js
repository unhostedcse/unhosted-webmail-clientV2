function Sync_Module(){

}

Sync_Module.prototype.getUids = function(){
	var imap=new IMAP_Fetch();
	imap.getUids(this.getUidsReady);

	//var smtp=new SMTP_Sendmail();
	//smtp.sendmail(this.SendMailReady);
}

Sync_Module.prototype.getUidsReady = function(){
	console.log('finished getUids');
	console.log("final result select= "+result.select);
	console.log("final result fetchList= "+result.fetchList);
	console.log("final result fetchListFlags= "+result.fetchListFlags);
	console.log("final result fetchBody= "+result.fetchBody);
}

Sync_Module.prototype.SendMailReady = function(){
	console.log('finished SendMailReady');
}