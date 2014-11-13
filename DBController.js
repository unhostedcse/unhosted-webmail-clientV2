function DBController(){
	this.database;
	this.id=0;
}

DBController.prototype.create_openDB=function(indexedDBName){
	
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;	
	var self=this;
	if (!window.indexedDB) {
	    alert("Sorry!Your browser doesn't support IndexedDB");
	}

    var request = window.indexedDB.open(indexedDBName,1);

    request.onerror = function(event) {
    	console.log(event.target.errorCode);
    };

    request.onsuccess = function(event) {
        self.database=request.result;
      	//console.log(event.target);             	
    };

    request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("notes", { keyPath: "id",autoIncrement:true});
    };   

}

DBController.prototype.add=function(record){
	var id=100;
	var self=this;
   	this.database.transaction("notes").objectStore("notes").get(parseInt(id)).onsuccess = function(event) {
	  	var transaction = self.database.transaction(["notes"], "readwrite");
	    var objectStore = transaction.objectStore("notes");
	    // var note={};
	    // note.val=self.id++;
	    // note.body="bodyoasdoasdoasodsa";
	    var request=objectStore.put(record);
	    request.onsuccess = function(event) {
	    	console.log(event);
	   	};
	};
}

var dbt;
DBController.prototype.view=function(db){
	var objectStore = this.database.transaction("notes").objectStore("notes");
    objectStore.openCursor().onsuccess = function(event) {
    	var cursor = event.target.result;    	
    	if (cursor) {	    	
    		if(cursor.value.body){
	    		dbt=cursor;
		    	console.log(cursor.source.transaction.db.name+" "+cursor.value.id+" "+cursor.value.mid);
		    	console.log(cursor.value.body);		    	
		    }	
		    cursor.continue();
	    }	
    }
}