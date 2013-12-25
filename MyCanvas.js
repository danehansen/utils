"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

function MyCanvas(widthOrCanvas, height)
{
	if(typeof widthOrCanvas=="number")
	{
		this.canvas=document.createElement("canvas");
		this.canvas.width=widthOrCanvas;
		this.canvas.height=height;
	}
	else
	{
		this.canvas=widthOrCanvas;
		this.canvas.width=this.canvas.offsetWidth;
		this.canvas.height=this.canvas.offsetHeight;
	}
	this.context=this.canvas.getContext("2d");
}

MyCanvas.prototype.width=function(num)
{
	if(typeof num=="number")
		this.canvas.width=num;
	else
		return this.canvas.width;
}

MyCanvas.prototype.height=function(num)
{
	if(typeof num=="number")
		this.canvas.height=num;
	else
		return this.canvas.height;
}