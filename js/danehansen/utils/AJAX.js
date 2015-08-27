//////////////////////////////////////////////////
// author: Dane Hansen //////////////////////////
// www.danehansen.com //////////////////////////
// version: 1.0.0 /////////////////////////////
//////////////////////////////////////////////

var AJAX = {
	SUCCESS_EVENT: {target: {readyState: 4, status: 200}}
};

(function(){
	"use strict";

	var _QUEUE = [];

	AJAX.get = function(url, listener, data)
	{
		return _request("GET", url, listener, data);
	}

	AJAX.post = function(url, listener, data, headers)
	{
		_request("POST", url, listener, data, headers);
	}

	AJAX.put = function(url, listener, data, headers)
	{
		_request("PUT", url, listener, data, headers);
	}

	AJAX.delete = function(url, listener)
	{
		_request("DELETE", url, listener);
	}

	function _request(method, url, listener, data, headers)
	{
		var xmlhttp = new XMLHttpRequest();
		if(listener)
		{
			xmlhttp.addEventListener("abort", _onAbort);
			xmlhttp.addEventListener("readystatechange", _onReadyStateChange);
		}
		if(method == "GET")
			url = AJAX.querify(data, url);
		xmlhttp.open(method, url, true);
		if(/^\//.test(url))
		{
			if(!headers)
				headers = {};
			headers["Content-Type"] = "application/json";
			headers["Accept"] = "application/json";
			headers["Access-Control-Allow-Origin"] = "*";
			if(State.user() && State.user().token)
				headers["Authorization"] = "Token " + State.user().token;
		}
		for(var header in headers)
		{
			xmlhttp.setRequestHeader(header, headers[header]);
		}
		xmlhttp.send(data ? JSON.stringify(data) : null);
		_QUEUE.push({request: xmlhttp, listener: listener});
		return xmlhttp;
	}

	AJAX.querify = function(obj, url)
	{
		url = url || "";
		for(var i in obj)
		{
			var value = obj[i];
			url += ((/\?/g.test(url) ? "&" : "?") + i + "=" + escape((typeof value == "object" ? JSON.stringify(value) : value)));
		}
		return url;
	}

	function _onReadyStateChange(evt)
	{
		var target = evt.target;
		if(target.readyState == 4)
		{
			var queue = _findInQueue(evt);
			var status = target.status;
			if(status != 0)
			{
				_removeFromQueue(queue);
				var listener = queue.listener;
				var success = (status >= 200 && status < 300) || status == 304;
				var responseText = target.responseText;
				if(listener)
					listener(success, responseText, errors);
			}
		}
	}

	function _onAbort(evt)
	{
		var queue = _findInQueue(evt);
		_removeFromQueue(queue);
	}

	function _findInQueue(evt)
	{
		var target = evt.target;
		for(var i = 0, iLen = _QUEUE.length; i < iLen; i++)
		{
			var queue = _QUEUE[i];
			if(queue.request == target)
			{
				var listener = queue.listener;
				if(listener)
				{
					target.removeEventListener("readystatechange", listener);
					target.removeEventListener("abort", listener);
				}
				return queue;
			}
		}
	}

	function _removeFromQueue(queue)
	{
		_QUEUE.splice(_QUEUE.indexOf(queue), 1);
		var request = queue.request;
		if(queue.listener)
		{
			request.removeEventListener("abort", _onAbort);
			request.removeEventListener("readystatechange", _onReadyStateChange);
		}
	}

	if(typeof module != "undefined")
		module.exports = AJAX;
})();