"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
//version:1.0.0////////////////////////////////
//////////////////////////////////////////////

var MyText=
{
	addCommas:function(num) 
	{
		var str=String(Math.abs(Math.round(num)));
		var parts=new Array();
			var start;
			var end=str.length;
			while(end>0) 
			{
				start=Math.max(end-3, 0);
					parts.unshift(str.slice(start, end));
					end=start;
			}
		str=parts.join(",");
		return (num<0?"-":"")+str;
	},
	leadingZeros:function(num, length)
	{
		return (num/Math.pow(10,length-1)).toFixed(length-1).split(".").join("");
	},
	logObject:function(obj, name)
	{
		if(name)
			console.log(name);
		console.log("{");
		for(var i in obj)
		{
			console.log("	"+i+": "+obj[i]+",");
		}
		console.log("};");
		console.log("");
	},
	timeFormat:function(seconds, useHours)
	{
		if(!seconds)
			seconds=0;
		var hours=Math.floor(seconds/3600);
		var minutes=Math.floor(seconds/60);
		seconds=Math.floor(seconds);
		if(useHours)
			return MyText.leadingZeros(hours,2)+":"+MyText.leadingZeros(minutes%60,2)+":"+MyText.leadingZeros(seconds%60,2);
		else		
			return MyText.leadingZeros(minutes,2)+":"+MyText.leadingZeros(seconds%60,2);
	},
	toDollars:function(amount) 
	{
		return (amount<0?"-":"")+"$"+(MyText.addCommas(Math.abs(Math.floor(amount))))+((amount%1).toFixed(2));
	},
	toUnicode:function(str)
	{
		var unicode="";
		for(var i=0, iLen=str.length; i<iLen; i++)
		{
			unicode+=("&#"+str.charCodeAt(i)+";")
		}
		return unicode;
	},
	validateEmail:function(email)
	{
		return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
	}
};