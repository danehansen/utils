"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

var MyUtils=
{
	PREFIXES:["","-webkit-", "-moz-", "-ms-", "-o-"],
	addClass:function(elements,str)
	{
		if(!elements[0])
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
		if(!elements[0])
			elements=[elements];
		if(!MyUtils._addEventListener)
		{
			if(elements[0].addEventListener)
				MyUtils._addEventListener="addEventListener";
			else
				MyUtils._addEventListener="attachEvent";
		}
		for(var i=0,iLen=elements.length; i<iLen; i++)
		{
			elements[i][MyUtils._addEventListener](evt,handler);
		}
	},
		_addEventListener:null,
	addMouseEnter:function(elements,handler)
	{
		if(!elements[0])
			elements=[elements];
		for(var i=0, iLen=elements.length; i<iLen; i++)
		{
			var element=elements[i];
			if(!element.danehansenID)
				element.danehansenID=String(Math.random());
			MyUtils._ON_MOUSE_ENTER[element.danehansenID]={handler:handler, _handler:MyUtils.bind(MyUtils._onMouseEnter,element)};
			element.addEventListener("mouseover",MyUtils._ON_MOUSE_ENTER[element.danehansenID]._handler);
		}
	},
		_onMouseEnter:function(evt)
		{
			var relTarg=evt.relatedTarget || evt.fromElement;
			if(this.contains(relTarg) || relTarg==this)
				evt.preventDefault();
			else
				MyUtils._ON_MOUSE_ENTER[this.danehansenID].handler(evt);
		},
		_ON_MOUSE_ENTER:{},
	addMouseLeave:function(elements,handler)
	{
		if(!elements[0])
			elements=[elements];
		for(var i=0, iLen=elements.length; i<iLen; i++)
		{
			var element=elements[i];
			if(!element.danehansenID)
			element.danehansenID=String(Math.random());
			MyUtils._ON_MOUSE_LEAVE[element.danehansenID]={handler:handler, _handler:MyUtils.bind(MyUtils._onMouseLeave,element)};
			element.addEventListener("mouseout",MyUtils._ON_MOUSE_LEAVE[element.danehansenID]._handler);
		}
	},
		_onMouseLeave:function(evt)
		{
			var relTarg=evt.relatedTarget || evt.fromElement;
			if(this.contains(relTarg) || relTarg==this)
				evt.preventDefault();
			else
				MyUtils._ON_MOUSE_LEAVE[this.danehansenID].handler(evt);
		},
		_ON_MOUSE_LEAVE:{},
	autoAlpha:function(elements, num)
	{
		MyUtils.css(elements,{opacity:num,visibility:num==0?"hidden":"visible"});
	},
	bind:function(func, context)
	{
		var slice=Array.prototype.slice;
		var proto=Function.prototype;
		if(func.bind===proto && proto)
			return proto.apply(func, slice.call(arguments, 1));
		var args=slice.call(arguments, 2);
		return function()
		{
			return func.apply(context, args.concat(slice.call(arguments)));
		};
	},
	css:function(elements,props)
	{
		if(!elements[0])
			elements=[elements];
		for(var i=0, iLen=elements.length; i<iLen; i++)
		{
			var style=elements[i].style
			for(var j in props)
			{
				style[j]=props[j];
			}
		}
	},
	dropShadow:function(elements,x,y,spread,color)
	{
		if(!_dropShadow)
		{
			var body=document.querySelector("body");
			if(body.style.webkitFilter=="")
				MyUtils._dropShadow="webkitFilter";
			else if(body.style.msFilter=="")
				MyUtils._dropShadow="msFilter";
			else
				MyUtils._dropShadow="filter";
		}
	},
		_dropShadow:null,
	hasClass:function(elements,str)
	{
		if(!elements[0])
			elements=[elements];
		for(var i=0, iLen=elements.length; i<iLen; i++)
		{
			if(elements[i].className.split(" ").indexOf(str)>=0)
				return true;
		}
		return false;
	},
	indexOf:function(list,element)
	{
		for(var i=0, iLen=list.length; i<iLen; i++)
		{
			if(list[i]==element)
				return i;
		}
		return -1;
	},
	removeClass:function(elements,str)
	{
		if(!elements[0])
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
		if(!elements[0])
			elements=[elements];
		if(!MyUtils._removeEventListener)
		{
			if(elements[0].removeEventListener)
				MyUtils._removeEventListener="removeEventListener";
			else
				MyUtils._removeEventListener="detachEvent";
		}
		for(var i=0,iLen=elements.length; i<iLen; i++)
		{
			elements[i][MyUtils._removeEventListener](event,handler);
		}
	},
		_removeEventListener:null,
	removeMouseEnter:function(elements)
	{
		if(!elements[0])
			elements=[elements];
		for(var i=0, iLen=elements.length; i<iLen; i++)
		{
			var element=elements[i];
			if(MyUtils._ON_MOUSE_ENTER[element.danehansenID])
			{
				element.removeEventListener("mouseover",MyUtils._ON_MOUSE_ENTER[element.danehansenID]._handler);
				delete MyUtils._ON_MOUSE_ENTER[element.danehansenID];
			}
		}
	},
	removeMouseLeave:function(elements)
	{
		if(!elements[0])
			elements=[elements];
		for(var i=0, iLen=elements.length; i<iLen; i++)
		{
			var element=elements[i];
			if(MyUtils._ON_MOUSE_LEAVE[element.danehansenID])
			{
				element.removeEventListener("mouseout",MyUtils._ON_MOUSE_LEAVE[element.danehansenID]._handler);
				delete MyUtils._ON_MOUSE_LEAVE[element.danehansenID];
			}
		}
	},
	toArray:function(list)
	{
		var array=[];
		for(var i=0,iLen=list.length; i<iLen; i++)
		{
			array[i]=list[i];
		}
		return array;
	},
	touch:function()
	{
		if(MyUtils._touch==null)
			MyUtils._touch="ontouchstart" in window;
		return MyUtils._touch;
	},
		_touch:null
};