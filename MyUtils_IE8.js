MyUtils._addEventListener=null;
MyUtils.addEventListener=function(elements,evt,handler)
{
	if(!MyUtils.isList)
		elements=[elements];
	if(!MyUtils._addEventListener && elements.length>0)
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

MyUtils._removeEventListener=null;
MyUtils.removeEventListener=function(elements,event,handler)
{
	if(!MyUtils.isList)
		elements=[elements];
	if(!MyUtils._removeEventListener && elements.length>0)
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
};