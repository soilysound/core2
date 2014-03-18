// ADD CSS
// dymanically add a persistent css string into the head
// css is stored in locastorage until deleted

;(function(window, document){

    window.SKY_SPORTS = window.SKY_SPORTS || {};

    var cssRules = {};

    //get existing persistent rules
    if(window.localStorage.getItem('jscss')){
      cssRules = JSON.parse( window.localStorage.getItem('jscss'));
    }

    //create and add style tag
    var style = document.createElement('style');
    style.id = "jscss";
    document.getElementsByTagName('head')[0].appendChild(style);

    // add a persistsnt css string to the head
    // options.id = unique id
    // options.css = css string
    function addCss(options){

      if(options.id in cssRules === false || cssRules[options.id] !== css){
        cssRules[options.id] = options.css;
      }

      writeCss();

    }

    // remove saved css string by id reference
    function removeCss(id){

      if(id in cssRules){

        delete cssRules[id];
      }

      writeCss();
    }

    // write the css string into the style tag
    function writeCss(){

      var css = createCssString();

      if(style.styleSheet){
        style.styleSheet.cssText = css;
      }
      else {
        style.textContent = css;
      }
    }

    // create 1 css string from all the saved css rules
    function createCssString(){

      var css = '';

      for (var id in cssRules){

        css += cssRules[id];
      }

      return css;
    }

    //write any persistent rules to localstorage as the page unloads
    window.onbeforeunload =  function(){
    
      // this doesnt work properly
      window.localStorage.setItem('jscss', JSON.stringify(cssRules));

    };

    //write any persistent styles on page load
    writeCss();

    //expose functions
    window.SKY_SPORTS.addCss = addCss;
    window.SKY_SPORTS.removeCss = removeCss;

})(window, document);