"use strict";

//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
//version:1.0.0////////////////////////////////
//////////////////////////////////////////////

/* Just import when you need it and that’s it. If you need to change the positioning, override the defaults with something like this:
#FPS
{
	top:auto !important;
	bottom:0;
	left:auto !important;
	right:0;
}*/

(function()
{
	var fpsLastTime=0;
	var fpsTimes=[];
	var element=document.createElement("div");
	element.setAttribute("id", "FPS");
	var style=element.style;
	style.textAlign="center";
	style.position="fixed";
	style.top=0;
	style.left=0;
	style.backgroundColor="#000";
	style.color="#0F0";
	style.fontFamily="courier";
	style.fontSize="10px";
	style.zIndex=999999;
	style.lineHeight="20px";
	style.width="50px";
	style.padding=0;
	style.margin=0;
	style.opacity=0.75;
	var LENGTH=60;
	var divisor=1000/LENGTH;

	function onTick()
	{
		var currentTime=Date.now();
		var diff=currentTime-fpsLastTime;
		var num=divisor/diff;
		fpsTimes.push(num);
		while(fpsTimes.length>LENGTH)
		{
			fpsTimes.shift();
		}
		var total=0;
		for(var i=0; i<LENGTH; i++)
		{
			total+=fpsTimes[i];
		}
		element.innerHTML=Math.round(total)+"fps";
		fpsLastTime=currentTime;
		window.requestAnimationFrame(onTick);
	}

	function addToBody()
	{
		document.body.appendChild(element);
	}

	addToBody();
	onTick();
	setTimeout(addToBody, 1000);
})();