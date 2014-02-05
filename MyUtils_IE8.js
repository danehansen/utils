MyUtils.addEventListener=function(elements,evt,handler)
{
	if(!MyUtils.isList)
		elements=[elements];
	if(!MyUtils._listeners && elements.length>0)
		MyUtils._setEventListeners(elements[0]);
	for(var i=0,iLen=elements.length; i<iLen; i++)
	{
		elements[i][MyUtils._listeners.add](evt,handler);
	}
};

MyUtils._bindCtor=function(){};
MyUtils.bind=function(func, context)
{
	if(Function.prototype.bind && func.bind===Function.prototype.bind)
		return Function.prototype.bind.apply(func, Array.prototype.slice.call(arguments, 1));
	var args=Array.prototype.slice.call(arguments, 2);
	var bound;
	return bound=function()
	{
		if(!(this instanceof bound))
			return func.apply(context, args.concat(Array.prototype.slice.call(arguments)));
		MyUtils._bindCtor.prototype=func.prototype;
		var self=new MyUtils._bindCtor;
		MyUtils._bindCtor.prototype=null;
		var result=func.apply(self, args.concat(Array.prototype.slice.call(arguments)));
		if(Object(result)===result)
			return result;
		return self;
	};
};

MyUtils.removeEventListener=function(elements,event,handler)
{
	if(!MyUtils.isList)
		elements=[elements];
	if(!MyUtils._listeners && elements.length>0)
		MyUtils._setEventListeners(elements[0]);
	for(var i=0,iLen=elements.length; i<iLen; i++)
	{
		elements[i][MyUtils._listeners.remove](event,handler);
	}
};

MyUtils._listeners=null;
MyUtils._setEventListeners=function(element)
{
	MyUtils._listeners={};
	if(element.removeEventListener)
	{
		MyUtils._listeners.add="addEventListener";
		MyUtils._listeners.remove="removeEventListener";
	}
	else
	{
		MyUtils._listeners.add="attachEvent";
		MyUtils._listeners.remove="detachEvent";
	}
}