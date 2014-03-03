define('autocomplete-lite', ['underscore', 'widget-lite'], function(_, widgetLite){

  "use strict";

  return widgetLite.extend({

    // create an empty search terms object to be populated with remote data
    searchTerms: {terms: []},

    // any matching terms will be stored as an array of matching objects here
    matches:[],

    noMatchesMessage: "NO MATCHES",

    // index of the selected item in the matching list
    selectedIndex: -1,

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

      // hash to the focused input box if it has an id
      this.input.addEventListener('focus', function(){

        if(this.input.id){
          location.hash = this.input.id;
        }

      }.bind(this), false);

    },

    _getElements: function(){

      this.input = this.element.querySelector('.search-box__input');
      this.resultsCon = this.element.querySelector('.search-box__autocomplete-group');
      this.links = this.resultsCon.getElementsByTagName('a');

    },

    _bindUiActions: function(e){


      // we're only interested in the user using the arrow keys here so if they aren't, bail out
      if(e.keyCode !== 38 && e.keyCode !== 40){
        return;
      }

      // there are no results so bail out
      if(this.matches[0].error){
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


      // if were going up then the iterator is minus 1 and we go to the end of the list at the top
      if(e.keyCode === 38){
        this.selectedIndex--;
        if(this.selectedIndex < 0){
          this.selectedIndex = visibleItems.length -1;
        }
      }

      // if we're going down we add one and go back to 0 if we reach the end
      if(e.keyCode === 40){
        this.selectedIndex++;
        if(this.selectedIndex > visibleItems.length -1){
          this.selectedIndex = 0;
        }
      }

      //loop through our list and remove selected items
      for(i = -1;++i<visibleItems.length;){
        visibleItems[i].removeAttribute('selected');
      }

      // add new selected item
      visibleItems[this.selectedIndex].setAttribute('selected', true);

    },

    _bindSearchQuery: function(e){

      // if user presses up or down arrow, dont try to match that, simply return
      if(e.keyCode > 36 && e.keyCode < 41){
         return;
      }

      // if user hits return:
      // try to go to the link that is currently highlighted in the list of matches
      if(e.keyCode === 13){
        var selected = this.resultsCon.querySelector('[selected]');
        if(selected){
          this.input.value = selected.querySelector('.search-box__autocomplete-link-headline').innerText;
          location.href = selected.href;
          return;
        }
      }

      // get current search term in the input box
      var query = e.target.value;

      // if search term length is zero, nuke the list with an empty array
      if(query.length < 1){
        this.matches = [];
        this._buildList();
        return;
      }

      // reset matches array
      this.matches = [];

      // loop through list of matching search terms
      for(var i = -1; ++i < this.searchTerms.terms.length;){

        // get term
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
        this._buildList();
      }

      // else sent an error message to the list
      else {
        this.matches = [{error: true}];
        this._buildList();
      }

    },

    _buildList: function(){

      var html = '';
      for(var i = -1;++i<this.matches.length;){

        if(this.matches[i].error === true){
          html = '<li class="search-box__autocomplete-item search-box__autocomplete-item--error">' + this.noMatchesMessage + '</li>';
          break;
        }

        else {
          html += '<li class="search-box__autocomplete-item"><a class="search-box__autocomplete-link" href="'+this.matches[i].itemLink+'"><h5 class="search-box__autocomplete-link-headline">' + this.matches[i].t + '</h5><p class="search-box__autocomplete-link-label">' +  this.matches[i].itemLabel + '</p></a></li>';
        }
      }

      this.resultsCon.innerHTML = html;
      this.selectedIndex = -1;
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
