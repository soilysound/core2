;define('callfn', ['underscore'], function(_) {

  "use strict";

  var Exports = {

    init: function(){

      this.scan();
      this.scanUsingAnimationEvent();
    },

    runFunction: function(element){

      // get dataset object from element
      var data = element.dataset;

      // if there's no function named, bail out
      if(!data.fn){

        return false;

      }

      var functionName = data.fn;

      // @TODO - the dataset polyfill doesnt work in safari
      // @TODO - convert string yes/no to booleons?
      // @TODO - convert string numbers into numbers?

      // call require module matching function name
      require([functionName], function(Foobar){

        // create instance of function
        var instance = new Foobar();

        // call function and pass through the dom elemend and the dataset object
        instance.init(element, data);

        // remove the callfn class to prevent it getting called again
        element.classList.remove('callfn');

      });
      
    },

    scan: function(){

      // get elements from page
      var callfn = document.querySelectorAll('.callfn');

      var self = this;

      _.each(callfn, function(element){

        // if the element is visible, call the function
        // if the browser is not css animations capable, then call the function as:
        // we may be using css animations to call elements that are not initially visible
        
        if(element.offsetWidth || SKY_SPORTS.hasFeature.cssAnimations === false){
          self.runFunction(element);
        }

      });


    },

    // listen for new callfns appearing on the page by using the css animation start event
    scanUsingAnimationEvent: function(){

      document.addEventListener(SKY_SPORTS.hasFeature.animationEvent, function(e){

        if(e.animationName === 'callfn'){

          this.runFunction(e.target);

        }

      }.bind(this), false);

      // now we have our event listen set up, add the animation css to the callfn elements
      SKY_SPORTS.addCss('callfn', '.callfn {-webkit-animation:callfn 0.01s;-moz-animation:callfn 0.01s;animation:callfn 0.01s;}', false);

    },

    extend: function(props){

      function Foobar(){}

      Foobar.prototype = props;

      return Foobar;

    }
  };

  return Exports;

});


// define('callfn', [], function(){

//   "use strict";

//   return {

//     cssAnimations: SKY_SPORTS.hasFeature.animationEvent,

//     init: function(){

//       // if we have css animations, add animation event listener
//       if(this.cssAnimations){
//         this.animationEventScan();
//       }

//       // if not - mainly IE8 and 9, then run a scan on an interval
//       else {

//         //do a sweep of the page straight away
//         this.scanPage();

//           // document.addEventListener('breakPointChange', function(){

//           //   scanCallFn();

//           // }, false);
        
//         // and run a scan every 1.5 seconds
//         this.intervalScan();
//       }
//     },

//     scanPage: function(){

//       var callFn = document.querySelectorAll('.callfn');

//       for(var i = -1;++i<callFn.length;){

//         var item = callFn[i];

//         //check whether the div with the callfn class is visible
//         if(item.offsetWidth){
//           this.runFunction(callFn[i]);
//         }

//       }
//     },

//     runFunction: function(element){

//       var data = element.dataset;

//       // if there's no function named, bail out
//       if(!data.fn){
//         return false;
//       }

//       var funcName = data.fn;

//       //@TODO - the dataset polyfill doesnt work in safari

//       require([funcName], function(Foobar){

//         //if foobar is a function constructor
//         var instance = new Foobar();
//         instance.init(element, data);

//       });

//       element.classList.remove('callfn');
      
//     },

//     intervalScan: function(){

//       setInterval(function(){

//         this.scanPage();

//       }.bind(this), 1500);
//     },

//     animationEventScan: function(){

//       document.addEventListener(SKY_SPORTS.hasFeature.animationEvent, function(e){

//         if(e.animationName === 'callfn'){

//           this.runFunction(e.target);

//         }
//       }.bind(this), false);

//       // now we have our event listen set up, add the animation css to the callfn elements
//       SKY_SPORTS.addCss('callfn', '.callfn {-webkit-animation:callfn 0.01s;-moz-animation:callfn 0.01s;animation:callfn 0.01s;}', false);

//     }

//   };

// });

//   /**
//  * Simple wrapper to load require modules from html markup
//  */

// (function(){

//   "use strict";

//   var cssAnimations = SKY_SPORTS.hasFeature.animationEvent;
//   // var cssAnimations = false;

//   //listen for elements added to the page with animation start
//   if(cssAnimations){

//     document.addEventListener(SKY_SPORTS.hasFeature.animationEvent, function(e){

//       if(e.animationName === 'callfn'){

//         getCallFn(e.target);

//       }
//     }, false);

//     //now we have our event listen set up, add the animation css to the callfn elements
//     SKY_SPORTS.addCss('callfn', '.callfn {-webkit-animation:callfn 0.01s;-moz-animation:callfn 0.01s;animation:callfn 0.01s;}', false);

//   }

//   else {

//     scanCallFn();

//     document.addEventListener('breakPointChange', function(){

//       scanCallFn();

//     }, false);

//     scheduledScan();


//   }

//   /**
//    * For non css animation supporting browsers, schedule a regular 1 second scan of the page
//    */
//   function scheduledScan(){

//     setInterval(function(){

//       scanCallFn();

//     }, 1500);

//   }

//   function scanCallFn(){

//     //scan the page
//     var callFn = document.querySelectorAll('.callfn');

//     for(var i = -1;++i<callFn.length;){

//       var item = callFn[i];

//       //check whether the div with the callfn class is visible
//       if(item.offsetWidth){
//         getCallFn(callFn[i]);
//       }

//     }
//   }


//   function getCallFn(el){

//     //if element has callfn attached, grab the data attributes and call the corrosponding requite plugin
//       var func = el.dataset;

//       //turn true and false strings into booleans


//       if(!func.fn){
//         return false;
//       }

//       var funcName = func.fn;

//       //@TODO - the dataset polyfill doesnt work in safari

//       if(funcName){

//         require([funcName], function(Foobar){

//           //if foobar is a function constructor
//           var instance = new Foobar();
//           instance.init(el, func);

//         });

//         el.classList.remove('callfn');
//       }

//   }


// })();
