if(!window['console']) {
  window.console = {};
}

(function() {
  var noOp = function() {};
  var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
  var len = methods.length;
  var i = 0;

  do {
    if(typeof console[methods[i]] !== 'function') {
      console[methods[i]] = noOp;
    }
    i++;
  } while (i < len);
})();