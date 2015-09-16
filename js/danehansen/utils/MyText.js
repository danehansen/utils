//////////////////////////////////////////////////
// author: Dane Hansen //////////////////////////
// www.danehansen.com //////////////////////////
// version: 1.0.0 /////////////////////////////
//////////////////////////////////////////////

var MyText = {};

(function(){
	"use strict";

	MyText.addCommas = function(num)
	{
		var str = String(Math.abs(Math.round(num)));
		return str.split( /(? = (?:\d{3}) + (?:\.|$))/g ).join( "," );
	}

	MyText.formatCard = function(str, secure)
	{
		str.replace(/\D/g, "");
		if(secure)
		{
			if(typeof secure != "string")
				secure = "*";
			str = str.slice(0, str.length - 4).replace(/\d/g, secure) + str.slice(str.length - 4, str.length);
		}
		if(str.length == 15)
		{
			return [str.slice(0, 4), str.slice(4, 10), str.slice(10, 15)].join(" ");
		}
		else
		{
			if(str.length == 16)
				return [str.slice(0, 4), str.slice(4, 8), str.slice(8, 12), str.slice(12, 16)].join(" ");
			else
				return str;
		}
	}

	MyText.formatExpiration = function(mmyy)
	{
		var obj = MyText.validateExpiration(mmyy);
		return obj.month + "/" + obj.year % 100;
	}

	MyText.formatPhone = function(str, deliminator)
	{
		str.replace(/\D/g, "");
		var length = str.length;
		if(length == 11 || length == 10)
		{
			var countryCode = str.slice(length - 11, length - 10);
			var areaCode = str.slice(length - 10, length - 7);
			var prefix = str.slice(length - 7, length - 4);
			var line = str.slice(length - 4, length);
			if(deliminator)
			{
				var array = [areaCode, prefix, line];
				if(countryCode)
					array.unshift(countryCode);
				return array.join(deliminator);
			}
			else
			{
				var formatted = "(" + areaCode + ") " + prefix + "-" + line;
				if(countryCode)
					formatted = countryCode + " " + formatted;
				return formatted;
			}
		}
		else
		{
			return str;
		}
	}

	MyText.formatTime = function(seconds, useHours)
	{
		if(!seconds)
			seconds = 0;
		var hours = Math.floor(seconds / 3600);
		var minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds);
		if(useHours)
			return MyText.leadingZeros(hours, 2) + ": " + MyText.leadingZeros(minutes % 60, 2) + ": " + MyText.leadingZeros(seconds % 60, 2);
		else
			return MyText.leadingZeros(minutes, 2) + ": " + MyText.leadingZeros(seconds % 60, 2);
	}

	MyText.formatZip = function(str)
	{
		str.replace(/\D/g, "");
		if(str.length == 9)
			return str.slice(0, 5) + "-" + str.slice(5, 9);
		else
			return str;
	}

	MyText.leadingZeros = function(num, length)
	{
		return (num / Math.pow(10, length - 1)).toFixed(length - 1).split(".").join("");
	}

	MyText.logObject = function(obj, name)
	{
		if(name)
			console.log(name);
		console.log("{");
		for(var i in obj)
		{
			console.log("	" + i + ": " + obj[i] + ",");
		}
		console.log("};");
		console.log("");
	}

	MyText.toDollars = function(amount, cents)
	{
		if(typeof cents != "boolean")
			cents = true;
		if(cents)
			return (amount < 0 ? "-" : "") + "$" + (MyText.addCommas(Math.abs(Math.floor(amount))) + "." + ((amount % 1).toFixed(2)).split(".")[1]);
		else
			return (amount < 0 ? "-" : "") + "$" + (MyText.addCommas(Math.abs(Math.round(amount))));
	}

	MyText.toTitleCase = function(str)
	{
	  return str.toLowerCase().replace(/\b[a-z]/g, function(letter) {return letter.toUpperCase();});
	}

	MyText.toUnicode = function(str)
	{
		var unicode = "";
		for(var i = 0, iLen = str.length; i < iLen; i ++)
		{
			unicode += ("&#" + str.charCodeAt(i) + ";")
		}
		return unicode;
	}

	MyText.validateCard = function(str)
	{
		if(!str)
			return false;
		str.replace(/\D/g, "");
		var l = str.length;
		if(l == 15)
		{
			if(/^3[47]/.test(str))
			{
				if(MyMath.luhn(parseInt(str)))
					return "American Express";
			}
		}
		else if((l == 16 || l == 13) & /^4/.test(str))
		{
			if(MyMath.luhn(parseInt(str)))
				return "VISA";
		}
		else if(l == 16 && /^5[1-5]/.test(str))
		{
			if(MyMath.luhn(parseInt(str)))
				return "MasterCard";
		}
		else if(l == 16 && /^6((011)|(22(1(2[6-9]|[3-9][0-9])|[2-8][0-9]{2}|9([01][0-9]|2[0-5])))|(4[4-9])|(5))/.test(str))
		{
			if(MyMath.luhn(parseInt(str)))
				return "Discover";
		}
		return false;
	}

	MyText.validateExpiration = function(mmyy)
	{
		mmyy = mmyy.replace(/\D/g, "");
		if(mmyy.length < 3)
			return false;
		var divider = mmyy.length % 2 ? 1 : 2;
		var mm = parseInt(mmyy.substr(0, divider));
		if(mm > 12)
			return false;
		var yy = parseInt(mmyy.substr(divider));
		var now = new Date(Date.now());
		var year = now.getFullYear();
		var mod = Math.floor(year / 100) * 100;
		if(yy < mod)
			yy = mod + yy;
		if(yy > year || (yy == year && mm >= (now.getMonth() + 1)))
			return {month: mm, year: yy};
		else
			return false;
	}

	MyText.validateEmail = function(email)
	{
		if(!email)
			return false;
		return /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/.test(email);
	}

	if(typeof module != "undefined")
			module.exports = MyText;
})();
