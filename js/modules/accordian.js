define('accordian',[], function(){

  "use strict";

  function exports(){}

  exports.prototype = {

    /**
    * Initiate the accordina module
    * @param  {Node}  element  Dom node of module root
    * @param  {Object} data Object of module paramters set from HTML data-attributes
    */
    init: function(element, data){
      element.addEventListener('click', function(){

        alert(1);
        
      }, false);
    }

  };

  return exports;

});
