define('autocomplete-lite', ['underscore', 'widget-lite'], function(_, widgetLite){

  "use strict";

  return widgetLite.extend({

    // create an empty search terms object to be populated with remote data
    searchTerms: {terms: []},

    // any matching terms will be stored as an array of matching objects here
    matches:[],

    noMatchesMessage: "NO MATCHES",

    // initiate the autocomplete module
    init: function(element, data){

      // merge value of this with properties from html data attributes
      _.extend(this, data);

      // set reference to root element
      this.element = element;

      // first get data preemptively
      this._getData();

      // get all the relevent elements
      this._getElements();

      // bind action to input box for the search query
      this.input.addEventListener('keyup', this._bindSearchQuery.bind(this), false);

      // bind some ui actions to the input box
      this.input.addEventListener('keydown', this._bindUiActions.bind(this), false);


    },

    _getElements: function(){

      this.input = this.element.querySelector('.nav-primary-search__input');
      this.autocomplete = this.element.querySelector('.nav-primary-search__autocomplete ul');
      this.links = this.autocomplete.getElementsByTagName('a');

    },

    _bindUiActions: function(e){

      // we're only interested in the user using the arrow keys here so if they aren't, bail out
      if(e.keyCode !== 38 && e.keyCode !== 40){
        return;
      }

      // we're setting the numbr of items that are visible with css
      // therefore we have to filter our list so we're only cycling through visible items
      var visibleItems = [];
      for(var i = -1; ++i < this.links.length;){
        if(this.links[i].offsetWidth){
          visibleItems.push(this.links[i]);
        }
      }

      console.log(visibleItems);

      // to go down, we add one each time and reset to 0 when we reach the bottom
      var iterator = 1;
      var reset = 0;

      // if were going up then the iterator is minus 1 and we go to the end of the list at the top
      if(e.keyCode === 38){
        iterator = -1;
        reset = visibleItems.length - 1;
      }

      //loop through our list and either go back or forward when the user hits up and down
      for(var i = -1;++i<visibleItems.length;){

        if(visibleItems[i].classList.contains('item-on')){
          visibleItems[i].classList.remove('item-on');

          if(visibleItems[i + iterator]){
            visibleItems[i + iterator].classList.add('item-on');
          }
          else {
            visibleItems[reset].classList.add('item-on');
          }

          break;
        }
      }

    },

    _bindSearchQuery: function(e){

      // if user presses up or down arrow, dont try to match that, simply return
      if(e.keyCode > 36 && e.keyCode < 41){
         return;
      }

      // if user hits return:
      // try to go to the link that is currently highlighted in the list of matches
      if(e.keyCode === 13){
        var selected = this.autocomplete.querySelector('.item-on');
        if(selected){
          location.href = selected.href;
          return;
        }
      }

      // get current search term in the input box
      var query = e.target.value;

      //if search term length is zero, nuke the list with an empty array
      if(query.length < 1){
        this._buildList([]);
        return;
      }

      // loop through list of matching search terms
      for(var i = -1; ++i < this.searchTerms.terms.length;){

        //get term
        var term = this.searchTerms.terms[i];

        // create regex to try match
        var regex = new RegExp('^' + query + '', 'i');

        // if there is a match, push the matching term into our matches array
        if(term.t.match(regex)){
          this.matches.push(term);
        }

      }

      // if we have any matches, built the list and show the matching terms
      if(this.matches.length){
        this._buildList(this.matches);
      }

      // else sent an error message to the list
      else {
        this._buildList([{error:true}]);
      }

    },

    _buildList: function(){

      var html = '';
      for(var i = -1;++i<this.matches.length;){

        var onClass = '';

        if(i===0){
          onClass = 'nav-primary-search__autocomplete-link-selected';
        }

        if(this.matches[i].error === true){
          html = "<li>"+ this.noMatchesMessage + "</li>";
        }

        else {
          html += '<li class="nav-primary-search__autocomplete-item"><a class="'+ onClass+ ' nav-primary-search__autocomplete-link" href="'+this.matches[i].itemLink+'">' + this.matches[i].t + '<br><small>' +  this.matches[i].itemLabel + '</small></a></li>';
        }
      }

      this.autocomplete.innerHTML = html;
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

    }


  });

});
