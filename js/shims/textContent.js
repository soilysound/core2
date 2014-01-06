(function(){

  "use strict";

  var div = document.createElement('div');
  div.innerHTML = "text";

  if(div.textContent){
    return;
  }

  Object.defineProperty(Element.prototype, 'textContent', {

    get: function(){

      return this.innerText;

    },

    set: function(val){

      this.innerText = val;
    }

  });


})();


