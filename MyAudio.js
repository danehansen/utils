"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

	//requires danehansen/MyUtils.js
	//requires greensock/TweenLite.js
	//requires greensock/easing/EasePack.js

MyAudio._TRANS=0.5;
MyAudio._volume=1;
MyAudio._currentLoop=null;

function MyAudio()
{
	//
}

MyAudio.play=function(path, volume)
{
	if(typeof volume!="number")
		volume=1;
	volume*=MyAudio._volume;
	path=MyAudio._formatFilename(path);
	return MySound.getInstance(path).play(volume);
}

MyAudio.playLoop=function(path, volume)
{
	if(typeof volume!="number")
		volume=1;
	volume*=MyAudio._volume;
	path=MyAudio._formatFilename(path);
	if(MyAudio._currentLoop)
	{
		if(path==MyAudio._currentLoop.path)
			return;
		MyAudio._currentLoop.stop();
	}
	if(path)
	{
		MyAudio._currentLoop=MyLoop.getInstance(path);
		MyAudio._currentLoop.play(volume);
	}
	else
	{
		MyAudio._currentLoop=null;
	}
}

MyAudio.mute=function()
{
	TweenLite.to(MyAudio, MyAudio._TRANS, {volume:0, ease:Linear.easeNone});
}

MyAudio.unMute=function()
{
	TweenLite.to(MyAudio, MyAudio._TRANS, {volume:1, ease:Linear.easeNone});
}

MyAudio.volume=function(num)
{
	if(typeof num=="number")
	{
		if(MyAudio._currentLoop)
		{
			if(num==0 && MyAudio._volume>0)
				MyAudio._currentLoop.pause();
			if(num>0 && MyAudio._volume==0)
				MyAudio._currentLoop.play();
			MyAudio._currentLoop.volume(num);
		}
		MyAudio._volume=num;
	}
	else
	{
		return MyAudio._volume;
	}
}

MyAudio._ext=null;
MyAudio._formatFilename=function(str)
{
	if(!str)
		return "";
	if(/.wav/.test(str))
		return str;
	if(!MyAudio._ext)
	{
		var audio=new Audio();
		if(audio.canPlayType("audio/mpeg")!="")
			MyAudio._ext=".mp3";
		else if(audio.canPlayType("audio/ogg")!="")
			MyAudio._ext=".ogg";
	}
	return str.replace(/.mp3|.ogg/,MyAudio._ext)
}

MySound._INSTANCES={};
function MySound(path, volumeOffset)
{
	path=MyAudio._formatFilename(path);
	MySound._INSTANCES[path]=this;
	this._path=path;
	this._volumeOffset=typeof volumeOffset=="number"?volumeOffset:1;
	this._INSTANCES=[new Audio(path)];
	this._INSTANCES[0].preload="auto";
}

MySound.getInstance=function(path)
{
	if(!MySound._INSTANCES[path])
		MySound._INSTANCES[path]=new MyLoop(path);
	return MySound._INSTANCES[path];
}

MySound.prototype.play=function(volume)
{
	if(typeof volume!="number")
		volume=1;
	for(var i=0, iLen=this._INSTANCES.length; i<iLen; i++)
	{
		var audio=this._INSTANCES[i];
		if(audio.paused)
		{
			audio.volume=this._volumeOffset*volume;
			audio.play(0);
			return audio;
		}
	}
	audio=new Audio(this._path);
	audio.volume=this._volumeOffset*volume;
	audio.play();
	this._INSTANCES.push(audio);
	return audio;
}


MyLoop._INSTANCES={};
function MyLoop(path, volumeOffset)
{
	MyUtils.bindAll(this, "_onPlay", "_onEnd", "_stop2");
	path=MyAudio._formatFilename(path);
	MyLoop._INSTANCES[path]=this;
	this.path=path;
	this._volumeOffset=typeof volumeOffset=="number"?volumeOffset:1;
	this._INSTANCE=new Audio(path);
	this._INSTANCE.preload="auto";
	this._duration=null;
	this._playing=false;
	this._timeout;
}

MyLoop.getInstance=function(path)
{
	if(!MyLoop._INSTANCES[path])
		MyLoop._INSTANCES[path]=new MyLoop(path);
	return MyLoop._INSTANCES[path];
}

MyLoop.prototype.play=function(volume)
{
	if(!this._playing)
	{
		if(typeof volume!="number")
			volume=1;
		this._INSTANCE.volume=this._volumeOffset*volume;
		if(!this._duration)
			this._INSTANCE.addEventListener("play", this._onPlay);
		else
			this._timeout=setTimeout(this._onEnd, this._duration);
		this._INSTANCE.play(0);
		TweenLite.from(this._INSTANCE, MyAudio._TRANS, {volume:0, ease:Linear.easeNone});
	}
}

MyLoop.prototype.stop=function()
{
	TweenLite.to(this._INSTANCE, MyAudio._TRANS, {volume:0, ease:Linear.easeNone, onComplete:this._stop2});
}

MyLoop.prototype._stop2=function()
{
	clearTimeout(this._timeout);
	this._timeout=null;
	this._playing=false;
	this._INSTANCE.pause();
}

MyLoop.prototype._onPlay=function()
{
	this._INSTANCE.removeEventListener("play", this._onPlay);
	this._duration=this._INSTANCE.duration;
	this._timeout=setTimeout(this._onEnd, this._duration);
}

MyLoop.prototype._onEnd=function()
{
	this._timeout=setTimeout(this._onEnd, this._duration);
	this._INSTANCE.play(0);
}

MyLoop.prototype.volume=function(num)
{
	if(typeof num=="number")
	{
		if(this._INSTANCE.playing)
		{
			this._INSTANCE.volume=num*this._volumeOffset;
		}
	}
	else
	{
		return this._INSTANCE.volume/this._volumeOffset;
	}
}