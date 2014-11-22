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

        // self.update(3,'body body body body');
      	//console.log(event.target);             	
    };

    request.onupgradeneeded = function(event) {
        var db = event.target.result;
        //var objectStore = db.createObjectStore("notes", { keyPath: "id",autoIncrement:true});
        var objectStore = db.createObjectStore("notes", {autoIncrement:false});
    };   

}

DBController.prototype.add=function(record,id){
	//var id=100;
		// var self=this;
  //  	// this.database.transaction("notes").objectStore("notes").get(parseInt(id)).onsuccess = function(event) {
	 //  	var transaction = self.database.transaction(["notes"], "readwrite");
	 //    var objectStore = transaction.objectStore("notes");
	    // var note={};
	    // note.val=self.id++;
	    // note.body="bodyoasdoasdoasodsa";
	    // var request=objectStore.add(record,id);
	    this.addContain(record,id);

	    // request.onsuccess = function(event) {
	    // 	console.log(event);
	   	// };
	   	// request.onerror = function (event) {
	   	// 	console.log(event);
	   	// }
	// };
}

var dbt;
DBController.prototype.view=function(db){
	var objectStore = this.database.transaction("notes").objectStore("notes");
    objectStore.openCursor().onsuccess = function(event) {
    	var cursor = event.target.result;    	
    	if (cursor) {	    	
    		if(cursor.value){
		    	console.log("DB "+cursor.source.transaction.db.name);//+" "+cursor.value.mid
		    	console.log("MID "+cursor.key);		    	
		    	console.log("TO "+cursor.value.To);		    	
		    	console.log("FROM "+cursor.value.From);
		    	console.log("Subject "+cursor.value.Subject);		    	
		    	console.log("DATE "+cursor.value.Date);
		    	console.log("Received "+cursor.value.Received);	
				console.log("Body "+cursor.value.body);			    		    	
		    	console.log("");		    	
		    }	
		    cursor.continue();
	    }	
    }
}

DBController.prototype.addContain=function(record,id){
	var self=this;

   	this.database.transaction("notes").objectStore("notes").get(parseInt(id)).onsuccess = function(event) {
   		//dbt=event;   		
	  	var transaction = self.database.transaction(["notes"], "readwrite");
	    var objectStore = transaction.objectStore("notes");
   		
   		if(event.target.result){
   			console.log('id '+id + ' already in database' );
   		}else{
   			var request=objectStore.add(record,id);
		    request.onsuccess = function(event) {
		    	//console.log(id+' '+event);
		    	console.log('id '+id + ' added to database' );
		   	};
		   	request.onerror = function (event) {
		   		console.log(id+' '+event);
		   	}	
   		}
	};
}


DBController.prototype.getKeys=function(func){
	result.keys=new Array();
	var objectStore = this.database.transaction("notes").objectStore("notes");
    objectStore.openCursor().onsuccess = function(event) {
    	var cursor = event.target.result;    	
    	if (cursor) {	    	
    		if(cursor.value){
		    	// console.log(cursor.key);
		    	result.keys.push(cursor.key);
		    }	
		    cursor.continue();
	    }else{
	    	console.log('cursor.key over '+result.keys);
	    	func();
	    }	
    }	
}

DBController.prototype.update=function(id,val){

	// this.database.transaction(["notes"], "readwrite").objectStore("notes").get(id).onsuccess = function(event) {
 //    	var cursor = event.target.result;    	
 //    	if (cursor) {	    	
 //    		console.log(cursor);
 //    		cursor.body=val;    		
 //    		console.log('body updated as '+cursor.body);	

	//     }else{
	//     	console.log('cursor.key not present '+id);
	//     }	
 //    }	

    var objectStore = this.database.transaction(["notes"], "readwrite").objectStore("notes");
	var request = objectStore.get(id);

	request.onerror = function(event) {
	  // Handle errors!
	};

	request.onsuccess = function(event) {
	  // Get the old value that we want to update
	  var data = request.result;

	  // update the value(s) in the object that you want to change
	  data.body = val;

	  // Put this updated object back into the database.
	  var requestUpdate = objectStore.put(data,id);
	   requestUpdate.onerror = function(event) {
	     console.log(event);
	   };
	   requestUpdate.onsuccess = function(event) {
	   	console.log("id " +id +" update "+event.type);
	   };
	};

}

