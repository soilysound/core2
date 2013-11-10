define(['adaptive-html', 'underscore'], function(adaptiveHTML, _){
  
  var exports = {

    /**
     * List of registered breakpoints
     * @type {Array}
     */
    breakPoints:[10, 20, 30],

    /**
    * Initiate the adaptive html module
    * @param  {Node}  root  Dom node of module root
    * @param  {Object} data Object of module paramters set from HTML data-attributes
    */
    init: function(element, data){

      //merge data with this
      _.extend(this, data);

      //set reference to root element
      this.element = element;

      this._createBreakPoints();
      this._parseTemplate();

      this._loadIfMatchesBreakPoint();

      //create anonymous function with this bound to add to our event listener
      this.listenerFunction = function(){

        this._loadIfMatchesBreakPoint();

      }.bind(this);

      //add breakpoint change handler
      document.addEventListener('breakPointChange', this.listenerFunction, false);
      
    },

    _loadIfMatchesBreakPoint: function(){

      var currBP = document.currentBreakPoint;

      //if current breakpoint matches, append new html
      if(this.showAt.indexOf(currBP) > -1){

        console.log(this.templateTarget, this.templateDom);
        this.templateTarget.insertAdjacentHTML('beforebegin', this.templateDom);

        //set flag that the dom has been appended - we only need to do this once
        this.domAppended = true;
        this.templateTarget.parentNode.removeChild(this.templateTarget);

        //remove breakpoint event listener, its no longer needed
        document.removeEventListener('breakPointChange', this.listenerFunction, false);
       
      }

    },

    _createBreakPoints: function(showAt){

      this.showAt = [];

      var tempArray = this.element.className.match(/is-hidden--bp[1-3][0]/g);

      for(var i = -1;++i<tempArray.length;){
        this.showAt[i] = parseInt(tempArray[i].split('is-hidden--bp')[1],10);
      }

      this.showAt = _.difference(this.breakPoints, this.showAt);
      
    },

    _parseTemplate: function(){

      this.templateTarget = this.element.querySelector('[type]');
      this.templateDom = this.templateTarget.textContent ?
      this.templateTarget.textContent : this.templateTarget.innerText;
    }

  };

  return exports;


});
