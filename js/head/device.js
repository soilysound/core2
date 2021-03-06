(function(window, document){

	window.SKY_SPORTS = window.SKY_SPORTS || {};

	function getUa(ua){

    function version(regex){

      return parseFloat(ua.match(regex)[1]);
    }

    // get IE version
    var isIE = (function() { if (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) !== null) {
      return parseFloat( RegExp.$1 ); } else { return false;}
    })();

    // IE11 and above
    var ie11Plus = ua.match(/rv\:([1-9][1-9]\.[0-9])/);
    if(ie11Plus){
      isIE = parseFloat(ie11Plus[1]);
    }

    // get mobile browsers
    var isIpad = ua.match(/iPad/);
    var isIphone = ua.match(/iP/);
    var isAndroid = ua.match(/android/i);
    var isWindowsPhone = ua.match(/windows phone/i);
    var o = {classList: ''};
    
    if(isWindowsPhone){

      o = {
        mobile: true,
        windowsphone: true,
        name: 'windowsphone',
        version: version(/os ([0-9]\.[0-9])/i)
      };

      o.classList = [o.name, o.name + o.version, 'mobile'].join(' ');
      return o;
    
    }

    if (isIE){

      o = {
        msie: true,
        name: 'msie',
        version: isIE
      };

      o.classList = [o.name, o.name + o.version].join(' ');
      return o;
    
    }

    if (isIpad || isIphone){

      o = {
        ios: true,
        name: 'ios',
        device: !!isIpad ? 'ipad' : 'iphone',
        mobile: true,
        version: version(/version\/([1-9]\.[0-9])/i)
      };

      o.classList = [o.name, o.name + o.version, o.device, 'mobile'].join(' ');
      return o;
    
    }


    if (isAndroid){

      o = {
        android: true,
        name: 'android',
        mobile: true,
        version: version(/version\/([1-9]\.[0-9])/i)
      };

      o.classList = [o.name, o.name + o.version, 'mobile'].join(' ');
      return o;
    }

  return o;

}


function featureDetect(deviceOb, shim){


  function parse(feature, isPresent){

    deviceOb.classList += isPresent ? ' ' + feature : ' no-' + feature;
    return isPresent;
  }

  // add some styles representing the features we're testing for
  shim.style.cssText = "-webkit-animation-name:shim;animation-name:shim;-moz-animation-name:shim;width:10vw";

  // touch screen
  deviceOb.hasTouch = parse('touch', ('ontouchstart' in window) || ('DocumentTouch' in window) && doc instanceof window.DocumentTouch);

  // svg
  deviceOb.hasSvg = parse('svg', !!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));

  // css animations
  deviceOb.hasCssAnimations = parse('cssanimations', !!(shim.style.animationName || shim.style.webkitAnimationName || shim.style.mozAnimationName));

  // viewport units
  deviceOb.hasVpUnits = parse('vpunits', !!shim.style.width);

  //determine correct js animation start event name
  var animationCandidates = {
    'webkitAnimation':'webkitAnimationStart',
    'mozAnimation':'mozAnimationStart',
    'animation':'animationstart',
    'msAnimation':'MSAnimationStart'
  };

  var animationEventName = false;

  //test animation name candidates in shim element and set transitionPrefix to the match
  for(var property in animationCandidates) {
    if(property in shim.style){
      deviceOb.animationEventName = animationCandidates[property];
    }
  }

  return deviceOb;

}

// create device object populated with us details
var device = getUa(navigator.userAgent);

// add feature details to device object
var features = featureDetect(device, document.createElement('div'));

// add classList to html tag
document.documentElement.className = device.classList;


SKY_SPORTS.device = device;

})(window, document);

