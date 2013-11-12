/**
 * Simple wrapper to load require modules from html markup
 */

(function(){

  //listen for elements added to the page with animation start
  document.addEventListener('webkitAnimationStart', function(e){

    if(e.animationName === 'callfn'){

      //if element has callfn attached, grab the data attributes and call the corrosponding requite plugin
      var el = e.target;
      var func = el.dataset;
      var funcName = func.fn;

      //@NOTE - the dataset polyfill doesnt work in safari 5

      if(funcName){

        require(['adaptive-html'], function(Foobar){

          //if foobar is a function constructor
          if(typeof Foobar === 'function'){
            var instance = new Foobar();
            instance.init(el, func);
          }
          //else its a standard object
          else {
            Foobar.init();
          }
        });

        el.classList.remove('callfn');
      }
    }
  }, false);

  //now we have our event listen set up, add the animation css to the callfn elements
  SKY_SPORTS.addCss('callfn', '.callfn {-webkit-animation:callfn 0.01s;}', false);


  //@TODO - implement timer approach for non supporting browsers

	// var functions = document.getElementsByClassName('callfn');

 //  function scan(){

 //    for(var i = -1;++i<functions.length;){

 //      var el = functions[i];
 //      var func = el.dataset;
 //      var funcName = func.fn;

 //      if(funcName){

 //        require([funcName], function(foobar){
 //          //if foobar is a function constructor
 //          if(typeof foobar === 'function'){
 //            var instance = new foobar();
 //            instance.init(el, func);
 //          }

 //          else {
 //            foobar.init();
 //          }
 //        });

 //        el.classList.remove('callfn');
 //      }
 //    }

 //    setTimeout(function(){

 //      window.requestAnimationFrame(scan);

 //    }, 1000);
 //  }

 //  scan();


})();
