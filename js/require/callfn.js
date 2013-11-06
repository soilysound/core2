/**
 * Simple wrapper to load require modules from html markup
 */

(function(){

	var functions = document.getElementsByClassName('callfn');

  function scan(){

    for(var i = -1;++i<functions.length;){

      var el = functions[i];
      var func = el.dataset;
      var funcName = func.fn;

      if(funcName){
        
        require([funcName], function(foobar){
          foobar.init(el, func);
        })

        el.classList.remove('callfn');
      }
    }

    setTimeout(function(){

      window.requestAnimationFrame(scan);

    }, 1000);
  }

  scan();
	

})();