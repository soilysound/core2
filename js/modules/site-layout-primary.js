define('site-layout-primary', ['underscore', 'widget'], function(_, Widget){

	"use strict";

  var exports = Widget.extend({

		navIsOpen: false,

		init: function(element, data){

			//merge data with this
			_.extend(this, data);

			this.element = element;

			this._getElements();

			// bail out if there is no mobile nav open button
			if(!this.trigger){
				return;
			}

			this._getNavWidth();
			this._bindEvents();

		},

		_getElements: function(){

			this.siteLayoutPrimary = this.element;
			this.siteBody = this.siteLayoutPrimary.querySelector('.site-layout-primary__col2');
			this.leftNav = this.siteLayoutPrimary.querySelector('.site-layout-primary__col1');
			this.trigger = document.querySelector('[data-role="open-left-hand-nav"]');
		},

		_getNavWidth: function(){

			if(window.getComputedStyle){
				var styles = window.getComputedStyle(this.leftNav, null);
				this.leftNavWidth = parseInt(styles.getPropertyValue("width"), 10);
			}
		},

		_bindEvents: function(){

			this.trigger.addEventListener('click', function(){
				this.toggleNav();

			}.bind(this), false);

			this.siteBody.addEventListener('click', function(e){

				if(this.navIsOpen){

					e.preventDefault();
					e.stopPropagation();

					this.toggleNav();

				}

			}.bind(this), true);

		},

		toggleNav: function(state){

			if(this.navIsOpen || state === 'open'){
				this.siteLayoutPrimary.style.cssText = "";
				this.navIsOpen = false;
			}

			else {
				this.siteLayoutPrimary.style.cssText = "-webkit-transform:translateX(" + this.leftNavWidth + "px);-moz-transform:translateX(" + this.leftNavWidth + "px);-ms-transform: translateX(" + this.leftNavWidth + "px); transform: translateX(" + this.leftNavWidth + "px)";
				this.navIsOpen = true;
			}
		}
	});

	return exports;

});
