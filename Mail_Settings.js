var username="";
var userID="";
var password="";
var imaphost="";
var imapport="";
var imapsecurity="";
var smtphost="";
var smtpport="";
var smtpsecurity="";

var result={};
var selectFolder;
var dbSelectFolder;
var Unhosted_version=0.1;
var dbVersion=10;
var pid=0;

var refresh_interval=getRefresh_interval();
var autoSync=getAutoSync();
var msgPP=getMsgPP();
var maxMsg=getMaxMsg();

function loadSettings(){
	refresh_interval=localStorage.getItem("refresh_interval");
	autoSync=localStorage.getItem("autoSync");
	msgPP=localStorage.getItem("msgPP");	;
	maxMsg=localStorage.getItem("maxMsg");
	console.log("Settings loaded");
}

function getRefresh_interval(){
	var val=localStorage.getItem("refresh_interval");
	return parseInt(val) ? parseInt(val) :100000;
}

function getAutoSync(){
	var val=localStorage.getItem("refresh_interval");
	return val=="true" ? true :false;
}

function getMsgPP(){
	var val=localStorage.getItem("msgPP");
	return parseInt(val) ? parseInt(val) :10;
}

function getMaxMsg(){
	var val=localStorage.getItem("maxMsg");
	return parseInt(val) ? parseInt(val) :30;
}