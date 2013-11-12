define('adaptive-html',['underscore'], function(_){

  "use strict";

  function exports(){}

  exports.prototype = {

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

      //add breakpoint change handler
      document.addEventListener('breakPointChange', function(){
        this._loadIfMatchesBreakPoint();

      }.bind(this), false);

    },

    _loadIfMatchesBreakPoint: function(){

      var currBP = document.currentBreakPoint;

      //if current breakpoint matches, append new html
      if(this.showAt === 'all' || this.showAt.indexOf(currBP) > -1 && !this.element.classList.contains('adaptive-html--loaded')){

        this.templateTarget.insertAdjacentHTML('beforebegin', this.templateDom);

        //set flag that the dom has been appended - we only need to do this once
        this.element.classList.add('adaptive-html--loaded');
        this.templateTarget.parentNode.removeChild(this.templateTarget);

      }

    },

    _createBreakPoints: function(showAt){

      this.showAt = [];

      var tempArray = this.element.className.match(/is-hidden--bp[1-3][0]/g);

      if(tempArray){
        for(var i = -1;++i<tempArray.length;){
          this.showAt[i] = parseInt(tempArray[i].split('is-hidden--bp')[1],10);
        }

        this.showAt = _.difference(this.breakPoints, this.showAt);
      }

      else {
        this.showAt = 'all';
      }

    },

    _parseTemplate: function(){

      this.templateTarget = this.element.querySelector('[type]');
      this.templateDom = this.templateTarget.textContent ?
      this.templateTarget.textContent : this.templateTarget.innerText;
    }

  };

  return exports;


});
