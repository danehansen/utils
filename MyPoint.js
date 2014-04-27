"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

function MyPoint(x, y)
{
	this.x=x||0; 
	this.y=y||0; 
}

MyPoint.prototype.add=function(point)
{
	this.x+=point.x;
	this.y+=point.y;
}

MyPoint.prototype.angle=function()
{
	return Math.atan2(this.y, this.x);
	return Math.atan2(this.y, this.x);
}

MyPoint.prototype.clone=function()
{
	return new MyPoint(this.x, this.y);
}

MyPoint.prototype.copyFrom=function(point)
{
	this.x=point.x;
	this.y=point.y;
}

MyPoint.distance=function(point1, point2)
{
	return Math.sqrt(Math.pow(point1.x-point2.x,2)+Math.pow(point1.y-point2.y,2));
}

MyPoint.prototype.equals=function(point)
{
	return this.x==point.x && this.y==point.y;
}

MyPoint.interpolate=function(point1, point2, amount)
{
	return new MyPoint(point1.x+(point2.x-point1.x)*amount, point1.y+(point2.y-point1.y)*amount);
}

MyPoint.prototype.length=function()
{
	return MyPoint.distance(this, new MyPoint());
}

MyPoint.prototype.normalize=function(thickness)
{
	var ratio=thickness/this.length();
	this.x*=ratio;
	this.y*=ratio;
}

MyPoint.prototype.offset=function(x, y)
{
	this.x+=x;
	this.y+=y;
}

MyPoint.polar=function(len, angle)
{
	return new MyPoint(Math.cos(angle)*len, Math.sin(angle)*len);
}

MyPoint.relativePosition=function(evt, relativeTo)
{
	relativeTo=relativeTo?relativeTo:evt.currentTarget;
	return new MyPoint(evt.clientX-relativeTo.getBoundingClientRect().left, evt.clientY-relativeTo.getBoundingClientRect().top);
}

MyPoint.prototype.setTo=function(x, y)
{
	this.x=x;
	this.y=y;
}

MyPoint.prototype.subtract=function(point)
{
	this.x-=point.x;
	this.y-=point.y;
}

MyPoint.prototype.toString=function()
{
	return "(x="+this.x+", y="+this.y+")";
}