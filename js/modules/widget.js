;define('widget', [], function() {

  "use strict";

  var Widget = {

    extend:function(props){

      function Exports(){}
      Exports.prototype = props;

      return Exports;

    }
  };

  return Widget;

});
