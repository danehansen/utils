"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

	//requires danehansen/MyUtils.js

function ImgLoader(imgs, callback, scope)
{
	this._imgs=imgs;
	this._imgsLoaded=0;
	this._callback=callback;
	this._scope=scope;
	this._loadImgs();
}

ImgLoader.prototype._loadImgs=function()
{
	for(var i=0; i<this._imgs.length; i++)
	{
		this._imgs[i].image = new Image();
		this._imgs[i].image.src = this._imgs[i].url;
		
		$(this._imgs[i].image).load(MyUtils.bind(this._imgLoaded,this));
	}
}

ImgLoader.prototype._imgLoaded=function(evt)
{
	this._imgsLoaded++;
	if(this._imgsLoaded==this._imgs.length)
		this._scope[this._callback]();
}

ImgLoader.prototype.get=function(id)
{
	var img;
	for(var i=0; i<this._imgs.length; i++)
	{
		if(this._imgs[i].id==id)
			img=this._imgs[i].image
	}
	return img;
}