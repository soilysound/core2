String.prototype.toDash = function(){
	return this.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
};

String.prototype.toCamel = function(){
	return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};;/**
 * ADD CSS
 *
 * Dynamically set a css string
 * Allows the set css values to be persistent using localstorage
 */

;(function(window, document){

	window.SKY_SPORTS = window.SKY_SPORTS || {};

	var cssRules = {};
	var persistedRules = {};

	//get existing persistent rules
	
	if(window.localStorage.getItem('jscss')){

		cssRules = JSON.parse( window.localStorage.getItem('jscss') );
		persistedRules = JSON.parse( window.localStorage.getItem('jscss') );
	}

	//create and add style tag
	var style = document.createElement('style');
	style.id = "jscss";
	document.getElementsByTagName('head')[0].appendChild(style);

	/**
	 * Add a css string to the page head
	 * @param {string} id			unique id for css string
	 * @param {string} css string	css values to add
	 * @param {boolean} persist		set true to persist values in localstorage
	 */
	
	function addCss(id, cssString, persist){

		if(id in cssRules === false || cssRules[id] !== cssString){

			cssRules[id] = cssString;

			if(persist === true){
				alert('persist');
				persistedRules[id] = cssString;
			}
			console.log(cssRules, persistedRules);
			writeCss();

		}
	}

	/**
	 * Remove css by id reference
	 * @param  {string}		id id of css string	
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
		style.styleSheet ? style.styleSheet = css : style.innerHTML = css;
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
	window.addEventListener('beforeunload', function(){

		window.localStorage.setItem('jscss', JSON.stringify(persistedRules));

	}, false);

	//write any persistent styles on page load
	writeCss();

	//expose functions
	SKY_SPORTS.addCss = addCss;
	SKY_SPORTS.removeCss = removeCss;

})(window, document);;/**
 * DEVICE
 * 
 * Gather information about the users device
 * Sets the browser or device and version if relevent
 * Test for pertinent browser features
 * Exposes the current css breakpoint
 */

(function(window, document){

	window.SKY_SPORTS = {};

	var docEl = document.documentElement;

	//feature detection
	function feature(){

		var shim = document.createElement('shim');

		shim.style.cssText = 'width:10vw;-webkit-animation-name:xxx;-moz-animation-name:xxx;animation-name:xxx;-webkit-appearance:none';

		return {
			viewportUnits: !!shim.style.width,
			cssAnimations: !!(shim.style.animationName || shim.style.webkitAnimationName || shim.style.mozAnimationName),
			touch:('ontouchstart' in window) || ('DocumentTouch' in window) && document instanceof window.documentumentTouch
		};
	
	}

	//get device
	function getDevice(){

		var ua = navigator.userAgent;

		var isIE = /*@cc_on (function() {switch(@_jscript_version) {case 5.7: return 7; case 5.8: return 8; case 9: return 9; case 10: return 10;}})() || @*/ 0;
		var isChrome = !!window.chrome;
		var isFirefox = ua.match(/firefox/i);
		var isSafari = ua.match(/safari/i);
		var isIpad = ua.match(/iPad/);
		var isIphone = ua.match(/iP/);
		var isAndroid = ua.match(/android/i);

		if (isIE){

			return {
				msie:true,
				version:isIE
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

	}

	function getBreakPoint(){

		var bp = window.getComputedStyle(document.head, null).getPropertyValue('font-family');
		bp = parseInt(bp.replace(/['"]/g, ''), 10);

		SKY_SPORTS.isBreakPoint = bp;

		docEl.id = ('is-breakpoint-' + bp);

		return bp;
	}


	if(window.addEventListener){

		getBreakPoint();

		window.addEventListener('resize', function(){

			getBreakPoint();

		}, false);
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

		docEl.classList.add(SKY_SPORTS.hasFeature[item] === true ? item.toDash() : 'no-' + item.toDash());
	}


})(window, document);

