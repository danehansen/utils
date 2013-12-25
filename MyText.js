"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

var MyText=
{
	addCommas:function(num) 
	{
		var str = String(Math.abs(num));
		var parts = new Array();
			var start;
			var end = str.length;
			while(end > 0) 
			{
				start = Math.max(end - 3, 0);
					parts.unshift(str.slice(start, end));
					end = start;
			}
		str = parts.join(",");
		return (num<0?"-":"")+str;
	},

	addDecimalPlaces:function(num,decimalPlaces)
	{
		num*=Math.pow(10,decimalPlaces);
		num=Math.round(num);
		var string="";
		var abs=String(Math.abs(num));
		if(num<0)
			string+="-";
		while(abs.length<decimalPlaces+1)
		{
			abs="0"+abs;
		}
		string+=abs.slice(0,abs.length-decimalPlaces);
		string+=".";
		string+=abs.slice(abs.length-decimalPlaces);			
		return string;
	},

	toDollars:function(amount) 
	{
		amount=MyMath.round(amount,0.01);
		return (Math.round(amount*Math.pow(10,2))<0?"-":"")+"$"+MyText.addCommas(Math.floor(Math.abs(amount)))+"."+MyText.addDecimalPlaces(amount%1,2).split(".")[1];
	}
};