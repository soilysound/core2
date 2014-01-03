(function(){

  "use strict";

  function supportDataSet(){
    var n = document.createElement("div");
    n.setAttribute("data-a-b", "c");
    return !!(n.dataset && n.dataset.aB === "c");
  }

  if(supportDataSet()){
    return;
  }

  function convert(string){
    return string.replace(/^data-/, '').replace(/-([a-z])/g, function (m, w) {
        return w.toUpperCase();
    });
  }

  Object.defineProperty(Element.prototype, 'dataset', {

    get: function(val){

      var dataset = {};
      var attrs = this.attributes;

      for (var i = 0; i < attrs.length; i++) {
        // Store reference to current attr
        var attr = attrs[i];
        // If attribute nodeName starts with 'data-'
        if (/^data-/.test(attr.nodeName)) {
          // Log its name (minus the 'data-' part), and its value
          dataset[convert(attr.nodeName)] = attr.nodeValue;
        }
      }

      return dataset;
    }

  });

})();
