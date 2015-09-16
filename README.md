#AJAX#

__Package__ : com.danehansen.utils  
__Class__ : public class AJAX  
__Inheritance__ : AJAX > Object

AJAX class contains shortcuts to making AJAX requests.

##Public Constants##

* __SUCCESS_EVENT__ : Object  
[static] A mockup of a successful event to be used for testing purposes.

##Public Methods##

* __delete__(url:String, listener:Function):XMLHttpRequest  
[static] Makes a DELETE request to a given url and calls a given listener when finished.
* __get__(url:String, listener:Function, data:Object):XMLHttpRequest  
[static] Makes a GET request to a given url with the given data and calls a given listener when finished.
* __post__(url:String, listener:Function, data:Object = null, header:Object = null):XMLHttpRequest  
[static] Makes a POST request with optional headers to a given url optionally with the given data and calls a given listener when finished.
* __put__(url:String, listener:Function, data:Object = null, header:Object = null):XMLHttpRequest  
[static] Makes a PUT request with optional headers to a given url optionally with the given data and calls a given listener when finished.
* __querify__(obj:Object, url:String):String  
[static] Returns a url with url parameters made from a provided object.

#Color#

__Package__ : com.danehansen.utils  
__Class__ : public class Color  
__Inheritance__ : Color > Object

Color class contains static methods to help manipulate colors.

##Public Methods##

* __red__(color:uint):uint  
[static] Returns the red portion of a uint.
* __green__(color:uint):uint  
[static] Returns the green portion of a uint.
* __blue__(color:uint):uint  
[static] Returns the blue portion of a uint.
* __rgbToHex__(rgb:String):String  
[static] Converts a "rgb(X,X,X)" string into a "#XXXXXX" string.
* __rgbToUint__(r:uint, g:uint, b:uint):uint  
[static] Converts 3 uints into a single uint.
* __uintToRGB__(color:uint):String  
[static] Converts a uint into a "rgb(X,X,X)" string.
* __uintToRGBA__(color:uint, alpha:Number = 1):String  
[static] Converts a uint and alpha into a "rgba(X,X,X,X)" string.

#Cookie#

__Package__ : com.danehansen.utils  
__Class__ : public class Cookie  
__Inheritance__ : Cookie > Object

The Cookie class contains is an interface to reading/writing browser cookies.

##Public Methods##

* __clear__()  
[static] Clears the cookie‘s "data" value.
* __date__():Date  
[static] Returns the cookie’s date value.
* __get__():Object  
[static] Returns a parsed JSON object from the “data” value of the browser cookie.
* __merge__(obj:Object, days:uint = 30)  
[static] Accepts an object which gets stringified and merged with the cookie under the property of “data”. Also accepts a parameter, which represents the number of days in the future that “expires” will be set.

#Heap#

__Package__ : com.danehansen.utils  
__Class__ : public class Heap  
__Inheritance__ : Heap > Object

The Heap class creates an instance to be used in heap sorting.

##Public Constants##

* __MAX__ : Function  
[static] A comparison function that sorts by max value.
* __MIN__ : Function  
[static] A comparison function that sorts by min value.

##Public Properties##

* __array__ : Array  
[read-only] The current array of the heap.
* __length__ : uint  
[read-only] The current size of the heap.

##Public Methods##

* __Heap__(sort:Function = Heap.MAX)  
Constructs a new Heap object with an optional sort function.
* __sort__()  
Sorts down the heap stack from the top.
* __push__()  
Adds an item to the heap and sorts the heap up from the bottom.
* __shift__():Object  
Removes the topmost item of the heap, sorts the heap from the top down, and then returns the item.
* __log__()  
Logs the heap to the console.

#MyMath#

__Package__ : com.danehansen.utils  
__Class__ : public class MyMath  
__Inheritance__ : MyMath > Object

The MyMath class contains a collection of mathematical equations either written or collected to make shit easier and awesomer.

##Public Methods##

* __average__(...args):Number  
[static] Accepts either an unlimited quantity of numbers or an array of numbers and returns the total. 
* __ceil__(num:Number, increment:Number = 1):Number  
[static] Rounds a number up to the nearest increment. 
* __circleIntersection__(centerA:Point, radiusA:Number, centerB:Point, radiusB:Number):Number  
[static] Returns an array of the two points at which 2 circles intersect, if they intersect. 
* __cover__(content:Element, frame:Element)  
[static] Takes content element and fills the entirety of the frame element to scale. This would be likened to filling an element with a background image where with the css property `background-size:cover` but where that is not possible, Such as filling an element with a video element. It is assumed that the content will have `position:absolute` and the frame will have at least some sort of positioning applied, and probably also `overflow:hidden`. To scale the content, the original dimentions of the item before manipulation are recorded and then referred to each time it is resized. For example, if you are filling the entire background of a page with a bleeding video, the body would have `position:relative` and `overflow:hidden` applied, and the video would have `position:absolute` as well as `width:1280px` and `height:720px`.
* __ease__(target:Object, key:String, destination:Number, speed:Number = 0.05)  
[static] Brings the object’s provided property (target[key]) towards the destination by a factor of speed. Great for making a display object follow a mouse cursor or some other moving target.
* __ease__(num:Number, destination:Number, speed:Number = 0.05):Number  
[static] Same as above, but returns the eased amount rather than actually changing an object’s property.
* __euclid__(a:int, b:int):int  
[static] Returns the greatest common divisor of two integers.
* __floor__(num:Number, increment:Number = 1):Number  
[static] Rounds a number down to the nearest increment. 
* __indexOf__(list:*, value:*):int  
[static] Similar to Array’s built in indexOf method, but can pass in a NodeList or anything with numeric keys and a length property to find the index. Returns -1 if not found.
* __intLength__(num:uint):uint  
[static] Returns the number of decimals in an integer.
* __luhn__(num:uint):Boolean  
[static] Returns whether or not an integer meets the Luhn validation.
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
* __splitUint__(num:int):Array  
[static] Returns an array representing each digit of an integer.
* __toDegrees__(rad:Number, offset:Boolean = false):Number  
[static] Converts an angle in radians to degrees. By default, just returns an angle of the same amount measured in degrees, but when set to true will also account for offsetting by 1/4 turn.
* __toRadians__(deg:Number, offset:Boolean = false):Number  
[static] Converts an angle in degrees to radians. By default, just returns an angle of the same amount measured in radians, but when set to true will also account for offsetting by 1/4 turn. 
* __total__(list:*):Number  
[static] Calculates the total in an array or list of values. Booleans will also be totaled as 1s or 0s.
* __velocityEase__(target:Object, key:String, destination:Number, speed:Number = 0.05, decay:Number = 0.9)  
[static] Brings the object’s provided property (target[key]) towards the destination by a factor of speed but with a velocity which decays at the decay speed. Great for making an elasticy ease.

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
* __formatCard__(num:String):String  
[static] Returns a formatted credit card number code like XXXX XXXX XXXX XXXX or XXXX XXXXXX XXXXX and optionally will turn all but the last 4 digits to asterisks.
* __formatExpiration__(date:String):String  
[static] Returns a formatted expiration date like XX/XX or XX/XXXX.
* __formatPhone__(num:String):String  
[static] Returns a formatted phone number like X (XXX) XXX-XXXX or if an optional deliminator is provided, like X-XXX-XXX-XXXX.
* __formatTime__(seconds:uint, useHours:Boolean = false):String  
[static] Formats seconds into an minutes:seconds format, optionally an hours:minutes:seconds format.
* __formatZip__(num:String):String  
[static] Returns a formatted zip code like XXXXX-XXXX.
* __leadingZeros__(num:int, length:uint):String  
[static] Returns a string representation of the integer with leading zeros equaling to a given length.
* __logObject__(obj:Object, name:String)  
[static] Logs the name of the object to the console, then line by line logs out each value within the object.
* __toDollars__(value:Number):String  
[static] Formats a number as a dollar amount, such at $1,000,000.49.
* __toTitleCase__(str:String):String  
[static] Formats a string in title case.
* __toUnicode__(str:String):String  
[static] Converts a string to unicode characters. 
* __validateCard__(num:String):String  
[static] Returns the name of the the credit card if valid.
* __validateEmail__(email:String):Boolean  
[static] Returns true if a valid email, false if not. Is it perfect? No. Good enough? Yes.
* __validateExpiration__(date:String):Object  
[static] Returns an object containing the month and year of the date if it is a valid experiation date in the future.

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
* __autoAlpha__(elements:*, value:Number)  
[static] Accepts either a single element, array of elements, or node list and sets the opacity, while also setting visibility to hidden if at 0. 
* __bind__(functions:Array, obj:Object, ...args:*)  
[static] Loops through an array of function names as strings, finds them on the object, and replaces them with versions which are bound to the object, with any additional parameters provided. Useful in writing object-oriented JavaScript on a class where you can with one line write `Utils.bind(["play", "stop", "resize"], this);` rather than `this.play.bind(this); this.stop.bind(this); this.resize.bind(this);`
* __browser__():Object  
[static] Returns an object which contains information on the browser name, version and vendor prefix; and whether the browser is webkit, phone, tablet, mobile, iOS, or Android.  
* __bubbleSort__(array:Array, compare:function):Array  
[static] Sorts an array and returns the results specifically using the bubble sort method.  
* __compare__(a:Object, b:Object)  
[static] Accepts two objects to compare similarity.  
* __css__(elements:*, props:Object)  
[static] Accepts either a single element, array of elements, or node list and applies all style properties contained in props to them.  
* __duplicate__(obj:Object)  
[static] Accepts and object and returns a duplicate.  
* __getStyle__(element:Element, property:String):String  
[static] First looks for the element’s style on it’s style object, if not there, looks to the window.getComputedStyle of the element.  
* __getMatrixStyle__(element:Element, axis:String):Number  
[static] Returns a number representing an elements transform on a specified axis.  
* __getURLVars__():Object  
[static] Returns an object with all current url variables.  
* __hasClass__(elements:*, className:String):Boolean  
[static] Accepts either a single element, array of elements, or node list and looks through all of them and returns if one of them has that class or not.  
* __loadBigImages__(parent:Element)  
[static] Accepts either single element, and searches within it, and including it, for elements with a “data-background-image” or “data-src” attribute and applies that to the image, then deletes the data attribute. Good for loading large images below the fold after the entire page has loaded, or loading in all the images of a slideshow only when it gets activated.  
* __merge__(newObject:Object, oldObject:Object, copy:Boolean = false):Object  
[static] Merges one object onto another and returns the result.  
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