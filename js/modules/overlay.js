define('overlay', [
    'events',
    'underscore',
    'dom',
    'inverted-listener',
    'widget'
  ],

  function(
    events,
    _,
    dom,
    invertedListener,
    Widget
  ) {

  /**
   * @exports overlay
   */
  return {
    options: {
      width: false,
      height: false,
      src: 'about:blank',
      addClass: '',
      iframe: false,
      title: '',
      reloadOnClose: false
    },

    create: function(options) {

      _.extend(this.options, this.options, options || {});

      this.overlayHtml = this._createOverlay(this.options.className || '');
      this.overlay = dom(this.overlayHtml).find('.overlay').get(0);
      this.overlayContent = dom(this.overlayHtml).find('.overlay__content').get(0);
      this.overlayHeader = dom(this.overlayHtml).find('.overlay__header').get(0);
      this.overlayBody = dom(this.overlayHtml).find('.overlay__body').get(0);

      this._addSpinner();
      this._setContent();
      this._appendOverlay();
      this._setAttributes();
      this._addCloseButton();

      // Reflow the page
      this.overlay.offsetTop;

      this._showOverlay();
    },

    _loading: function(state) {
      if(state) {
        this.ajaxSpinner.addClass('on');
      } else {
        this.ajaxSpinner.removeClass('on');
        Widget.init();
      }
    },

    _addSpinner: function() {
      this.ajaxSpinner = dom('<span class="ajax-loader -invert"></span>');
      dom(this.overlayContent).append(this.ajaxSpinner);
    },

    _addCloseButton: function() {
      this.closeButton = dom(this.overlay).find('.overlay__close').get(0);
      events.on(this.closeButton, 'click', _.bind(function(e){
        this.close(e);
      }, this));

    },

    _writeIframe: function() {
      var iframe = document.createElement('iframe');

      this._loading(true);

      var unique = new Date().valueOf();

      window['overlay'+unique] = _.bind(function(){

        this._loading(false);
        iframe.className = '';

      }, this);

      iframe.setAttribute('onload','overlay' + unique + '()');
      iframe.className = '-hdn';
      iframe.src = this.options.src;
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.setAttribute('frameborder', 0);
      iframe.scrolling = 'no';
      this.overlayContent.appendChild(iframe);
    },

    _getUrl: function() {
      this._loading(true);
      require(['reqwest'], _.bind(function(reqwest) {
        reqwest({
          url: this.options.src,
          method: 'get',
          data: this.options.data || {},
          success: _.bind(function(html) {
            this.overlayContent.innerHTML = html;
            this._loading(false);
          }, this),
          type: 'html'
        });
      }, this));
    },

    _writeFragment: function() {
      this.overlayContent.appendChild(dom(this.options.src).get(0).cloneNode(true));
    },

    _setContent: function() {
      if(this.options.iframe) {
        // iframe content
        this._writeIframe();
      } else if(this.options.src.match(/^\#/)) {
        // load fragment from page
        this._writeFragment();
      } else {
        // load remote url
        this._getUrl();
      }
    },

    _setAttributes: function() {

      if(this.options.width){
        this.overlayBody.style.maxWidth = parseInt(this.options.width, 10) + "px";
      }

      if(this.options.height){
        this.overlayBody.style.maxHeight = parseInt(this.options.height, 10) + "px";
      }
    },

    close: function() {

      this._showOverlay('remove');

      setTimeout(_.bind(function(){

        this._appendOverlay('remove');
        if(this.options.reloadOnClose) {
          location.reload();
        }

      }, this), 500);

    },

    _appendOverlay: function(remove) {
      if(this.overlayHtml) {
        if(remove) {
          document.body.removeChild(this.overlayHtml);
        } else {
          document.body.appendChild(this.overlayHtml);
        }
      }
    },

    _showOverlay: function(remove) {
      if(remove) {
        dom(this.overlay).removeClass('overlay--open');
      } else {
        dom(this.overlay).addClass('overlay--open');
      }
    },

    _createOverlay: function(){
      var shim = document.createElement('div');

      shim.innerHTML = [
        '<div class="overlay__wrap">',
          '<div class="overlay '+ this.options.addClass +'">',
            '<div class="overlay__inner">',
              '<div class="overlay__body">',
                '<h3 class="row-table overlay__header ' + this.options.headerClass + ' -ellipsis"><div class="col span3"></div><div class="col"><span class="overlay__title">', this.options.title, '</span></div><div class="col span3 overlay__close"><span class="icon icon-x"></span></div></h3>',
                '<div class="overlay__content"></div>',
              '</div>',
            '</div>',
          '</div>',
        '</div>'
      ].join('');

      return shim.firstChild;
    }
  };
});
