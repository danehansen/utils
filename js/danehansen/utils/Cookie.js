//////////////////////////////////////////////////
// author: Dane Hansen //////////////////////////
// www.danehansen.com //////////////////////////
// version: 1.0.0 /////////////////////////////
//////////////////////////////////////////////


var Cookie = {};

(function(){
	"use strict";

	//requires danehansen/utils/Utils.js
	if(typeof module != "undefined")
		Utils = require("./Utils");

	var _DAYS = 30;

	Cookie.clear = function()
	{
		_set({}, -1);
	}

	Cookie.date = function()
	{
		var match = document.cookie.match(/expires=([^;]+)/);
		if(match)
			return new Date(match[1]);
		else
			return null;
	}

	Cookie.get = function()
	{
		var match = document.cookie.match(/data=([^;]+)/);
		if(match)
			return JSON.parse(unescape(match[1]));
		else
			return {};
	}

	Cookie.merge = function(obj, days)
	{
		_set(Utils.merge(obj, Cookie.get()), days);
	}

	function _set(obj, days)
	{
		var now = new Date();
		now.setDate(now.getDate() + (days || _DAYS));
		document.cookie = "expires=" + now.toUTCString() + ";path=/";
		document.cookie = "data=" + escape(JSON.stringify(obj)) + ";path=/";
	}

	if(typeof module != "undefined")
		module.exports = Cookie;
})();