/**
 * BREAKPOINTS
 *
 * Sets the current breakpoint as a global variable 'document.currentBreakPoint'.
 * Creates an event listener for break point changes 'breakPointChange'.
*/

(function(window, document){

  'use strict';

  function getBreakPoint(){

    //read current break point from css
    var bp = window.getComputedStyle(document.head, null).getPropertyValue('font-family');
    bp = parseInt(bp.replace(/['"]/g, ''), 10);

    return bp;
  }

  //throttle function to prevent window.onresize calling too frequently
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


  function dispatchEvent(){
    console.log('uses match media listener');
    document.dispatchEvent(bpEvent);

  }


  if(window.addEventListener){

    /**
     * Use 2 methods for getting media query feedback -
     * 1 - If available, use the native matchMedia addListener callback
     * 2 - Else read the media query from the css
     */

    //create custom event
    var bpEvent = document.createEvent('Event');
    bpEvent.initEvent('breakPointChange', true, true);

    //set current breakpoint
    document.currentBreakPoint = getBreakPoint();

    /* 1 */
    if(window.matchMedia && window.matchMedia('all').addListener){

      //bp30
      window.matchMedia('(max-width:600px)').addListener(function(query){

        if(query.matches){
          document.currentBreakPoint = 30;
          window.requestAnimationFrame(dispatchEvent);
        }

      });

      //bp20
      window.matchMedia('(min-width:601px) and (max-width:800px)').addListener(function(query){

        if(query.matches){
          document.currentBreakPoint = 20;
          window.requestAnimationFrame(dispatchEvent);
        }

      });

      //bp10
      window.matchMedia('(min-width:801px)').addListener(function(query){

        if(query.matches){
          document.currentBreakPoint = 10;
          window.requestAnimationFrame(dispatchEvent);
        }

      });

    }

    /* 2 */
    else {

      window.addEventListener('resize', throttle(function(){

        var currBP = getBreakPoint();

        //check if the breakpoint has changed and dispatch our custom event
        if(currBP !== document.currentBreakPoint) {

          document.currentBreakPoint = currBP;
          console.log('uses resize event');
          //trigger our custom event listener to fire
          document.dispatchEvent(bpEvent);
        }

      }, 300), false);
    }

  }


})(window, document);


