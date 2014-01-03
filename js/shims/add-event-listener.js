//addEventListener polyfill 1.0 / Eirik Backer / MIT Licence
(function(win, doc){

  "use strict";

	if(win.addEventListener){
    return;
  }

	function addEvent(on, fn, self){
		return (self = this).attachEvent('on' + on, function(e){
			var e = e || win.event;
			fn.call(self, e);
		});
	}

	function addListen(obj, i){

		if(i = obj.length){
      while(i--){
        obj[i].addEventListener = addEvent;
      }
    }
		else {
      obj.addEventListener = addEvent;
    }

		return obj;
	}

	addListen([doc, win]);

	if('Element' in win){
    win.Element.prototype.addEventListener = addEvent;
  }

  // add preventDefault and stopProgation to the Event object
  Event.prototype.preventDefault = function() { if (this.cancelable !== false) { this.returnValue = false; } };
  Event.prototype.stopPropagation = function() { this.cancelBubble = true; };

})(window, document);
