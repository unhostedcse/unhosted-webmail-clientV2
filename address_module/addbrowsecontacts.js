/*window.onload = function() {
	
	var form_addcontact = document.getElementById('turba_form_addcontact');
	var object_firstname_ = document.getElementById('object_firstname_');
	var object_lastname_ = document.getElementById('object_lastname_');


form_addcontact.onsubmit = function() {
  // return;
  // Get the todo text.
  var fname = object_firstname_.value;
  var usermail = object_lastname_.value;
 
	
  // Check to make sure the text is not blank (or just spaces).
  if (fname.replace(/ /g,'') != '') {
	alert(fname);
  }
  if (usermail.replace(/ /g,'') != '') {
	alert(usermail);
  }
	todoDB.createfromuiTodo(usermail,fname,function(){
		console.log('enrty created');
		}
	);
  // Reset the input field.
  object_firstname_.value = '';
  object_lastname_.value = '';

  // Don't send the form.
  return false;
};

	var searachcontactform = document.getElementById('searach-contact-form');
	
	searachcontactform.onsubmit = function() {
  // return;
  // Get the todo text.
  var searchEntry = valsearchcontacts.value; 
	
  // Check to make sure the text is not blank (or just spaces).
  if (searchEntry.replace(/ /g,'') != '') {
	alert(searchEntry);
  }
  // Reset the input field.
  searchEntry.value = '';

  // Don't send the form.
  return false;
};





};

*/
todoDB.open(function(){
  console.log('DB opened');
  }
);



$( document ).ready(function() {	
    alert( "ready!" );
	
	$( "#searach-contact-form" ).submit(function( event ) {
		// event.preventDefault();
		alert('started');
		var valsearchcontacts = document.getElementById('val-search-contacts');
		var searchEntry = valsearchcontacts.value; 
	
		// Check to make sure the text is not blank (or just spaces).
		if (searchEntry.replace(/ /g,'') != '') {
			alert(searchEntry);
		}
		// Reset the input field.
		searchEntry.value = '';
		event.preventDefault();
	});
	$( "#turba_form_addcontact" ).submit(function( event ) {
		var object_firstname_ = document.getElementById('object_firstname_');
		var object_lastname_ = document.getElementById('object_lastname_');
		var fname = object_firstname_.value;
		var usermail = object_lastname_.value;
 
	
		// Check to make sure the text is not blank (or just spaces).
		if (fname.replace(/ /g,'') != '') {
			alert(fname);
		}
		if (usermail.replace(/ /g,'') != '') {
			alert(usermail);
		}
		todoDB.createfromuiTodo(usermail,fname,function(){
			console.log('enrty created');
		});
		// Reset the input field.
		object_firstname_.value = '';
		object_lastname_.value = '';
		event.preventDefault();
	});
});

