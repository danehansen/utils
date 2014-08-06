#MyMath#

__Package__ : com.danehansen.utils  
__Class__ : public class MyMath  
__Inheritance__ : MyMath > Object

The MyMath class contains a collection of mathematical equations either written or collected to make shit easier and awesomer.

##Public Methods##

* __average__(... args):Number  
[static] Accepts either an unlimited quantity of numbers or an array of numbers and returns the total. 
* __cover__(content:Element, frame:Element)  
[static] Takes content element and fills the entirety of the frame element to scale. This would be likened to filling an element with a background image where with the css property `background-size:cover` but where that is not possible, Such as filling an element with a video element. It is assumed that the content will have `position:absolute` and the frame will have at least some sort of positioning applied, and probably also `overflow:hidden`. To scale the content, the original dimentions of the item before manipulation are recorded and then referred to each time it is resized. For example, if you are filling the entire background of a page with a bleeding video, the body would have `position:relative` and `overflow:hidden` applied, and the video would have `position:absolute` as well as `width:1280px` and `height:720px`.
* __ease__(target:Object, key:String, destination:Number, speed:Number = 0.05)  
[static] Brings the object’s provided property (target[key]) towards the destination by a factor of speed. Great for making a display object follow a mouse cursor or some other moving target.
* __ease__(num:Number, destination:Number, speed:Number = 0.05):Number  
[static] Same as above, but returns the eased amount rather than actually changing an object’s property.
* __indexOf__(list:*, value:*):int  
[static] Similar to Array’s built in indexOf method, but can pass in a NodeList or anything with numeric keys and a length property to find the index. Returns -1 if not found.
* __modulo__(num:Number, limit:Number):Number  
[static] Similar to the modulo (%) operator, but rather than mirroring at 0, it continues past 0. For example, -1%4=-1, but modulo(-1, 4)=3. Great for when you decrement a value below 0 and need the functionality to wrap, like an image gallery.
* __primes__(limit:Number):Array  
[static] Returns an array of all prime numbers between 0 and limit.
* __random__(limit1:Number, limit2:Number = 0, round:Boolean = false, natural:int = 1):Number  
[static] Returns a random number between limit1 and limit2. Optionally, it will be rounded. The natural... tough one to explain. It is a representation of how to make the random number favor towards the middle of the two limits. There is a difference between Math.random()*2, and Math.random()+Math.random(), and this argument builds upon that. If you covered a square with 100 points all with random x and y positions, leaving the natural factor would result in scattered points like until a section of a starry night. With natural bumped up to 2 or higher, it would look more like a shotgun blast.
* __randomChoice__(list:* = [-1,1], natural:int = 1):*  
[static] Returns a random value from the provided array or list. The default is [-1,1] for instances when you need to randomly determine if something should be left or right, up or down.
* __relativePercentage__(bottomEnd:Number, topEnd:Number, current:Number):Number  
[static] Returns the position of current in reference to a scale between bottomEnd and top end. Example: relativePercentage(2,4,3) returns 0.5.
* __round__(num:Number, increment:Number):Number  
[static] Returns a number rounded by the increment, rather than by 1.
* __shuffle__(list:Number, duplicate:Boolean = false):Array  
[static] Shuffles the provided array or list. If duplicate is set to true, the original list if left alone and the shuffled list is returned on a new array. Note: when shuffling a NodeList, always set duplicate to true as a NodeList does not shuffle well. 
* __sortAscending__(a:Number, b:Number):Number  
[static] Returns the difference between the a and b, meant to pass into the Array.sort method as an alternate to the default alphabetical.
* __sortDescending__(a:Number, b:Number):Number  
[static] Returns the reversed difference between a and b, meant to pass into the Array.sort method as an alternate to the default alphabetical.
* __toDegrees__(rad:Number, offset:Boolean = false):Number  
[static] Converts an angle in radians to degrees. By default, just returns an angle of the same amount measured in degrees, but when set to true will also account for offsetting by 1/4 turn.
* __toRadians__(deg:Number, offset:Boolean = false):Number  
[static] Converts an angle in degrees to radians. By default, just returns an angle of the same amount measured in radians, but when set to true will also account for offsetting by 1/4 turn. 
* __total__(list:*):Number  
[static] Calculates the total in an array or list of values. Booleans will also be totaled as 1s or 0s.

#Utils#

__Package__ : com.danehansen.utils  
__Class__ : public class Utils  
__Inheritance__ : Utils > Object

A collection of commonly reused static functions.

##Public Methods##

* __addClass__(elements:*, className:String)  
[static] Accepts either a single element, array of elements, or node list and applies a class to each if it does not already exist. 
* __addEventListener__(elements:*, event:String, listener:Function)  
[static] Accepts either a single element, array of elements, or node list and adds an event listener to each.
* __addMouseEnter__(elements:*, listener:Function)  
[static] Accepts either a single element, array of elements, or node list and adds an event listener simulating jQuery’s mouseEnter. 
* __addMouseLeave__(elements:*, listener:Function)  
[static] Accepts either a single element, array of elements, or node list and adds an event listener simulating jQuery’s mouseLeave. 
* __addPrefix__(style:String):String  
[static] Receives a humpback notation css style name, and returns the vendor prefixed version of it. Example: Passing in “boxSizing” when in Firefox will return “mozBoxSizing”.
* __autoAlpha__(elements:*, value:Number)  
[static] Accepts either a single element, array of elements, or node list and sets the opacity, while also setting visibility to hidden if at 0. 
* __bind__(functions:Array, obj:Object, ...args:*)  
[static] Loops through an array of function names as strings, finds them on the object, and replaces them with versions which are bound to the object, with any additional parameters provided. Useful in writing object-oriented JavaScript on a class where you can with one line write `Utils.bind(["play", "stop", "resize"], this);` rather than `this.play.bind(this); this.stop.bind(this); this.resize.bind(this);`
* __browser__():Object  
[static] Returns an object which contains information on the browser name, version and vendor prefix; and whether the browser is webkit, phone, tablet, mobile, iOS, or Android.  
* __css__(elements:*, props:Object)  
[static] Accepts either a single element, array of elements, or node list and applies all style properties contained in props to them.  
* __getStyle__(element:Element, property:String):String  
[static] First looks for the element’s style on it’s style object, if not there, looks to the window.getComputedStyle of the element.  
* __hasClass__(elements:*, className:String):Boolean  
[static] Accepts either a single element, array of elements, or node list and looks through all of them and returns if one of them has that class or not.  
* __loadBigImages__(parent:Element)  
[static] Accepts either single element, and searches within it, and including it, for elements with a “data-background-image” or “data-src” attribute and applies that to the image, then deletes the data attribute. Good for loading large images below the fold after the entire page has loaded, or loading in all the images of a slideshow only when it gets activated.  
* __removeClass__(elements:*, className:String)  
[static] Accepts either a single element, array of elements, or node list and removes a class from each if it exists. 
* __removeEventListener__(elements:*, event:String, listener:Function)  
[static] Accepts either a single element, array of elements, or node list and removes an event listener from each.
* __removeMouseEnter__(elements:*, listener:Function)  
[static] Accepts either a single element, array of elements, or node list and removes an event listener simulating jQuery’s mouseEnter. 
* __removeMouseLeave__(elements:*, listener:Function)  
[static] Accepts either a single element, array of elements, or node list and removes an event listener simulating jQuery’s mouseLeave. 
* __touch__():Boolean  
[static] Returns whether or not the browser supports touch events. 

#Timer#

__Package__ : com.danehansen.utils  
__Class__ : public class Timer  
__Inheritance__ : Timer > EventDispatcher > Object

The Timer class is the interface to setTimeout and setInterval, based on the AS3 Timer class but simplified. This class depends on EventDispatcher.js. Use the start() method to start a timer. Add an event listener for the timer event to set up code to be run on the timer interval.

You can create Timer objects to run once or repeat at specified intervals to execute code on a schedule.

##Public Methods##

* __Timer__(delay:Number, repeatCount:int = 0)  
Constructs a new Timer object with the specified delay and repeatCount states.
* __currentCount__():int  
Gets the total number of times the timer has fired since it started at zero.
* __delay__(value:Number):*  
Gets or sets the delay, in milliseconds, between timer events.
* __repeatCount__(value:int):*  
Gets or sets the total number of times the timer is set to run.
* __reset__()  
Stops the timer, if it is running, and sets the currentCount property back to 0, like the reset button of a stopwatch.
* __running__():Boolean  
Gets the timer’s current state; true if the timer is running, otherwise false.
* __start__()  
Starts the timer, if it is not already running.
* __stop__()  
Stops the timer.

##Public Constants##

* __TIMER__ : String = "timer"  
[static] The Timer.TIMER constant defines the value of the type property of a timer event object.
* __TIMER&#95;COMPLETE__ : String = "timerComplete"  
[static] The Timer.TIMER_COMPLETE constant defines the value of the type property of a timerComplete event object.

##Events##

* __timer__  
Dispatched whenever a Timer object reaches an interval specified according to the Timer.delay property.
* __timerComplete__  
Dispatched whenever it has completed the number of requests set by Timer.repeatCount.

#Cookie#

__Package__ : com.danehansen.utils  
__Class__ : public class Cookie  
__Inheritance__ : Cookie > Object

The Cookie class contains is an interface to reading/writing browser cookies.

##Public Properties##

* __days__ : uint  
[static] Default number of days used in the set function. Default vaule is 30.

##Public Methods##

* __get__():Object  
[static] Returns a parsed JSON object from the “data” value of the browser cookie.
* __set__(obj:Object, days:uint = 30)  
[static] Accepts an object which gets stringified and set to the cookie under the property of “data”. Also accepts a parameter, which represents the number of days in the future that “expires” will be set.

#MyText#

__Package__ : com.danehansen.utils  
__Class__ : public class MyText  
__Inheritance__ : MyText > Object

The MyText class is a collection of static methods used for processing/manipulating strings.

##Public Methods##

* __addCommas__(value:Number):String  
[static] Rounds and formats numbers to have a comma every 3 places.
* __leadingZeros__(value:Number, length:uint):String  
[static] Ensures that a number is a certain number of digits long, adding leading zeros to fill in the remainder.
* __logObject__(obj:Object, name:String)  
[static] Logs the name of the object to the console, then line by line logs out each value within the object.
* __timeFormat__(seconds:uint, useHours:Boolean = false):String  
[static] Formats seconds into an minutes:seconds format, optionally an hours:minutes:seconds format.
* __toDollars__(value:Number):String  
[static] Formats a number as a dollar amount, such at $1,000,000.49.
* __toUnicode__(str:String):String  
[static] Converts a string to unicode characters. 
* __validateEmail__(email:String):Boolean  
[static] Returns true if a valid email, false if not. Is it perfect? No. Good enough? Yes.