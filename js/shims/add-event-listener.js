// addEventListener polyfill IE6+
!window.addEventListener && (function (window, document) {

  function EventListener(e, element) {

    var instance = this;

    for (property in e) {
      instance[property] = e[property];
    }

    instance.currentTarget =  element;
    instance.target = e.srcElement || element;
    instance.timeStamp = +new Date;

    instance.preventDefault = function () {
      e.returnValue = false;
    };

    instance.stopPropagation = function () {
      e.cancelBubble = true;
    };

  }

  function addEventListener(type, listener) {

    var element = this,
    listeners = element.listeners = element.listeners || [],
    index = listeners.push([listener, function (e) {
      listener.call(element, new EventListener(e, element));
    }]) - 1;

    element.attachEvent('on' + type, listeners[index][1]);
  }

  function removeEventListener(type, listener) {

    for (var element = this, listeners = element.listeners || [], length = listeners.length, index = 0; index < length; ++index) {
      if (listeners[index][0] === listener) {
        element.detachEvent('on' + type, listeners[index][1]);
      }
    }
  }

  window.addEventListener = document.addEventListener = addEventListener;
  window.removeEventListener = document.removeEventListener = removeEventListener;

  Element.prototype.addEventListener    = addEventListener;
  Element.prototype.removeEventListener = removeEventListener;

  //add preventDefault and stopPropagation to the event object for IE8
  Event.prototype.preventDefault = function() { if (this.cancelable !== false) { this.returnValue = false; } };
  Event.prototype.stopPropagation = function() { this.cancelBubble = true; };

})(window, document);


