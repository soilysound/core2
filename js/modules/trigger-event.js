define('trigger-event', ['widget', 'dom'], function(Widget, dom) {

/**
 * @exports Trigger Event
 * @class TriggerEvent
 * @extends {Widget}
 */
var TriggerEvent = Widget.extend({

        preventDefault: true,
        onEvent: 'click',
        selector: '[data-role="trigger-event"]',

        init: function (element) {
            this._super(element);
            this._getElements();
            this._addRootClickEvent();
        },

        /**
         * Gets target items by selector
         * @private
         * @memberOf TriggerEvent.prototype
         */
        _getElements: function () {
            this.$items = dom(this.selector);
        },

        /**
        * Adds click events to root element which will fire targetted events
        * @private
        * @memberOf TriggerEvent.prototype
        */
        _addRootClickEvent: function () {
          var self = this;
          events.on(this.$root.get(0), 'click', function(evnt){
              if(self.preventDefault) {
                  evnt.preventDefault();
                }
              self._triggerEvents();
          });
        },

        /**
         * Triggers events on our elements
         * @private
         * @memberOf TriggerEvent.prototype
         */
         _triggerEvents: function(){
            var self = this;

             this.$items.each( function(node){
                events.trigger(node, self.onEvent);
             });
         }
    });

    return TriggerEvent;
});
