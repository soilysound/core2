;define('callfn', ['underscore'], function(_) {

  "use strict";

  var Exports = {

    extend: function(props){

      function Exports(){}

      Exports.prototype = props;

      return Exports;

    },

    scan: function(){

      // get elements from page
      var callfn = document.querySelectorAll('.callfn');

      _.each(callfn, function(el){

        console.log(el);

      });


    }
  };

  return Exports;

});
