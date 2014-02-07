// addEventListener polyfill IE6+
!window.addEventListener && (function (window, document) {

  function EventListener(e, element) {

    var instance = this;

    for (property in e) {
      instance[property] = e[property];
    }

    instance.currentTarget =  element;
    instance.target = e.srcElement || element;
    instance.timeStamp = +new Date;

    instance.preventDefault = function () {
      e.returnValue = false;
    };

    instance.stopPropagation = function () {
      e.cancelBubble = true;
    };

  }

  function addEventListener(type, listener) {

    var element = this,
    listeners = element.listeners = element.listeners || [],
    index = listeners.push([listener, function (e) {
      listener.call(element, new EventListener(e, element));
    }]) - 1;

    element.attachEvent('on' + type, listeners[index][1]);
  }

  function removeEventListener(type, listener) {

    for (var element = this, listeners = element.listeners || [], length = listeners.length, index = 0; index < length; ++index) {
      if (listeners[index][0] === listener) {
        element.detachEvent('on' + type, listeners[index][1]);
      }
    }
  }

  window.addEventListener = document.addEventListener = addEventListener;
  window.removeEventListener = document.removeEventListener = removeEventListener;

  Element.prototype.addEventListener    = addEventListener;
  Element.prototype.removeEventListener = removeEventListener;

  //add preventDefault and stopPropagation to the event object for IE8
  Event.prototype.preventDefault = function() { if (this.cancelable !== false) { this.returnValue = false; } };
  Event.prototype.stopPropagation = function() { this.cancelBubble = true; };

})(window, document);


;(function(){

  if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {

      "use strict";

      if (typeof this !== "function") {
        // closest thing possible to the ECMAScript 5 internal IsCallable function
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      }

      var aArgs = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP = function () {},
          fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
                                   ? this
                                   : oThis,
                                 aArgs.concat(Array.prototype.slice.call(arguments)));
          };

      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();

      return fBound;
    };
  }


})();
;/*
 * classList.js: Cross-browser full element.classList implementation.
 * 2012-11-15
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

if (typeof document !== "undefined" && !("classList" in document.createElement("a"))) {

(function (view) {

"use strict";

if (!('HTMLElement' in view) && !('Element' in view)) {
  return;
}

var classListProp = "classList",
protoProp = "prototype",
elemCtrProto = (view.HTMLElement || view.Element)[protoProp],
objCtr = Object,
strTrim = String[protoProp].trim || function () {
  return this.replace(/^\s+|\s+$/g, "");
},
arrIndexOf = Array[protoProp].indexOf || function (item) {
    var i = 0,
    len = this.length;
    for (; i < len; i++) {
      if (i in this && this[i] === item) {
        return i;
      }
    }
    return -1;
  },

  // Vendors: please allow content code to instantiate DOMExceptions
  DOMEx = function (type, message) {
    this.name = type;
    this.code = DOMException[type];
    this.message = message;
  },

  checkTokenAndGetIndex = function (classList, token) {
    if (token === "") {
      throw new DOMEx(
          "SYNTAX_ERR",
          "An invalid or illegal string was specified"
      );
    }
    if (/\s/.test(token)) {
      throw new DOMEx(
          "INVALID_CHARACTER_ERR",
          "String contains an invalid character"
      );
    }
    return arrIndexOf.call(classList, token);
  },
  ClassList = function (elem) {
    var trimmedClasses = strTrim.call(elem.className),
    classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
    i = 0,
    len = classes.length;

    for (; i < len; i++) {
      this.push(classes[i]);
    }
    this._updateClassName = function () {
      elem.className = this.toString();
    };
  },

  classListProto = ClassList[protoProp] = [],
  classListGetter = function () {
    return new ClassList(this);
  }
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
  return this[i] || null;
};
classListProto.contains = function (token) {
  token += "";
  return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
  var
      tokens = arguments,
      i = 0,
      l = tokens.length,
      token,
      updated = false
  ;
  do {
    token = tokens[i] + "";
    if (checkTokenAndGetIndex(this, token) === -1) {
      this.push(token);
      updated = true;
    }
  }
  while (++i < l);

  if (updated) {
    this._updateClassName();
  }
};
classListProto.remove = function () {
  var
      tokens = arguments,
      i = 0,
      l = tokens.length,
      token,
      updated = false
  ;
  do {
    token = tokens[i] + "";
    var index = checkTokenAndGetIndex(this, token);
    if (index !== -1) {
      this.splice(index, 1);
      updated = true;
    }
  }
  while (++i < l);

  if (updated) {
    this._updateClassName();
  }
};
classListProto.toggle = function (token, forse) {
  token += "";

  var result = this.contains(token),
  method = result ? forse !== true && "remove" : forse !== false && "add";

  if (method) {
    this[method](token);
  }

  return !result;
};

classListProto.toString = function () {
  return this.join(" ");
};

if (objCtr.defineProperty) {
  var classListPropDesc = {
      get: classListGetter,
      enumerable: true,
      configurable: true
  };
  try {
    objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
  } catch (ex) { // IE 8 doesn't support enumerable:true
    if (ex.number === -0x7FF5EC54) {
      classListPropDesc.enumerable = false;
      objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
    }
  }
} else if (objCtr[protoProp].__defineGetter__) {
  elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

}
;if(!window['console']) {
  window.console = {};
}

(function() {
  var noOp = function() {};
  var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
  var len = methods.length;
  var i = 0;

  do {
    if(typeof console[methods[i]] !== 'function') {
      console[methods[i]] = noOp;
    }
    i++;
  } while (i < len);
})();;String.prototype.toDash = function(){
	return this.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
};

String.prototype.toCamel = function(){
	return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};;(function(){

  "use strict";

  function supportDataSet(){
    var n = document.createElement("div");
    n.setAttribute("data-a-b", "c");
    return !!(n.dataset && n.dataset.aB === "c");
  }

  if(supportDataSet()){
    return;
  }

  function convert(string){
    return string.replace(/^data-/, '').replace(/-([a-z])/g, function (m, w) {
        return w.toUpperCase();
    });
  }

  Object.defineProperty(Element.prototype, 'dataset', {

    get: function(val){

      var dataset = {};
      var attrs = this.attributes;

      for (var i = 0; i < attrs.length; i++) {
        // Store reference to current attr
        var attr = attrs[i];
        // If attribute nodeName starts with 'data-'
        if (/^data-/.test(attr.nodeName)) {
          // Log its name (minus the 'data-' part), and its value
          dataset[convert(attr.nodeName)] = attr.nodeValue;
        }
      }

      return dataset;
    }

  });

})();
;if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement, fromIndex) {
    if ( this === undefined || this === null ) {
      throw new TypeError( '"this" is null or not defined' );
    }

    var length = this.length >>> 0; // Hack to convert object.length to a UInt32

    fromIndex = +fromIndex || 0;

    if (Math.abs(fromIndex) === Infinity) {
      fromIndex = 0;
    }

    if (fromIndex < 0) {
      fromIndex += length;
      if (fromIndex < 0) {
        fromIndex = 0;
      }
    }

    for (;fromIndex < length; fromIndex++) {
      if (this[fromIndex] === searchElement) {
        return fromIndex;
      }
    }

    return -1;
  };
}
;// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
  var lastTime = 0;
  var vendors = ['moz', 'webkit'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if(!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      },
      timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if(!window.cancelAnimationFrame){
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
}());;(function(){

  "use strict";

  var div = document.createElement('div');
  div.innerHTML = "text";

  if(div.textContent){
    return;
  }

  Object.defineProperty(Element.prototype, 'textContent', {

    get: function(){

      return this.innerText;

    },

    set: function(val){

      this.innerText = val;
    }

  });


})();


;/**
 * ADD CSS
 *
 * Dynamically set a css string
 * Allows the set css values to be persistent using localstorage
 */

;(function(window, document){

    window.SKY_SPORTS = window.SKY_SPORTS || {};

    var cssRules = {};

    //get existing persistent rules
    if(window.localStorage.getItem('cssjs')){
      cssRules = JSON.parse( window.localStorage.getItem('cssjs') );
    }

    //create and add style tag
    var style = document.createElement('style');
    style.id = "cssjs";
    document.getElementsByTagName('head')[0].appendChild(style);

    /**
    * Add a css string to the page head
    * @param {string} id      unique id for css string
    * @param {string} css string  css values to add
    * @param {boolean} persist    set true to persist values in localstorage
    */

    function addCss(id, cssString, persist){

      if(id in cssRules === false || cssRules[id] !== cssString){

        cssRules[id] = cssString;
        writeCss();

      }
    }

    /**
    * Remove css by id reference
    * @param  {string}    id id of css string
    */

    function removeCss(id){

      if(id in cssRules){

        delete cssRules[id];
      }

      writeCss();
    }

    /**
    * Write the css string into the style tag
    */

    function writeCss(){

      var css = createCssString();

      if(style.styleSheet){
        style.styleSheet.cssText = css;
      }
      else {
        style.textContent = css;
      }
    }


    /**
    * parses an object of css strings into 1 string
    * @return {string} css string
    */

    function createCssString(){

      var css = '';

      for (var id in cssRules){

        css += cssRules[id];
      }

      return css;
    }

    //write any persistent rules to localstorage as the page unloads
    window.onbeforeunload =  function(){
      //@TODO - this doesnt work properly
      //window.localStorage.setItem('jscss', JSON.stringify(persistedRules));

    };

    //write any persistent styles on page load
    writeCss();

    //expose functions
    window.SKY_SPORTS.addCss = addCss;
    window.SKY_SPORTS.removeCss = removeCss;

})(window, document);
;/**
 * BREAKPOINTS
 *
 * Sets the current breakpoint as a global variable 'document.currentBreakPoint'.
 * Creates an event listener for break point changes 'breakPointChange'.
*/

(function(window, document){

  'use strict';

  // set a default breakpoint
  document.currentBreakPoint = 10;

  /**
   * return the current css breakpoint
   * @return {number} 10 = desktop, 20 = tablet, 30 = mobile
   */
  function getBreakPoint(){

    //read current break point from css
    var bp = window.getComputedStyle(document.head, null).getPropertyValue('font-family');
    bp = parseInt(bp.replace(/['"]/g, ''), 10);

    return bp;
  }

  /**
   * Throttle a function so it doesnt run too often
   * @param  {Function} fn   function to run
   * @param  {Number}   time throttle time
   */
  function throttle(fn, time) {

    var handle;

    function throttled() {

      var args,
      context;

      if(!handle) {
        args = arguments;
        context = this;
        handle = setTimeout(execute, time);
      }

      function execute() {
        handle = null;
        fn.apply(context, args);
      }
    }

    return throttled;
  }

  /**
   * Function to run in the request animation frame
   */
  function dispatchEvent(){

    //dispatch our custom breakpoint event
    document.dispatchEvent(bpEvent);
  }


  if(document.createEvent){

    /**
     * Use 2 methods for getting media query feedback -
     * 1 - If available, use the native matchMedia addListener callback
     * 2 - Else read the media query from the css
     */

    //create custom event
    var bpEvent = document.createEvent('Event');
    bpEvent.initEvent('breakPointChange', true, true);

    /**
     * set current breakpoint
     * - using a requestAnimation frame here as this seems to alleviate an initial false result in IE10/11
     */
    window.requestAnimationFrame(function(){
      document.currentBreakPoint = getBreakPoint();
    });


    /* 1 - use match media listeners */
    if(window.matchMedia && window.matchMedia('all').addListener){

      //bp30
      var mql30 = window.matchMedia('(max-width:600px)');
      mql30.addListener(function(query){
        if(query.matches){
          document.currentBreakPoint = 30;
          dispatchEvent();
        }

      });

      //bp20
      var mql20 = window.matchMedia('(min-width:601px) and (max-width:800px)');
      mql20.addListener(function(query){
        if(query.matches){
          document.currentBreakPoint = 20;
          dispatchEvent();
        }

      });

      //bp10
      var mql10 = window.matchMedia('(min-width:801px) and (max-width:1164px)');
      mql10.addListener(function(query){
        if(query.matches){
          document.currentBreakPoint = 10;
          dispatchEvent();
        }

      });

      //bp5
      var mql5 = window.matchMedia('(min-width:1165px)');
      mql5.addListener(function(query){
        if(query.matches){
          document.currentBreakPoint = 5;
          dispatchEvent();
        }

      });

    }

    /* 2 - use a throttled resize event */
    else {

      window.addEventListener('resize', throttle(function(){

        var currBP = getBreakPoint();

        //check if the breakpoint has changed and dispatch our custom event
        if(currBP !== document.currentBreakPoint) {

          document.currentBreakPoint = currBP;

          //trigger our custom event listener to fire
          document.dispatchEvent(bpEvent);
        }

      }, 300), false);
    }

  }


})(window, document);


;/**
 * DEVICE
 *
 * Gather information about the users device
 * Sets the browser or device and version if relevent
 * Test for pertinent browser features
 * Exposes the current css breakpoint
*/

(function(window, document){

	window.SKY_SPORTS = window.SKY_SPORTS || {};

	var docEl = document.documentElement;

	//feature detection
	function feature(){

		var shim = document.createElement('shim');

		shim.style.cssText = 'width:10vw;-webkit-animation-name:xxx;-moz-animation-name:xxx;animation-name:xxx;-webkit-appearance:none';

    //determine correct js animation start event name
		var animationCandidates = {
      'webkitAnimation':'webkitAnimationStart',
      'mozAnimation':'mozAnimationStart',
      'animation':'animationstart',
      'msAnimation':'MSAnimationStart'
    };

    //create shim element
    var animationEventName = false;

    //test animation name candidates in shim element and set transitionPrefix to the match
    for(var property in animationCandidates) {
      if(property in shim.style){
        animationEventName = animationCandidates[property];
      }
    }

		return {
			viewportUnits: !!shim.style.width,
			cssAnimations: !!(shim.style.animationName || shim.style.webkitAnimationName || shim.style.mozAnimationName),
			touch:('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0),
      animationEvent:animationEventName
    };
  }

	//get device
	function getDevice(){

		var ua = navigator.userAgent;

		var isIE = (function() { if (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) !== null) {
			return parseFloat( RegExp.$1 ); } else { return false;}
		})();

		var isChrome = !!window.chrome;
		var isFirefox = ua.match(/firefox/i);
		var isSafari = ua.match(/safari/i);
		var isIpad = ua.match(/iPad/);
		var isIphone = ua.match(/iP/);
		var isAndroid = ua.match(/android/i);

		if (isIE){

			return {
				msie:true,
				version:isIE,
				//legacy ie is IE versions < 10
				legacyie:isIE < 10
			};
		}

		if (isIpad){

			return {
				ipad:true,
				ios: true,
				mobile: true,
				version:6
			};
		}

		if (isIphone){

			return {
				iphone:true,
				ios: true,
				mobile: true,
				version:6
			};
		}

		if (isAndroid){

			return {
				android:true,
				mobile:true
			};
		}

		if (isChrome){

			return {
				chrome: true
			};
		}

		if (isFirefox){

			return {
				firefox: true
			};
		}

		if (isSafari){

			return {
				safari: true
			};
		}

		return {
			
		}

	}

	SKY_SPORTS.hasFeature = feature();
	SKY_SPORTS.isDevice = getDevice();

	for(var device in SKY_SPORTS.isDevice){

		if(device === 'version'){
			docEl.classList.add('version-' + SKY_SPORTS.isDevice[device]);
		}
		else {
			docEl.classList.add(device);
		}
	}

	for(var item in SKY_SPORTS.hasFeature){

		docEl.classList.add(!!SKY_SPORTS.hasFeature[item] ? item.toDash() : 'no-' + item.toDash());
	}


})(window, document);

;(function(window, document){

  //@TODO - change the references to images to just 'elements' since this works with both
  //
  'use strict';

  //the amount of leeway to give the viewport before it regards an image is out of view
  // eg -100 means it will only regard it as not in viewport if its more than 100px out of the viewport
  var tolerance = -100;

  /**
   * Get a *live* node list of images - the browser can automatically update this list for us
   */
  var images = document.getElementsByClassName ? document.getElementsByClassName('postpone-load') : document.getElementsByTagName('img');

  /**
   * Check if image is out of the viewport
   */
  function outOfView(image){

    var coords = image.getBoundingClientRect();
    return !(coords.top + coords.height > tolerance) || !(window.innerHeight - coords.top > tolerance) || !(coords.left + coords.width > 0) || !(window.innerWidth - coords.left > 0);

  }

  function loadImage(){
    this.classList.remove('postpone-load');
  }

  function swapSrc(src, lookup){
    //get token and replace with correct size for this breakpoint
    var match = (/#\{(.+)\}/).exec(src),
    bp;

    if(match){
      bp = parseInt(match[1], 10);
      match = match[0];


      if(document.currentBreakPoint > bp){
        src = src.replace(match, document.currentBreakPoint);
      }

      else {
        src = src.replace(match, bp);
      }

    }
    return src;
  }

  /**
   * Scan list of images and load if in view
   */
  function scan(){

    for(var i = -1;++i<images.length;){

      var image = images[i];

      //determine whether its a lazy module rather than an image
      var isLazyModule;// = !image.nodeName.match(/img/g);

      //check if image is out of view, if not then swap src and remove from loop
      if(outOfView(image)){
        continue;
      }

      if(isLazyModule){
        image.classList.remove('postpone-load');
        image.classList.add('callfn');
        continue;
      }

      //its an image, so get image attributes
      var attrs = image.dataset;
      var src = attrs.imageSrc;
      console.log(src);
      //if the image has no data-image then remove from loop and skip
      if(!src){
        image.classList.remove('postpone-load');
        continue;
      }

      else {

        // use 3 methods to ensure onload is called in the various scenarios/browsers
        image.onload = loadImage;
        // //image.onerror = errorImage;
        // image.naturalWidth > 0 && loadImage.call(image);
        // image.readyState === 'complete' && loadImage.call(image);
        image.src = swapSrc(src, attrs.lookup);
      }
    }

    window.setTimeout(function(){
      window.requestAnimationFrame(scan);
    }, 1000);
  }

  scan();


})(window, document);
