"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

//if your css defines an style for a retina image, you must use !important to override the autocalculation of the image width

(function()
{
	var imgs=document.querySelectorAll("img.retina");
	for(var i=0, iLen=imgs.length; i<iLen; i++)
	{
		var img=imgs[i];
		var split=img.getAttribute("src").split(".");
		split[split.length-2]=split[split.length-2]+"@2x";
		img.setAttribute("src", split.join("."));
		if(img.getAttribute("width")==null && img.getAttribute("height")==null)
			img.addEventListener("load", onLoaded);
	}

	function onLoaded(evt)
	{
		var img=evt.target;
		img.removeEventListener("load", onLoaded);
		img.setAttribute("width", img.naturalWidth/2);
	}
})();