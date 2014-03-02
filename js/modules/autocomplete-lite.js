define('autocomplete-lite', ['underscore', 'widget-lite'], function(_, widgetLite){

  "use strict";

  return widgetLite.extend({

    // create an empty search terms object to be populated with remote data
    searchTerms: {terms: []},

    // initiate the autocomplete module
    init: function(element, data){

      // merge value of this with properties from html data attributes
      _.extend(this, data);

      // set reference to root element
      this.element = element;

      // first get data preemptively
      this._getData();
      

    },

    _getData: function(){

      // if the data is inline in the page grab it and return;
      if(this.inlineData){
        this.searchTerms = window[this.inlineData];
        return;
      }

      // else get it from the remote source
      var funcName = '_getData_' + Math.floor((Math.random()*1000)+1);

      window[funcName] = function(searchTerms){
        this.searchTerms = searchTerms;
      }.bind(this);

      var script = document.createElement('script');
      script.src = this.src.replace('#{callback}', funcName);
      document.getElementsByTagName('head')[0].appendChild(script);

    },

    _getElements: function(){


    }


  });

});