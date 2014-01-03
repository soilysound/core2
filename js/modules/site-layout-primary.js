define('site-layout-primary', ['underscore', 'widget'], function(_, Widget){

	"use strict";

  var exports = Widget.extend({

		leftNavSelector: '.site-layout-primary__col1',
		siteBodySelector: '.site-layout-primary__col2',
		leftNavTrigger: '.nav-primary-mobile__trigger',
		navIsOpen: false,

		init: function(element, data){

			//merge data with this
			_.extend(this, data);

			this.element = element;

			this._getElements();
			this._bindEvents();

		},

		_getElements: function(){

			this.leftNav = this.element.querySelector(this.leftNavSelector);
			this.siteBody = this.element.querySelector(this.siteBodySelector);
			this.trigger = this.element.querySelector('[data-role="open-nav"]');
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
				this.leftNav.style.cssText = "";
				this.navIsOpen = false;
			}

			else {
				this.leftNav.style.cssText = "-webkit-transform:translateX(0)";
				this.navIsOpen = true;
			}
		}
	});

	return exports;

});
