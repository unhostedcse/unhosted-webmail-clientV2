function Sync_Module(){

}

Sync_Module.prototype.getUids = function(){
	var imap=new IMAP_Fetch();
	imap.getUids(this.getUidsReady);
}

Sync_Module.prototype.getUidsReady = function(){
	console.log('finished getUids');
	console.log("final result select= "+result.select);
	console.log("final result fetchList= "+result.fetchList);
}