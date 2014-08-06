"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
//version:1.0.0////////////////////////////////
//////////////////////////////////////////////

var Cookie=
{
	_DAYS:30,
	clear:function()
	{
		Cookie._set({},-1);
	},
	date:function()
	{
		var match=document.cookie.match(/expires=([^;]+)/);
		if(match)
			return new Date(match[1]);
		else
			return null;
	},
	get:function()
	{
		var match=document.cookie.match(/data=([^;]+)/);
		if(match)
			return JSON.parse(unescape(match[1]));
		else
			return {};
	},
	merge:function(obj)
	{
		Cookie._set(Utils.merge(obj, Cookie.get()));
	},
	_set:function(obj, days)
	{
		var now=new Date();
		now.setDate(now.getDate()+(days||this._DAYS));
		document.cookie="expires="+now.toUTCString();
		document.cookie="data="+escape(JSON.stringify(obj));
	}
}