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

    document.documentElement.id = ('current-breakpoint-' + bp);

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

  //check for event listeners to avoid IE8 errors
  if(window.addEventListener){

    //create a custom breakpoint event
    var bpEvent = document.createEvent('Event');
    bpEvent.initEvent('breakPointChange', true, true);
    bpEvent.currentBreakPoint = getBreakPoint;

    //set current breakpoint on load
    document.currentBreakPoint = getBreakPoint();

    //add throttled resize listener to check current breakpoint
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

})(window, document);


