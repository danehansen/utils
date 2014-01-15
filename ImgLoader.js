"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

//imports
	(function() {
		var externalJS=
		[
			"js/underscore-min.js"
		];
		for(var i=0; i<externalJS.length; i++)
		{
			var s = document.createElement('script');
			s.type = 'text/javascript';
			s.async = true;
			s.src = externalJS[i];
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(s);
		}
	})();

function ImgLoader(imgs, callback, scope)
{
	this._imgs=imgs;
	this._imgsLoaded=0;
	this._callback=callback;
	this._scope=scope;
	this._loadImgs();
};

ImgLoader.prototype._loadImgs=function()
{
	for(var i=0; i<this._imgs.length; i++)
	{
		this._imgs[i].image = new Image();
		this._imgs[i].image.src = this._imgs[i].url;
		
		$(this._imgs[i].image).load(bind(this._imgLoaded,this));
	}
};

ImgLoader.prototype._imgLoaded=function(evt)
{
	this._imgsLoaded++;
	if(this._imgsLoaded==this._imgs.length)
		this._scope[this._callback]();
};

ImgLoader.prototype.get=function(id)
{
	var img;
	for(var i=0; i<this._imgs.length; i++)
	{
		if(this._imgs[i].id==id)
			img=this._imgs[i].image
	}
	return img;
};

function bind(func, context)
{
	var slice=Array.prototype.slice;
	var proto=Function.prototype;
	if(func.bind===proto && proto)
		return proto.apply(func, slice.call(arguments, 1));
	var args=slice.call(arguments, 2);
	return function()
	{
		return func.apply(context, args.concat(slice.call(arguments)));
	};
}