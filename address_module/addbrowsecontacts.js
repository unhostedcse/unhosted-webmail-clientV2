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
			todoDB.fetchMy(searchEntry,function(result){
				$( "#horde-content table" ).remove();
				$( "#horde-content" ).append('<table cellspacing="0" width="100%" class="linedRow"><thead><tr><th class="turba-browse-icon item" width="1%" style="cursor:pointer" nowrap="nowrap"><label for="checkAll" class="hidden">Check All/None</label><input type="checkbox" id="checkAll" name="checkAll" title="Check All/None (Accesskey A)" accesskey="A"></th><th class="turba-browse-icon item" width="1%"><span class="iconImg editImg" title="Edit"></span></th><th class="turba-browse-icon item" width="1%"><span class="iconImg vcardImg" title="Download vCard"></span></th><th class="turba-browse-icon item" width="1%"><span class="iconImg groupImg" title="List"></span></th><th class="item leftAlign" width="90%" nowrap="nowrap">Name</th></tr></thead><tbody id="QuickFinderContacts"></tbody>');		
				for(var i = 0; i < result.length; i++) {	
					//var st=output[i].name.concat(' <').concat(' ' +output[i].email+ ' ').concat('>');
					$( "#QuickFinderContacts" ).append('<tr class=""><td class="turba-browse-icon"><input type="checkbox" class="checkbox" id="_kiJ_tQo52vg599rPhIl6g2:tV8lyqUyZ2BOTIC0B24oZQ7"></td><td class="turba-browse-icon"><a><span class="iconImg editImg"></span></a></td><td class="turba-browse-icon"><a><span class="iconImg vcardImg"></span></a></td><td class="turba-browse-icon">&nbsp;</td><td><a>'+result[i].name+'</a></td></tr>');
		
				}
				//alert(result[0].email)
			});
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

