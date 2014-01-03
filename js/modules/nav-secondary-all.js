define('nav-secondary-all', ['underscore', 'widget'], function(_, Widget){

  "use strict";

  var exports = Widget.extend({

    // is the nav open?
    navOpen: false,

    // does the nav sit in-page and change content dynamically without reloading a page?
    inlineNav: false,

    init: function(element, data){

      // merge data with this
      _.extend(this, data);

      this.element = element;

      this._getElements();
      this._bindEvents();

    },

    _getElements: function(){

      this.dummy = document.createElement('div');

      this.navHead = this.element.querySelector('.nav-secondary-all__head');
      this.navBody = this.element.querySelector('.nav-secondary-all__body');
      this.navOffset = this.element.querySelector('.nav-secondary-all__offset') || this.dummy;
      this.navItems = this.element.querySelectorAll('.nav-secondary-all__item');
      this.navSection = this.element.querySelector('.nav-secondary-all__section');
    },

    _bindEvents: function(){

      // add action to toggle nav
      this.navHead.addEventListener('click', function(){

        this._toggleNav();

      }.bind(this), false);

      // add action to sub-nav items, if inline nav option is set
      _.each(this.navItems, function(item){

        item.onclick = this._navItemActions.bind(this, item);

      }.bind(this));

      // @TODO - add off click here

    },

    _toggleNav: function(state){

      var height = this.navBody.offsetHeight;

      if(this.navIsOpen || state === 'open'){

        this.navIsOpen = false;

        this.navHead.classList.remove('on');
        this.navBody.classList.remove('nav-secondary-all__body--open');
        this.navOffset.style.cssText = "";
      }

      else {

        this.navIsOpen = true;

        this.navHead.classList.add('on');
        this.navBody.classList.add('nav-secondary-all__body--open');
        this.navOffset.style.cssText = "-webkit-transform:translateY("+ height +"px)";
      }
    },

    // function to run when sub-nav item clicked
    _navItemActions: function(el, event){
      //event.preventDefault();
      console.log(event);

    }

  });

  return exports;

});
