"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
//version:1.0.0////////////////////////////////
//////////////////////////////////////////////

var Utils=
{
	addClass:function(elements,str)
	{
		if(!Utils._isList(elements))
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
		if(!Utils._isList(elements))
			elements=[elements];
		for(var i=0,iLen=elements.length; i<iLen; i++)
		{
			elements[i].addEventListener(evt,handler);
		}
	},
	addMouseEnter:function(elements,handler)
	{
		if(!Utils._isList(elements))
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
		if(!Utils._isList(elements))
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
				android=/android/i.test(ua),
				ios=/(ipod|iphone|ipad)/i.test(ua),
				tablet=/tablet/i.test(ua),
				mobile=tablet || android || ios,
				phone=!tablet && /[^-]mobi/i.test(ua);
			if(chrome)
			{
				Utils._browser=
				{
					name:"chrome",
					version:parseFloat(ua.match(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)[1]),
					webkit:true,
					prefix:"webkit"
				}
			}
			else if(firefox)
			{
				Utils._browser=
				{
					name:"firefox",
					version:parseFloat(ua.match(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)[1]),
					webkit:false,
					prefix:"moz"
				}
			}
			else if(safari)
			{
				Utils._browser=
				{
					name:"safari",
					version:parseFloat(ua.match(/version\/(\d+(\.\d+)?)/i)[2]),
					webkit:true,
					prefix:"webkit"
				}
			}
			else if(msie)
			{
				Utils._browser=
				{
					name:"msie",
					version:parseFloat(ua.match(/(?:msie |rv:)(\d+(\.\d+)?)/i)[2]),
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
		}
		Utils._browser.android=android;
		Utils._browser.ios=ios;
		Utils._browser.tablet=tablet;
		Utils._browser.mobile=mobile;
		Utils._browser.phone=phone;
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
	getURLVars:function()
	{
		var vars={};
		var parts=window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){vars[key]=value;});
		return vars;
	},
	hasClass:function(elements,str)
	{
		if(!Utils._isList(elements))
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
	loadBigImages:function(parent)
	{
		if(!parent)
			parent=document;
		var elements=Array.prototype.slice.call(parent.querySelectorAll("*[data-background-image]"), 0);
		if(parent!=document && (parent.hasAttribute("data-background-image") || parent.hasAttribute("data-src")))
			elements.push(parent);
		for(var i=0, iLen=elements.length; i<iLen; i++)
		{
			var element=elements[i];
			element.style.backgroundImage="url("+element.getAttribute("data-background-image")+")";
			element.removeAttribute("data-background-image");
		}
		elements=parent.querySelectorAll("img[data-src]");
		for(i=0, iLen=elements.length; i<iLen; i++)
		{
			element=elements[i];
			element.setAttribute("src", element.getAttribute("data-src"));
			element.removeAttribute("data-src");
		}
	},
	merge:function(newObj, oldObj, copy)
	{
		var result=copy?oldObj.constructor():oldObj;
		if(copy)
		{
			Utils.merge(oldObj, result);
			Utils.merge(newObj, result);
		}
		else
		{
			for(var i in newObj)
			{
				var newProp=newObj[i];
				var type=typeof newProp;
				if(type=="object" && newProp!=null)
				{
					if(!result[i])
						result[i]=newProp.constructor();
					Utils.merge(newProp, result[i]);
				}
				else
				{
					result[i]=newProp;
				}
			}
		}
		return result;
	},
	removeClass:function(elements,str)
	{
		if(!Utils._isList(elements))
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
		if(!Utils._isList(elements))
			elements=[elements];
		for(var i=0,iLen=elements.length; i<iLen; i++)
		{
			elements[i].removeEventListener(event,handler);
		}
	},
	removeMouseEnter:function(elements)
	{
		if(!Utils._isList(elements))
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
		if(!Utils._isList(elements))
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
		_touch:null
};