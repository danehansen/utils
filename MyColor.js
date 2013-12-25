"use strict";

//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

var MyColor=
{
	red:function(color)
	{
		return color>>16&0xFF;
	},

	green:function(color)
	{
		return color>>8&0xFF;
	},

	blue:function(color)
	{
		return color&0xFF;
	},
	
	rgba:function(color, alpha)
	{
		alpha = typeof alpha !== 'undefined' ? alpha : 1;
		return "rgba("+MyColor.red(color)+","+MyColor.green(color)+","+MyColor.blue(color)+","+alpha+")";
	},

	rgb:function(r, g, b)
	{
		return r<<16|g<<8|b;
	},

	hex:function(rgb)
	{
		rgb=rgb.split("rgb(").join("").split(" ").join("").split(")").join("");
		var r=parseInt(rgb.split(",")[0]);
		var g=parseInt(rgb.split(",")[1]);
		var b=parseInt(rgb.split(",")[2]);
		var uint=r<<16|g<<8|b;
		var str="#"+uint.toString(16);
		return str;
	}
};