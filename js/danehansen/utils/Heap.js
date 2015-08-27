//////////////////////////////////////////////////
// author: Dane Hansen //////////////////////////
// www.danehansen.com //////////////////////////
// version: 1.0.0 /////////////////////////////
//////////////////////////////////////////////

(function(){
	"use strict";

	function _leftIndex(index)
	{
		return 2 * index + 1;
	}

	function _rightIndex(index)
	{
		return 2 * index + 2;
	}

	function _parentIndex(index)
	{
		return Math.floor((index - 1) / 2);
	}

	Heap.MAX = function(a, b)
	{
		return b > a;
	}
	
	Heap.MIN = function(a, b)
	{
		return b < a;
	}

	function Heap(sort)
	{
		this._sort = sort || Heap.MAX;
		this.array = [];
		this.length = 0;
	}

	Heap.prototype._swap = function(a, b)
	{
		var temp = this.array[a];
		this.array[a] = this.array[b];
		this.array[b] = temp;
	}

	Heap.prototype._sortUp = function(index)
	{
		if(index < 1)
			return;
		var parentIndex = _parentIndex(index);
		if(this._sort(this.array[parentIndex], this.array[index]))
		{
			this._swap(index, parentIndex);
			this._sortUp(parentIndex);
		}
	}

	Heap.prototype.sort = function()
	{
		this._sortDown(0);
	}

	Heap.prototype._sortDown = function(index)
	{
		var swapIndex = _leftIndex(index);
		var rightIndex = _rightIndex(index);
		if(rightIndex < this.length)
		{
				swapIndex = this._sort(this.array[swapIndex], this.array[rightIndex]) ? rightIndex : swapIndex;
		}
		if( this._sort(this.array[index], this.array[swapIndex]))
		{
			this._swap(index, swapIndex);
			this._sortDown(swapIndex);
		}
	}

	Heap.prototype.push = function(val)
	{
		this.array.push(val);
		this.length++;
		this._sortUp(this.length - 1);
	}

	Heap.prototype.shift = function()
	{
		if(!this.length)
			return;
		var val = this.array[0];
		this.array[0] = this.array[this.length -1];
		this.array.pop();
		this.length--;
		if(this.length > 1)
			this.sort();
		return val;
	}

	Heap.prototype.log = function()
	{
		var start = 0;
		var len = 1;
		while(start < this.length)
		{
			var end = start + len;
			console.log(this.array.slice(start, end));
			len *= 2;
			start = end;
		}
	}

	if(typeof module != "undefined")
		module.exports = Heap;
	else if(typeof window != "undefined")
		window.Heap = Heap;
})();