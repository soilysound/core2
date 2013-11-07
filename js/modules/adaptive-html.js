define(['adaptive-html', 'underscore'], function(adaptiveHTML, _){

  var exports = {

    bumSize:'small',

    /**
    * Initiate the adaptive html module
    * @param  {Node}  root  Dom node of module root
    * @param  {Object} data Object of module paramters set from HTML data-attributes
    */
    init: function(element, data){

      //merge data with this
      _.extend(this, data);

      element.style.outline = "4px solid red";
      element.innerHTML = this.bumSize;

      console.log(this);

    }

  };

  return exports;


});
