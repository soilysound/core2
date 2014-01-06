/**
 * Simple wrapper to load require modules from html markup
 */

(function(){

  "use strict";

  var cssAnimations = SKY_SPORTS.hasFeature.animationEvent;
  // var cssAnimations = false;

  //listen for elements added to the page with animation start
  if(cssAnimations){

    document.addEventListener(SKY_SPORTS.hasFeature.animationEvent, function(e){

      if(e.animationName === 'callfn'){

        getCallFn(e.target);

      }
    }, false);

    //now we have our event listen set up, add the animation css to the callfn elements
    SKY_SPORTS.addCss('callfn', '.callfn {-webkit-animation:callfn 0.01s;-moz-animation:callfn 0.01s;animation:callfn 0.01s;}', false);

  }

  else {

    scanCallFn();

    document.addEventListener('breakPointChange', function(){

      scanCallFn();

    }, false);

    scheduledScan();


  }

  /**
   * For non css animation supporting browsers, schedule a regular 1 second scan of the page
   */
  function scheduledScan(){

    setInterval(function(){

      scanCallFn();

    }, 1000);

  }

  function scanCallFn(){

    //scan the page
    var callFn = document.querySelectorAll('.callfn');

    for(var i = -1;++i<callFn.length;){

      var item = callFn[i];

      //check whether the div with the callfn class is visible
      if(item.offsetWidth){
        getCallFn(callFn[i]);
      }

    }
  }


  function getCallFn(el){

    //if element has callfn attached, grab the data attributes and call the corrosponding requite plugin
      var func = el.dataset;

      //turn true and false strings into booleans


      if(!func.fn){
        return false;
      }

      var funcName = func.fn;

      //@TODO - the dataset polyfill doesnt work in safari

      if(funcName){

        require([funcName], function(Foobar){

          //if foobar is a function constructor
          var instance = new Foobar();
          instance.init(el, func);

        });

        el.classList.remove('callfn');
      }

  }


})();
