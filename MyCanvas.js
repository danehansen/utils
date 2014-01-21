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

MyCanvas.correctArcs=function()
{
	CanvasRenderingContext2D.prototype.arc = function(x, y, radius, startAngle, endAngle, anticlockwise)
	{
		var signedLength;
		var tau = 2 * Math.PI;
		if (!anticlockwise && (endAngle - startAngle) >= tau)
		{
			signedLength = tau;
		}
		else if(anticlockwise && (startAngle - endAngle) >= tau)
		{
			signedLength = -tau;
		}
		else
		{
			var delta = endAngle - startAngle;
			signedLength = delta - tau * Math.floor(delta / tau);
			if (Math.abs(delta) > 1e-12 && signedLength < 1e-12)
				signedLength = tau;
			if (anticlockwise && signedLength > 0)
				signedLength = signedLength - tau;
		}
		var minCurves = Math.ceil(Math.abs(signedLength)/(Math.PI/2));
		var numCurves = Math.ceil(Math.max(minCurves, Math.sqrt(radius)));
		var cpRadius = radius * (2 - Math.cos(signedLength / (numCurves * 2)));
		var step = signedLength / numCurves;
		this.lineTo(x + radius * Math.cos(startAngle), y + radius * Math.sin(startAngle));
		for (var i = 0, a = startAngle + step, a2 = startAngle + step/2; i < numCurves; ++i, a += step, a2 += step)
			this.quadraticCurveTo(x + cpRadius * Math.cos(a2), y + cpRadius * Math.sin(a2), x + radius * Math.cos(a), y + radius * Math.sin(a));
	}
}