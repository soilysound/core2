/**
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

		return {
			viewportUnits: !!shim.style.width,
			cssAnimations: !!(shim.style.animationName || shim.style.webkitAnimationName || shim.style.mozAnimationName),
			touch:('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
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

