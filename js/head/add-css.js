/**
 * ADD CSS
 *
 * Dynamically set a css string
 * Allows the set css values to be persistent using localstorage
 */

;(function(window, document){

  window.SKY_SPORTS = window.SKY_SPORTS || {};

  var cssRules = {};
  var persistedRules = {};

  //get existing persistent rules
  if(window.localStorage.getItem('jscss')){
    cssRules = JSON.parse( window.localStorage.getItem('jscss') );
    persistedRules = JSON.parse( window.localStorage.getItem('jscss') );
  }

  //create and add style tag
  var style = document.createElement('style');
  style.id = "jscss";
  document.getElementsByTagName('head')[0].appendChild(style);

  /**
  * Add a css string to the page head
  * @param {string} id      unique id for css string
  * @param {string} css string  css values to add
  * @param {boolean} persist    set true to persist values in localstorage
  */

  function addCss(id, cssString, persist){

  if(id in cssRules === false || cssRules[id] !== cssString){

    cssRules[id] = cssString;

    if(persist === true){
      alert('persist');
      persistedRules[id] = cssString;
    }
    writeCss();

  }
  }

  /**
  * Remove css by id reference
  * @param  {string}    id id of css string 
  */

  function removeCss(id){

  if(id in cssRules){

    delete cssRules[id];
  }

  if(id in persistedRules){

    delete persistedRules[id];
  }

  writeCss();
  }

  /**
  * Write the css string into the style tag
  */

  function writeCss(){

  var css = createCssString();

  if(style.styleSheet){
    style.styleSheet.cssText = css;
  }
  else {
    style.textContent = css;
  }
  }


  /**
  * parses an object of css strings into 1 string
  * @return {string} css string
  */

  function createCssString(){

  var css = '';

  for (var id in cssRules){

    css += cssRules[id];
  }

  return css;
  }

  //write any persistent rules to localstorage as the page unloads
  window.onbeforeunload =  function(){

  window.localStorage.setItem('jscss', JSON.stringify(persistedRules));

  };

  //write any persistent styles on page load
  writeCss();

  //expose functions
  window.SKY_SPORTS.addCss = addCss;
  window.SKY_SPORTS.removeCss = removeCss;

})(window, document);