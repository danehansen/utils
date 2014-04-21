"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

//requires greensock/TweenLite.js
//requires greensock/TimelneLite.js
//requires greensock/easing/EasePack.js

Preloader._START_ANGLE=-Math.PI*0.5;
function Preloader(element, color, hole)
{
	hole=typeof hole=="number"?hole:0;
	this._amount=0;
	this._isPlaying=false;
	this._callback;
	this._render=new MyCanvas(element);
	this._render.context.strokeStyle=color;
	this._size=Math.min(this._render.width(), this._render.height());
	this._square={x:(this._render.width()-this._size)/2, y:(this._render.height()-this._size)/2};
	this._center={x:this._render.width()/2, y:this._render.height()/2};
	this._render.context.lineWidth=this._size/2*(1-hole);
	this._radius=this._size/2-this._render.context.lineWidth/2;
	this._timeline=new TimelineLite({paused:true, onComplete:this._revolve, onCompleteScope:this})
	this._timeline.append(TweenLite.fromTo(this, 1, {amount:2}, {amount:3, ease:Cubic.easeInOut}));
	this._timeline.append(TweenLite.fromTo(this, 1, {amount:1}, {amount:2, ease:Cubic.easeInOut}));
	this.amount(2);
	this.amount(0);
	this._revolve();
}

Preloader.prototype.amount=function(num)
{
	if(num)
	{
		if(num!=this._amount)
		{
			if(this._amount%2!=0)
				this._render.context.clearRect(this._square.x, this._square.y, this._size, this._size);
			this._amount=num;
			var modulo=num%2;
			if(modulo!=0)
			{
				this._render.context.beginPath();
				this._render.context.arc(this._center.x, this._center.y, this._radius, Preloader._START_ANGLE, Preloader._START_ANGLE+Math.PI*2*modulo, modulo>1);
				this._render.context.stroke();
			}
		}
	}
	else
	{
		return this._amount;
	}
}

Preloader.prototype.play=function()
{
	this._isPlaying=true;
	if(!this._timeline.isActive())
	{
		this._render.canvas.style.display="block";
		this._timeline.play(0);
	}
}

Preloader.prototype.stop=function(callback)
{
	this._isPlaying=false;
	if(callback)
		this._callback=callback;
}

Preloader.prototype._revolve=function()
{
	if(this._isPlaying)
	{
		this._timeline.play(0);
	}
	else
	{
		this._render.canvas.style.display="none";
		if(this._callback)
		{
			this._callback();
			this._callback=null;
		}
	}
}