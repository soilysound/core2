define('accordian',['underscore', 'widget'], function(_, Widget){

  "use strict";

  var exports = Widget.extend({

    /**
    * Initiate the accordion module
    * @param  {Node}  element  Dom node of module root
    * @param  {Object} data Object of module paramters set from HTML data-attributes
    */
    init: function(element, data){

      //merge data with this
      _.extend(this, data);

      //set reference to root element
      this.element = element;

      this._getElements();
      this._setUpElements();

    },

    /**
     * Grab html elements
     */
    _getElements: function(){

      this.items = this.element.querySelectorAll('.accordian__item');

    },

    /**
     * Set up initial html attributes
     */
    _setUpElements: function(){

      for(var i = -1;++i<this.items.length;){

        var item = this.items[i];

        //set initial index and offset values
        item.dataset.index = i;
        item.dataset.offset = 0;

        var self = this;

        //add click action to item header
        item.querySelector('.accordian__item-head').addEventListener('click', this._clickActions.bind(this, item), false);
      }
    },

    /**
     * Set the offset values that apply to elements below the clicked item
     * @param {Number} index     Index of clicked item
     * @param {Number} direction 1 is slide down, -1 is slide up
     * @param {Number} amount    Height of element to slide up or down
     */
    _setOffsets: function(index, direction, amount){

      var currentOffset;

      for(var i = index;++i<this.items.length;){

        //get current clicked item
        var item = this.items[i];

        //get current offset of this item
        currentOffset = parseInt(item.dataset.offset, 10);

        //if direction is 1, were sliding down
        if(direction === 1){
          currentOffset += (amount);
        }

        //else sliding back up
        else {
          currentOffset = Math.max(0, currentOffset - amount);
        }
        //set new offset value
        item.dataset.offset = currentOffset;

        //set styles to slide down or up
        item.style.cssText = "-webkit-transform:translateY(" + (currentOffset) + "px);-moz-transform:translateY(" + (currentOffset) + "px);transform:translateY(" + (currentOffset) + "px)";
      }

      //set total offset in parent component using padding bottom
      if(direction === 1){
        this.element.style.paddingBottom = currentOffset + "px";
      }
      else {
        setTimeout(function(){

          this.element.style.paddingBottom = currentOffset + "px";

        }.bind(this), 333);
      }

    },

    /**
     * Click function that applies to accordian head
     * @param  {Node} element Dom node of clicked element
     * @param  {Object} event   Event object
     */
    _clickActions: function(element, event){

      event.preventDefault();

      var index = element.dataset.index;
      var content = element.querySelector('.accordian__item-content');
      var contentHeight = content.offsetHeight;

      if(element.classList.contains('accordian__item--open')){

        content.style.cssText = '';
        element.classList.remove('accordian__item--open');

        this._setOffsets(index, -1, contentHeight);
      }

      else {

        content.style.cssText = '-webkit-transform:translateY(0);-moz-transform:translateY(0);transform:translateY(0)';
        element.classList.add('accordian__item--open');

        this._setOffsets(index, 1, contentHeight);
      }

    }

  });

  return exports;

});
