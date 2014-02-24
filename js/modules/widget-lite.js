;define('widget-lite', ['underscore'], function(_) {

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

        // call function and pass through the dom element and the dataset object
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

      // add the animation css to the callfn elements
      //SKY_SPORTS.addCss('callfn', '.callfn {-webkit-animation:callfn 0.01s;-moz-animation:callfn 0.01s;animation:callfn 0.01s;}', false);

      // then add the event listener, so it doesnt get run on first load
      document.addEventListener(SKY_SPORTS.hasFeature.animationEvent, function(e){

        if(e.animationName === 'callfn'){
          this.runFunction(e.target);
        }

      }.bind(this), false);

    },

    extend: function(props){

      function Foobar(){}

      Foobar.prototype = props;

      return Foobar;

    }
  };

  return Exports;

});
