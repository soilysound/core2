define('overlay-widget', [
    'events',
    'underscore',
    'widget',
    'overlay'
  ],

  function(
    events,
    _,
    Widget,
    overlay
  ) {

  /**
   * @exports overlay widget
   * @class Overlaywidget
   * @extends {Widget}
   */

  return Widget.extend({

    /**
     * @constructs Overlaywidget
     * @param    {HTMLAnchorElement}  element
     * @property {$}  $root  The root element
     * @property {Object}  options  Applied from the element's data- attributes
     */
    init: function (element) {

      this._super(element);

      //set src to be the href if its set
      if(this.callFromHash){
        this._launchFromHash();
      }else if(this.callFromRoot){
          events.on(this.$root.get(0), 'click',"[data-role='overlay-link']", _.bind(function(ev){
                this.src = ev.intendedTarget.getAttribute('href') || ev.intendedTarget.src;
                this.launch(ev);

            }, this));
      }else {
        this.src = this.$root.getAttr('href') || this.src;

        //replace token if present
        this.src = this.src.replace('#{current-url}', location.hostname + location.pathname);
        events.on(this.$root.get(0), 'click', _.bind(this.launch, this));
      }

    },

    _launchFromHash: function(){

      if(location.hash.match(/overlay-/)){

        var options = location.hash.split(/overlay-/);
        options = options[1].split('|');

        var optionsObj = {};

        _.each(options, function( option ){
          option = option.split('=');
          optionsObj[option[0]] = option.slice(1).join('=');

        });

        overlay.create(optionsObj);

      }

    },
    /**
     * Get the attributes from the element and launch the overlay function
     * @param  {Object} [evnt] Browser event object
     * @memberOf Overlaywidget.prototype
     */
    launch: function(evnt) {

      evnt.preventDefault();

      if(this.ignore){

        location.href = this.src;
      }

      else {

        if(this.desktopUrl){
          this.src = this.desktopUrl;
        }

        if(this.mobileUrl && SKY_SPORTS.device.mobile){
          this.src = this.mobileUrl;
        }

        overlay.create(this);
      }

    }

  });

});
