"use strict";

//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
//version:1.0.0////////////////////////////////
//////////////////////////////////////////////

var AJAX=
{
	request:function(url, callback)
	{
		var xmlhttp=new XMLHttpRequest();
		var listener=AJAX.received.bind(callback);
		callback.listener=listener;
		xmlhttp.addEventListener("load", listener);
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	},
	received:function(evt)
	{
		var targ=evt.currentTarget;
		targ.removeEventListener("load", this.listener);
		this.listener=null;
		this(JSON.parse(targ.responseText));
	}
}