define(['adaptive-html', 'underscore'], function(adaptiveHTML, _){

  var exports = {

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
      this._parseTemplate(element);
      this._addClasses();

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
      if(this.breakPoints.indexOf(currBP) > -1){

        this.element.parentNode.insertBefore(this.templateDom,  this.element.nextSibling);

        //set flag that the dom has been appended - we only need to do this once
        this.domAppended = true;

        //remove breakpoint event listener, its no longer needed
        document.removeEventListener('breakPointChange', this.listenerFunction, false);
       
      }

    },

    _createBreakPoints: function(showAt){

      this.breakPoints = [];

      var tempArray = this.showAt.split("|");

      for(var i = -1;++i<tempArray.length;){
        this.breakPoints[i] = parseInt(tempArray[i],10);
      }
      
    },

    _parseTemplate: function(templateNode){

      var temp = document.createElement('div');
      temp.innerHTML = templateNode.innerHTML;

      this.templateDom = temp.firstElementChild || temp.childNodes[0];
    },

    _addClasses: function(){

      var bps = this.breakPoints;

      this.templateDom.className += ' is-hidden--bp10 is-hidden--bp20 is-hidden--bp30';

      for(var i = -1; ++i < bps.length;){
        this.templateDom.classList.remove('is-hidden--bp' + bps[i]);
      }
      
    }

  };

  return exports;


});
