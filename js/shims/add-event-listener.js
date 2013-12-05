//addEventListener polyfill 1.0 / Eirik Backer / MIT Licence
(function(win, doc){

	if(win.addEventListener){
    return;
  }
 
	function addEvent(on, fn, self){
		return (self = this).attachEvent('on' + on, function(e){
			var e = e || win.event;
			e.preventDefault  = e.preventDefault  || function(){e.returnValue = false}
			e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true}
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
	
})(window, document);