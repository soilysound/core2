define('adaptive-html',['underscore', 'reqwest'], function(_, reqwest){

  "use strict";

  function Exports(){}

  Exports.prototype = {

    /**
     * List of registered breakpoints
     * @type {Array}
     */
    breakPoints:[5, 10, 20, 30],
    templateDom: '',

    /**
    * Initiate the adaptive html module
    * @param  {Node}  element  Dom node of module root
    * @param  {Object} data Object of module paramters set from HTML data-attributes
    */
    init: function(element, data){

      // merge data with this
      _.extend(this, data);

      // set reference to root element
      this.element = element;

      this._createBreakPoints();

      // we have a src attribute make xhr request and load
      if(this.src){
        this._getContentXHR();
      }

      // its an inline template, parse and load
      else {
        this._getContentInline();
      }

      // add breakpoint change handler (skip for IE8, as its not responsive)
      if(!(SKY_SPORTS.isDevice.msie && SKY_SPORTS.isDevice.version === 8)){
        document.addEventListener('breakPointChange', this.addBpEvent, false);
      }

      // create a referenceable function to bind to our breakpoint listener
      // this is we can *unbind* it later when were done
      this.addBpEvent = function(){
        this._loadIfMatchesBreakPoint();
      }.bind(this);


    },

    _getContentInline: function(){

      this._parseTemplate();
      this._loadIfMatchesBreakPoint();

    },

    _getContentXHR: function(){
      //create a dom target to load the content
      this.templateTarget = document.createElement('span');
      this.element.appendChild(this.templateTarget);

      this.xhr = reqwest(this.src);
      this.xhr.then(function(resp){

        this.templateDom = resp;
        this._loadIfMatchesBreakPoint();

      }.bind(this));
    },

    _loadIfMatchesBreakPoint: function(){

      var currBP = document.currentBreakPoint;
console.log(this.showAt);
      //if current breakpoint matches, append new html
      if((this.showAt === 'all' || this.showAt.indexOf(currBP) > -1) && !this.element.classList.contains('adaptive-html--loaded')){

        this.templateTarget.insertAdjacentHTML('beforebegin', this.templateDom);

        //set flag that the dom has been appended - we only need to do this once
        this.element.classList.add('adaptive-html--loaded');
         //remove breakpoint listener
        document.removeEventListener('breakPointChange', this.addBpEvent, false);
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

    _getRemoteMarkup: function(){

      console.log('make xhr call for html snippet');

    },

    _parseTemplate: function(){

      this.templateTarget = this.element.querySelector('[type]');

      if(this.templateTarget){
        this.templateDom = this.templateTarget.textContent ?
        this.templateTarget.textContent : this.templateTarget.innerText;

        console.log(this.templateDom);
      }

    }

  };

  return Exports;


});
