"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

	//requires greensock/TweenLite.js
	//requires greensock/TimelineLite.js
	//requires greensock/easing/EasePack.js
	//requires greensock/plugins/BezierPlugin.js

var MyEase=
{
	_BEZIER_PROPS:["a","b","c","d"],
	keyframe:function(targ, timeline, keyframes, loop, bezier, curviness)
	{
		if(!timeline)
			timeline=new TimelineLite({paused:true});
		if(loop!=true)
			loop=false;
		if(bezier!=true)
		{
			bezier=false;
		}
		else
		{
			if(typeof curviness=="undefined")
				curviness=Math.PI/2;
		}
		var length=keyframes.length;
		if(bezier==false)
		{
			for(var i=0, iLen=loop?length:length-1; i<iLen; i++)
			{
				var startFrame=keyframes[i];
				var from={};
				for(var str in startFrame)
				{
					if(str!="progress")
						from[str]=startFrame[str];
				}
				var endFrame=keyframes[(i+1)%length];
				var to={ease:Linear.easeNone};
				for(str in from)
				{
					to[str]=endFrame[str];
				}
				timeline.insert(new TweenLite.fromTo(targ,(1+endFrame.progress-startFrame.progress)%1,from,to),startFrame.progress);
			}
		}
		else if(bezier)
		{
			var bezierPoints=[];
			var start=loop?-1:0;
			var end=loop?(length+1):(length-1);
			for(i=start; i<=end; i++)
			{
				var bezierPoint={};
				var keyframe=keyframes[(i+length)%length];
				for(str in keyframe)
				{
					if(str!="progress")
						bezierPoint[str]=keyframe[str];
				}
				bezierPoints.push(bezierPoint);
			}
			var bezierPropertiesTotal=MyEase._BEZIER_PROPS.length;
			var bezierSegments=BezierPlugin.bezierThrough(bezierPoints,curviness);
			for(var i=0, iLen=loop?length:length-1; i<iLen; i++)
			{
				var values=[];
				var adjustedIndex=loop?(i+1):i;
				for(var j=0; j<bezierPropertiesTotal; j++)
				{
					var value={};
					for(str in bezierPoints[0])
					{
						value[str]=bezierSegments[str][adjustedIndex][MyEase._BEZIER_PROPS[j]];
					}
					values.push(value);
				}
				timeline.insert(new TweenLite.to(targ, (keyframes[(i+1)%length].progress-keyframes[i%length].progress+1)%1, {bezier:{values:values, type:"cubic"}, ease:Linear.easeNone}), keyframes[i].progress);
			}
		}
		return timeline;
	}
};

/*CustomEase.create=function(name, segments)
{
	var b = new CustomEase(name, segments);
	return b.ease;
}

CustomEase.byName=function(name)
{
	return CustomEase._all[name].ease;
}

CustomEase._all={};

function CustomEase(name, segments)
{
	this._name = name;
	this._segments = [];
	var l = segments.length;
	for(var i = 0; i < l; i++)
	{
		this._segments[this._segments.length] = new Segment(segments[i].s, segments[i].cp, segments[i].e);
	}
	CustomEase._all[name] = this;
}
		
CustomEase.prototype.ease=function(time, start, change, duration)
{
	var factor = time / duration, qty = this._segments.length, t, s;
	var i = int(qty * factor);
	t = (factor - (i * (1 / qty))) * qty;
	s = this._segments[i];
	return start + change * (s.s + t * (2 * (1 - t) * (s.cp - s.s) + t * (s.e - s.s)));
}

CustomEase.prototype.destroy=function()
{
	this._segments = null;
	delete this._all[this._name];
}

function Segment(s, cp, e)
{
	this.s = s;
	this.cp = cp;
	this.e = e;
}*/