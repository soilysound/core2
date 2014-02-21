define('tabs-lite', ['underscore', 'widget-lite'], function(_, widgetLite){

  "use strict";

  return widgetLite.extend({

    // default toggle class
    toggleSelector: 'data-on',

    // init module

    init: function(element, data){

      // merge value of this with properties from html data attributes
      _.extend(this, data);

      // set reference to root element
      this.element = element;

      this._getElements();
      this._clickActions();

    },

    // Get elements

    _getElements: function(){

      this.tabItems = this.element.querySelectorAll('[data-role="tab-item"]');
      this.tabContents = this.element.querySelectorAll('[data-role="tab-box"]');

    },

    // set click actions

    _clickActions: function(e){

      var self = this;

      _.each(this.tabItems, function(item, index){

        // set index of this tab item as an attribute
        item.setAttribute('data-index', index);

        // set click event
        item.addEventListener('click', function(e){

          e.preventDefault();

          //get index of clicked item
          var index = parseInt(e.target.getAttribute('data-index'), 10);

          // switch tab to correct index
          self.changeTab(index);


        }, false);

      });

    },

    // method to change tab
    // index (Number): tab to switch to

    changeTab: function(index){

      var self = this;

      // hide all items
      _.each(this.tabItems, function(item){

        item.removeAttribute(self.toggleSelector);

      });

      _.each(this.tabContents, function(item){

        item.removeAttribute(self.toggleSelector);
        item.style.cssText = "";

      });

      // show selected items
      this.tabContents[index].setAttribute(this.toggleSelector, true);
      this.tabItems[index].setAttribute(this.toggleSelector, true);

    }


  });

});
