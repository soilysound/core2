;define('widget', ['underscore'], function(_) {

  "use strict";

  var Widget = {

    extend:function(props){

      function Exports(){}

      Exports.prototype = props;

      /**
       * add super method used in old widgets
       * @param  {Dom node} el   Dom node module is attched to
       * @param  {Object}   data Data from the element dataset
       */
      Exports.prototype._super = function(el, data){

        require(['dom'], function(dom){

          this.$root = dom(el);
          _.extend(this, data);

        });

      };

      return Exports;

    }
  };

  return Widget;

});
