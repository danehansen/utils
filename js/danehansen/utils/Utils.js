"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

var Utils=
{
	addClass:function(elements,str)
	{
		if(!Utils._isList)
			elements=[elements];
		for(var i=0, iLen=elements.length; i<iLen; i++)
		{
			var targ=elements[i];
			var className=targ.className;
			if(className.split(" ").indexOf(str)==-1)
				targ.className=className+(className.length==0?"":" ")+str;
		}
	},
	addEventListener:function(elements,evt,handler)
	{
		if(!Utils._isList)
			elements=[elements];
		for(var i=0,iLen=elements.length; i<iLen; i++)
		{
			elements[i].addEventListener(evt,handler);
		}
	},
	addMouseEnter:function(elements,handler)
	{
		if(!Utils._isList)
			elements=[elements];
		for(var i=0, iLen=elements.length; i<iLen; i++)
		{
			var element=elements[i];
			if(!element.danehansenID)
				element.danehansenID=String(Math.random());
			Utils._ON_MOUSE_ENTER[element.danehansenID]={handler:handler, _handler:Utils.bind(Utils._onMouseEnter,element)};
			element.addEventListener("mouseover",Utils._ON_MOUSE_ENTER[element.danehansenID]._handler);
		}
	},
		_onMouseEnter:function(evt)
		{
			var relTarg=evt.relatedTarget || evt.fromElement;
			if(this.contains(relTarg) || relTarg==this)
				evt.preventDefault();
			else
				Utils._ON_MOUSE_ENTER[this.danehansenID].handler(evt);
		},
		_ON_MOUSE_ENTER:{},
	addMouseLeave:function(elements,handler)
	{
		if(!Utils._isList)
			elements=[elements];
		for(var i=0, iLen=elements.length; i<iLen; i++)
		{
			var element=elements[i];
			if(!element.danehansenID)
			element.danehansenID=String(Math.random());
			Utils._ON_MOUSE_LEAVE[element.danehansenID]={handler:handler, _handler:Utils.bind(Utils._onMouseLeave,element)};
			element.addEventListener("mouseout",Utils._ON_MOUSE_LEAVE[element.danehansenID]._handler);
		}
	},
		_onMouseLeave:function(evt)
		{
			var relTarg=evt.relatedTarget || evt.fromElement;
			if(this.contains(relTarg) || relTarg==this)
				evt.preventDefault();
			else
				Utils._ON_MOUSE_LEAVE[this.danehansenID].handler(evt);
		},
		_ON_MOUSE_LEAVE:{},
	addPrefix:function(str)
	{
		if(Utils._addPrefixStorage[str])
			return Utils._addPrefixStorage[str];
		var prefixed=Utils.browser().prefix+str.replace(/\b[a-z]/,  Utils._captitalize);
		Utils._addPrefixStorage[str]=prefixed;
		return prefixed;
	},
		_addPrefixStorage:{},
		_captitalize:function(str)
		{
			return str.toUpperCase();
		},
		_ADD_PREFIXES_TO:
		{
			transform:true,
			transformOrigin:true,
			transition:true,
			userSelect:true,
			perspective:true
		},
	autoAlpha:function(elements, num)
	{
		Utils.css(elements,{opacity:num,visibility:num==0?"hidden":"visible"});
	},
	bind:function(funcs, obj)
	{
		var args=Array.prototype.slice.call(arguments, 1);
		for(var i=0, iLen=funcs.length; i<iLen; i++)
		{
			var str=funcs[i];
			var func=obj[str];
			obj[str]=func.bind.apply(func, args);
		}
	},
	browser:function()
	{
		if(!Utils._browser)
		{
			var ua=navigator.userAgent, 
				msie=/(msie|trident)/i.test(ua),
				chrome=/chrome|crios/i.test(ua),
				phantom=/phantom/i.test(ua),
				safari=/safari/i.test(ua) && !chrome && !phantom,
				firefox=/firefox/i.test(ua),
				webkitVersion=/version\/(\d+(\.\d+)?)/i,
				firefoxVersion=/firefox\/(\d+(\.\d+)?)/i;
			if(chrome)
			{
				Utils._browser=
				{
					name:"chrome",
					version:parseFloat(ua.match(/(?:chrome|crios)\/(\d+(\.\d+)?)/i)[1]),
					webkit:true,
					prefix:"webkit"
				}
			}
			else if(firefox)
			{
				Utils._browser=
				{
					name:"firefox",
					version:parseFloat(ua.match(firefoxVersion)[1]),
					webkit:false,
					prefix:"moz"
				}
			}
			else if(safari)
			{
				Utils._browser=
				{
					name:"msie",
					version:parseFloat(ua.match(/(msie |rv:)(\d+(\.\d+)?)/i)[2]),
					webkit:false,
					prefix:"ms"
				}
			}
			else if(msie)
			{
				Utils._browser=
				{
					name:"msie",
					version:parseFloat(ua.match(/(msie |rv:)(\d+(\.\d+)?)/i)[2]),
					webkit:false,
					prefix:"ms"
				}
			}
			else
			{
				Utils._browser=
				{
					name:"",
					version:0,
					webkit:false,
					prefix:""
				}
			}
			Utils._browser.tablet=/tablet/i.test(ua);
			Utils._browser.phone=!Utils._browser.tablet && /[^-]mobi/i.test(ua);
			Utils._browser.mobile=Utils._browser.tablet || Utils._browser.phone;
			Utils._browser.ios = /(ipod|iphone|ipad)/i.test(ua);
			Utils._browser.android = /android/i.test(ua);
		}
		return Utils._browser;
	},
		_browser:null,
	css:function(elements,props)
	{
		if(!Utils._isList(elements))
			elements=[elements];
		for(var i=0, iLen=elements.length; i<iLen; i++)
		{
			var style=elements[i].style
			for(var j in props)
			{
				if(Utils._ADD_PREFIXES_TO[j])
					style[Utils.addPrefix(j)]=props[j];
				style[j]=props[j];
			}
		}
	},
	getStyle:function(element, property)
	{
		var style=element[property];
		if(style!="")
			return style;
		else
			return window.getComputedStyle(element,property);
	},
	hasClass:function(elements,str)
	{
		if(!Utils._isList)
			elements=[elements];
		for(var i=0, iLen=elements.length; i<iLen; i++)
		{
			if(elements[i].className.split(" ").indexOf(str)>=0)
				return true;
		}
		return false;
	},
	_isList:function(list)
	{
		return list.length!=undefined;
	},
	removeClass:function(elements,str)
	{
		if(!Utils._isList)
			elements=[elements];
		for(var i=0, iLen=elements.length; i<iLen; i++)
		{
			var targ=elements[i];
			var className=targ.className;
			var split=className.split(" ");
			var index=split.indexOf(str);
			if(index>=0)
			{
				split.splice(index,1);
				targ.className=split.join(" ");
			}
		}
	},
	removeEventListener:function(elements,event,handler)
	{
		if(!Utils._isList)
			elements=[elements];
		for(var i=0,iLen=elements.length; i<iLen; i++)
		{
			elements[i].removeEventListener(event,handler);
		}
	},
	removeMouseEnter:function(elements)
	{
		if(!Utils._isList)
			elements=[elements];
		for(var i=0, iLen=elements.length; i<iLen; i++)
		{
			var element=elements[i];
			if(Utils._ON_MOUSE_ENTER[element.danehansenID])
			{
				element.removeEventListener("mouseover",Utils._ON_MOUSE_ENTER[element.danehansenID]._handler);
				delete Utils._ON_MOUSE_ENTER[element.danehansenID];
			}
		}
	},
	removeMouseLeave:function(elements)
	{
		if(!Utils._isList)
			elements=[elements];
		for(var i=0, iLen=elements.length; i<iLen; i++)
		{
			var element=elements[i];
			if(Utils._ON_MOUSE_LEAVE[element.danehansenID])
			{
				element.removeEventListener("mouseout",Utils._ON_MOUSE_LEAVE[element.danehansenID]._handler);
				delete Utils._ON_MOUSE_LEAVE[element.danehansenID];
			}
		}
	},
	touch:function()
	{
		if(Utils._touch==null)
			Utils._touch="ontouchstart" in window;
		return Utils._touch;
	},
		_touch:null,
	toUnicode:function(str)
	{
		var unicode="";
		for(var i=0, iLen=str.length; i<iLen; i++)
		{
			unicode+=("&#"+str.charCodeAt(i)+";")
		}
		return unicode;
	}
};