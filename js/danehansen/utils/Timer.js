//////////////////////////////////////////////////
// author: Dane Hansen //////////////////////////
// www.danehansen.com //////////////////////////
// version: 1.0.0 /////////////////////////////
//////////////////////////////////////////////

(function(){
	"use strict";

	//requires danehansen/events/EventDispatcher.js
	if(typeof module != "undefined")
		EventDispatcher = require("../events/EventDispatcher");

	function Timer(delay, repeatCount)
	{
		EventDispatcher.call(this);

		this._currentCount = 0;
		this._delay = delay;
		this._lastTime = null;
		this.repeatCount(repeatCount || 0);
		this._running = false;
		this._timeLeft = delay;
		this._timeout = null;

		this._onTimer = this._onTimer.bind(this);
		this.reset = this.reset.bind(this);
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
	}
	Timer.prototype = Object.create(EventDispatcher.prototype);
	Timer.prototype.constructor = Timer;
	Timer.TIMER = "timer";
	Timer.TIMER_COMPLETE = "timerComplete";

	//getters/setters

		Timer.prototype.currentCount = function()
		{
			return this._currentCount;
		}

		Timer.prototype.delay = function(num)
		{
			if(typeof num == "number")
			{
				this._delay = num;
				if(this._running)
				{
					this.stop();
					this._timeLeft = this._delay;
					this.start();
				}
			}
			else
			{
				return this._delay;
			}
		}

		Timer.prototype.repeatCount = function(num)
		{
			if(typeof num == "number")
				this._repeatCount = parseInt(num);
			else
				return this._repeatCount;
		}

		Timer.prototype.running = function()
		{
			return this._running;
		}

	//methods

		//public

			Timer.prototype.reset = function()
			{
				if(this._running)
					this.stop();
				this._timeLeft = this._delay;
				this._currentCount = 0;
			}

			Timer.prototype.start = function()
			{
				if(!this._running)
				{
					this._running = true;
					this._increment();
				}
			}

			Timer.prototype.stop = function()
			{
				clearTimeout(this._timeout);
				this._timeLeft = this._delay - Date.now() + this._lastTime;
				this._running = false;
			}

		//private

			Timer.prototype._increment = function()
			{
				this._lastTime = Date.now();
				this._timeout = setTimeout(this._onTimer, this._timeLeft);
				this._timeLeft = this._delay;
			}

			Timer.prototype._onTimer = function()
			{
				this._currentCount++;
				this.dispatchEvent(Timer.TIMER);
				if(this._currentCount < this._repeatCount)
					this._increment();
				else
					this._onTimerComplete();
			}

			Timer.prototype._onTimerComplete = function()
			{
				this._running = false;
				this.dispatchEvent(Timer.TIMER_COMPLETE);
			}

	if(typeof module != "undefined")
		module.exports = Timer;
	else if(typeof window != "undefined")
		window.Timer = Timer;
})();