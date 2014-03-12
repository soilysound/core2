define('delegate-matches', [], function(){

  "use strict";

  // eventTarget is the event.target dom node passed through from the eventlistener
  // selector is a css selector string
  function delegate(eventTarget, selector){

    var matchesSelector =
    eventTarget.matches ||
    eventTarget.webkitMatchesSelector ||
    eventTarget.mozMatchesSelector ||
    eventTarget.msMatchesSelector ||
    //a matches selector shim for IE8
    function (selector){

      var elems = this.parentNode.querySelectorAll(selector);
      var count = elems.length;

      for (var i = 0; i < count; i++) {
        if (elems[i] === this) {
          return true;
        }
      }

      return false;

    };

    // loop up the dom tree from the event.target and look for matches to the specified selector
    while (eventTarget && eventTarget !== document) {
      
      if (matchesSelector.call(eventTarget, selector)) {
        return true;
      }
      else {
        eventTarget = eventTarget.parentNode;
      }
    }

    return false;

  }

  return delegate;

});
