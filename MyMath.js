"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

var MyMath=
{
	average:function()
	{
		var list;
		if(typeof arguments[0]=="number")
			list=arguments;
		else
			list=arguments[0];
		var num=0;
		for(var i=0; i<list.length; i++)
		{
			num+=list[i];
		}
		return num/list.length;
	},
	
	cover:function(content, frame)
	{
		content=content[0]?content[0]:content;
		if(!content.danehansenID)
			content.danehansenID=String(Math.random());
		frame=frame[0]?frame[0]:frame;
		if(!MyMath._COVER[content.danehansenID])
			MyMath._COVER[content.danehansenID]=content.offsetWidth/content.offsetHeight;
		var contentRatio=MyMath._COVER[content.danehansenID];
		var frameWidth=frame.offsetWidth;
		var frameHeight=frame.offsetHeight;
		var frameRatio=frameWidth/frameHeight;
		if(frameRatio)
		{
			if(contentRatio>frameRatio)
			{
				var newWidth=frameHeight*contentRatio;
				MyUtils.css(content,{width:newWidth+"px",height:frameHeight+"px",left:-(newWidth-frameWidth)/2+"px",top:0});
			}
			else
			{
				var newHeight=frameWidth/contentRatio;
				MyUtils.css(content,{width:frameWidth+"px",height:newHeight+"px",left:0,top:-(newHeight-frameHeight)/2+"px"});
			}
		}
		else
		{
			setTimeout(function(){MyMath.cover(content,frame);},1);
		}
	},
		_COVER:{},

	distance:function(point1, point2)
	{
		return Math.sqrt(Math.pow(point1.x-point2.x,2)+Math.pow(point1.y-point2.y,2));
	},

	ease:function(targOrNum, propOrDest, destOrSpeed, speed)
	{
		var defaultSpeed=0.05;
		if(typeof targOrNum=="number")
			return targOrNum+=(propOrDest-targOrNum)*(destOrSpeed||defaultSpeed);
		else
			targOrNum[propOrDest]+=(destOrSpeed-targOrNum[propOrDest])*(speed||defaultSpeed);
	},

	indexOf:function(list, value)
	{
		var index=-1;
		for(var i=0; i<list.length; i++)
		{
			if(list[i]==value)
				index=i;
		}
		return index;
	},

	modulo:function(num, limit)
	{
		while(num<0)
		{
			num+=limit;
		}
		return num%limit;
	},

	primes:function(limit)
	{
		var uints=[];
		for(var i=2; i<=limit; i++)
			uints.push(i);
		for(i=2; i<=limit; i++)
		{
			for(var j=0; j<uints.length; j++)
			{
				if(uints[j]%i==0 && uints[j]!=i)
					uints.splice(j,1);
			}
		}
		return uints;
	},

	random:function(firstNum, secondNum, round, natural)
	{
		secondNum = typeof secondNum !== 'undefined' ? secondNum : 0;
		round = typeof round !== 'undefined' ? round : false;
		natural = typeof natural !== 'undefined' ? natural : 1;
		var total=0;
		if(!round)
		{
			for(var i=0; i<natural; i++)
			{
				total+=Math.random()*((secondNum-firstNum)/natural);
			}
			return firstNum+total;			
		}
		else
		{
			var num;
			if(secondNum>firstNum)
			{
				num=secondNum;
				secondNum=firstNum;
				firstNum=num;
			}
			for(i=0; i<natural; i++)
			{
				total+=Math.random()*((firstNum+1-secondNum)/natural);
			}
			return Math.floor(secondNum+total);
		}
	},

	randomChoice:function(list, natural)
	{
		list=typeof list!=='undefined'?list:[-1,1];
		natural=typeof natural!=='undefined'?natural:1;
		return list[MyMath.random(0,list.length-1,true,natural)];
	},

	relativePercentage:function(bottomEnd, topEnd, current)
	{
		 return (current-bottomEnd)/(topEnd-bottomEnd);
	},

	round:function(num, increment)
	{
		increment=typeof increment!=='undefined'?increment:1;
		var goesInto=num/increment;
		var lower=increment*Math.floor(goesInto);
		var higher=increment*Math.ceil(goesInto);
		if(Math.abs(num-lower)<Math.abs(num-higher))
			return lower;
		else
			return higher;
	},

	shuffle:function(list, duplicate)
	{
		duplicate=typeof duplicate!=='undefined'?duplicate:false;

		var copy=list.slice(0,list.length);
		var placeHolder=list.slice(0,0);
		var startingLength=list.length;
		for(var i=0; i<startingLength; i++)
		{
			var randomIndex=MyMath.random(0,copy.length-1,true);
			placeHolder.push(copy[randomIndex]);
			copy.splice(randomIndex,1);
		}
		for(i=0; i<startingLength; i++)
		{
			copy.push(placeHolder[i]);
		}
		if(duplicate)
		{
			return copy;
		}
		else
		{
			for(i=0; i<startingLength; i++)
			{
				list[i]=copy[i];
			}
			return list;
		}
	},

	toDegrees:function(targ, offset)
	{
		offset = typeof offset !== 'undefined' ? offset : false;
		if(offset)
			return (-targ+Math.PI/2) * 180/Math.PI;
		else
			return -targ * 180/Math.PI;
	},

	toRadians:function(targ, offset)
	{
		offset = typeof offset !== 'undefined' ? offset : false;
		if(offset)
			return (-targ-90) * Math.PI/180;
		else
			return -targ * Math.PI/180;
	},

	total:function(list)
	{
		var sum=0;
		for(var i=0; i<list.length; i++)
		{
			if(typeof list[i]=="number")
			{
				sum+=list[i];
			}
			else if(typeof list[i]=="boolean")
			{
				if(list[i])
					sum++;
			}
		}
		return sum;
	}
};