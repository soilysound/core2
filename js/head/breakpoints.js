/**
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


  if(window.addEventListener){

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
      var mql10 = window.matchMedia('(min-width:801px)');
      mql10.addListener(function(query){
        if(query.matches){
          document.currentBreakPoint = 10;
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


