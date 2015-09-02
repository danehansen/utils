//////////////////////////////////////////////////
// author: Dane Hansen //////////////////////////
// www.danehansen.com //////////////////////////
// version: 1.0.0 /////////////////////////////
//////////////////////////////////////////////

var Color = {};

(function(){
	"use strict";

	Color.red = function(uint)
	{
		return uint >> 16 & 0xFF;
	}

	Color.green = function(uint)
	{
		return uint >> 8 & 0xFF;
	}

	Color.blue = function(uint)
	{
		return uint & 0xFF;
	}
	
	Color.uintToRGB = function(color)
	{
		return "rgb(" + Color.red(color) + "," + Color.green(color) + "," + Color.blue(color) + ")";
	}

	Color.uintToRGBA = function(color, alpha)
	{
		alpha = typeof alpha !== "undefined" ? alpha : 1;
		return "rgba(" + Color.red(color) + "," + Color.green(color) + "," + Color.blue(color) + "," + alpha + ")";
	}

	Color.rgbToUint = function(r, g, b)
	{
		return r << 16 | g << 8 | b;
	}

	Color.rgbToHex = function(rgb)
	{
		rgb = rgb.split("rgb(").join("").split(" ").join("").split(")").join("").split(",");
		var r = parseInt(rgb[0]);
		var g = parseInt(rgb[1]);
		var b = parseInt(rgb[2]);
		var uint = Color.rgbToUint(r, g, b);
		var str = "#" + uint.toString(16);
		return str;
	}
})();
