var todoDB = (function() {
  var tDB = {};
  var datastore = null;
	console.log('sash');
  
  tDB.open = function(callback) {
  console.log('open successsssssssss');
  // Database version.
  var version = 15;

  // Open a connection to the datastore.
  var request = indexedDB.open('todosas', version);

  // Handle datastore upgrades.
  request.onupgradeneeded = function(e) {
    var db = e.target.result;

    e.target.transaction.onerror = tDB.onerror;

    // Delete the old datastore.
    if (db.objectStoreNames.contains('todo')) {
      db.deleteObjectStore('todo');
    }

    // Create a new datastore.
    var store = db.createObjectStore('todo', {
      keyPath: 'email'
    });
  };

  // Handle successful datastore access.
  request.onsuccess = function(e) {
    // Get a reference to the DB.
    datastore = e.target.result;
    console.log('open success');
    // Execute the callback.
    callback();
    

  };

  // Handle errors when opening the datastore.
   console.log('open success');
  request.onerror = tDB.onerror;
};
//////////////////
tDB.fetchMy = function(text,back) {
console.log('fetch');
document.getElementById("bath").innerHTML= '';
  var db = datastore;
  var transaction = db.transaction(['todo'], 'readwrite');
  var objStore = transaction.objectStore('todo');

  var keyRange = IDBKeyRange.lowerBound(0);
  var cursorRequest = objStore.openCursor(keyRange);

  var todos = [];
  var output = [];

  transaction.oncomplete = function(e) {
	for(var i = 0; i < todos.length; i++) {		
			var t=todos[i].email;
			if(t.indexOf(text) > -1){
				output.push(todos[i]);
			}
		
	}
	back(output);
 }
  cursorRequest.onsuccess = function(e) {
    var result = e.target.result;

    if (!!result == false) {
      return;
    }

    todos.push(result.value);
	
    result.continue();
	//
	
  };

  cursorRequest.onerror = tDB.onerror;
 // var output = ['dgf','grg'];

	
  
};
////////

	tDB.fetchTodos = function(callback) {
  var db = datastore;
  var transaction = db.transaction(['todo'], 'readwrite');
  var objStore = transaction.objectStore('todo');

  var keyRange = IDBKeyRange.lowerBound(0);
  var cursorRequest = objStore.openCursor(keyRange);

  var todos = [];

  transaction.oncomplete = function(e) {
    // Execute the callback function.
    callback(todos);
  };

  cursorRequest.onsuccess = function(e) {
    var result = e.target.result;

    if (!!result == false) {
      return;
    }

    todos.push(result.value);

    result.continue();
  };

  cursorRequest.onerror = tDB.onerror;
};
  
  /**
 * Create a new todo item.
 */
	tDB.createTodo = function(text, callback) {
  // Get a reference to the db.
  var db = datastore;

  // Initiate a new transaction.
  var transaction = db.transaction(['todo'], 'readwrite');

  // Get the datastore.
  var objStore = transaction.objectStore('todo');

  // Create a timestamp for the todo item.
 ///////////////// var timestamp = new Date().getTime();

  // Create an object for the todo item.
  var todo = {
    'email': text,
    'name': 'unnamed',
	//'timestamp':timestamp
  };

  // Create the datastore request.
  var request = objStore.put(todo);
  

  // Handle a successful datastore put.
  request.onsuccess = function(e) {
    // Execute the callback function.
    callback(todo);
  };

  // Handle errors.
  request.onerror = tDB.onerror;
};

//////// create from csv
tDB.createFromCSV = function(data,x,y, callback) {
  // Get a reference to the db.
  var db = datastore;

  // Initiate a new transaction.
  var transaction = db.transaction(['todo'], 'readwrite');

  // Get the datastore.
  var objStore = transaction.objectStore('todo');

  // Create a timestamp for the todo item.
 ///////////////// var timestamp = new Date().getTime();

  // Create an object for the todo item.
  for(var a = 1; a < data.length; a++) {	
	var d=String(data[a]);
	var res = d.split(',');
	//set[a-1]=res[x]+"---"+res[y];
	
	var todo = {
    'email': res[y],
    'name': res[x],
	//'timestamp':timestamp
	};

	// Create the datastore request.
	var request = objStore.put(todo);
  }
  
  
  var todo = {
    'email': text,
    'name': 'unnamed',
	//'timestamp':timestamp
  };

  // Create the datastore request.
  var request = objStore.put(todo);
  

  // Handle a successful datastore put.
  request.onsuccess = function(e) {
    // Execute the callback function.
    callback(todo);
  };

  // Handle errors.
  request.onerror = tDB.onerror;
};
/////////

	tDB.deleteTodo = function(id, callback) {
  var db = datastore;
  var transaction = db.transaction(['todo'], 'readwrite');
  var objStore = transaction.objectStore('todo');

  var request = objStore.delete(id);

  request.onsuccess = function(e) {
    callback();
  }

  request.onerror = function(e) {
    console.log(e);
  }
};
  
  return tDB;
}());

$("body").click
(
  function(e)
  {
    if(e.target.className !== "KeyNavList")
    {
      $(".KeyNavList").hide();
    }
  }
);