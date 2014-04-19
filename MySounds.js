"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

	//requires danehansen/MyUtils.js
	//requires greensock/TweenLite.js
	//requires greensock/easing/EasePack.js

MySounds._ext=null;
MySounds._volume=1;
MySounds._currentLoop=null;
MySounds._TRANS=0.5;
MySounds._PRELOADED_SOUNDS={};

function MySounds()
{
	//
}

MySounds.preload=function(obj)
{
	if(typeof obj=="object" && obj.length!=undefined)
	{
		var list=obj;
	}
	else if(typeof obj=="object" && obj.length==undefined)
	{
		list=[];
		for(var i in obj)
		{
			if(obj[i].path)
				list.push(obj[i].path);
			else
				list.push(obj[i]);
		}
	}
	else if(typeof obj=="string")
	{
		list=[obj];
	}
	for(var i=0, iLen=list.length; i<iLen; i++)
	{
		var path=MySounds._formatFilename(list[i]);
		if(!MySounds._PRELOADED_SOUNDS[path])
		{
			var audio=new Audio(path);
			audio.preload="auto";
			MySounds._PRELOADED_SOUNDS[path]=[audio];
		}
	}
}

MySounds.play=function(pathOrObject)
{
	if(pathOrObject.path)
	{
		var path=MySounds._formatFilename(pathOrObject.path);
		var volume=MySounds._volume*pathOrObject.volume;
	}
	else
	{
		path=pathOrObject;
		volume=MySounds._volume;
	}
	if(!MySounds._PRELOADED_SOUNDS[path])
	{
		MySounds._PRELOADED_SOUNDS[path]=[];	
	}
	for(var i=0, iLen=MySounds._PRELOADED_SOUNDS[path].length; i<iLen; i++)
	{
		var audio=MySounds._PRELOADED_SOUNDS[path][i];
		if(audio.paused)
		{
			audio.volume=volume;
			audio.play(0);
			return audio;
		}
	}
	audio=new Audio(path);
	MySounds._PRELOADED_SOUNDS[path].push(audio);
	audio.volume=volume;
	audio.play();
	return audio;
}

MySounds.playLoop=function(path)
{
	path=MySounds._formatFilename(path);
	if(MySounds._currentLoop)
	{
		if(path==MySounds._currentLoop.path)
		{
			return;
		}
		TweenLite.to(MySounds._currentLoop, MySounds._TRANS, {volume:0, ease:Linear.easeNone, onComplete:MySounds._currentLoop.pause, onCompleteScope:MySounds._currentLoop});
	}
	if(path)
	{
		if(!MySounds._PRELOADED_SOUNDS[path])
		{
			MySounds._currentLoop=new Audio(path);
			MySounds._PRELOADED_SOUNDS[path]=[MySounds._currentLoop];
			MySounds._currentLoop.path=path;
			MySounds._currentLoop.addEventListener("ended",MyUtils.bind(MySounds._onEnded, this));
			// MySounds._currentLoop.loop=true;
		}
		else
		{
			MySounds._currentLoop=MySounds._PRELOADED_SOUNDS[path][0];
		}
		if(MySounds._volume>0)
		{
			MySounds._currentLoop.play();
			TweenLite.fromTo(MySounds._currentLoop, MySounds._TRANS, {volume:0}, {volume:MySounds._volume, ease:Linear.easeNone});
		}
	}
	else
	{
		MySounds._currentLoop=null;
	}
}

MySounds._onEnded=function(evt)
{
	console.log("_onEnded", evt);
	MySounds._currentLoop.play();
}
	
	MySounds._formatFilename=function(str)
	{
		if(!str)
			return "";
		if(/.wav/.test(str))
			return str;
		if(!MySounds._ext)
		{
			var audio=new Audio();
			if(audio.canPlayType("audio/mpeg")!="")
				MySounds._ext=".mp3";
			else if(audio.canPlayType("audio/ogg")!="")
				MySounds._ext=".ogg";
		}
		return str.replace(/.mp3|.ogg/,MySounds._ext)
	}

	MySounds._killLoop=function()
	{
		this.removeEventListener("ended",this.endHandler);
		this.pause();
	}

MySounds.mute=function()
{
	TweenLite.to(MySounds, MySounds._TRANS, {volume:0, ease:Linear.easeNone});
}

MySounds.unMute=function()
{
	TweenLite.to(MySounds, MySounds._TRANS, {volume:1, ease:Linear.easeNone});
}

MySounds.volume=function(num)
{
	if(typeof num=="number")
	{
		if(MySounds._currentLoop)
		{
			if(num==0 && MySounds._volume>0)
				MySounds._currentLoop.pause();
			if(num>0 && MySounds._volume==0)
				MySounds._currentLoop.play();
			MySounds._currentLoop.volume=num;
		}
		MySounds._volume=num;
	}
	else
	{
		return MySounds._volume;
	}
}