$(document).ready(function() {
	
	$("#subject").click(function(){
		$('div.hordeACBox.impACBox.impACBoxFocus').removeClass("impACBoxFocus");
		
	});
	$("#sendto").click(function(){
		$('div.hordeACBox.impACBox.impACBoxFocus').removeClass("impACBoxFocus");
		$('#sendto div').addClass("impACBoxFocus");
		$('#sendto div input').focus();
		
	});
	$("#sendcc").click(function(){
		$('div.hordeACBox.impACBox.impACBoxFocus').removeClass("impACBoxFocus");
		$('#sendcc div').addClass("impACBoxFocus");
		$('#sendcc div input').focus();
		
	});
	$("#sendbcc").click(function(){
		$('div.hordeACBox.impACBox.impACBoxFocus').removeClass("impACBoxFocus");
		$('#sendbcc div').addClass("impACBoxFocus");
		$('#sendbcc div input').focus();
		
	});
	$('body').on("click",'.KeyNavList ul li',function() {
		var content=this.innerHTML;
		var array=content.split('&lt;'); // cannot satistay the way split		
		$('<li class="hordeACListItem" title=" '  + content +' "> ' + array[0] + ' <img class="hordeACItemRemove impACItemRemove" src="./graphics/delete-small.png"></li>').insertBefore("#sendto ul li:last-child");		
		var x = document.getElementById("sendto");
		var y = x.getElementsByTagName("input")[0];
		y.value='';

		var a=array[0]+' <'+array[1]+'>';
		a=a.replace("&gt;","");
		
		//var ss=$("#to").val() ? $("#to").val()+","+a : a;
		var old=$("#to").val();		
		if(old=="")
			var ss=a;
		else
			var ss=old+","+a;

		console.log(ss);
		$("#to").val(ss);

	});
	$('body').on("click",'#sendto ul li img',function() {
		$(this).parent().remove();
	});
	
});