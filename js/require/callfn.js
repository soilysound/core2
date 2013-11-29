/**
 * Simple wrapper to load require modules from html markup
 */

(function(){

  "use strict";

  var cssAnimations = SKY_SPORTS.hasFeature.animationEvent;

  //listen for elements added to the page with animation start
  if(cssAnimations){
    console.log('css');
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


  }

  function scanCallFn(){
    console.log('loop');
    //scan the page
    var callFn = document.querySelectorAll('.callfn');

    for(var i = -1;++i<callFn.length;){

       getCallFn(callFn[i]);

    }
  }


  function getCallFn(el){

    //if element has callfn attached, grab the data attributes and call the corrosponding requite plugin
      var func = el.dataset;

      if(!el.dataset){
        return false;
      }

      var funcName = func.fn;

      //@NOTE - the dataset polyfill doesnt work in safari

      if(funcName){

        require([funcName], function(Foobar){

          //if foobar is a function constructor
          if(typeof Foobar === 'function'){
            var instance = new Foobar();
            instance.init(el, func);
          }
          //else its a standard object
          else {
            Foobar.init(el, func);
          }
        });

        el.classList.remove('callfn');
      }

  }


})();
