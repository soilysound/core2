(function(window, document){

  //@TODO - change the references to images to just 'elements' since this works with both
  //
  'use strict';

  //the amount of leeway to give the viewport before it regards an image is out of view
  // eg -100 means it will only regard it as not in viewport if its more than 100px out of the viewport
  var tolerance = -100;

  /**
   * Get a *live* node list of images - the browser can automatically update this list for us
   */
  var images = document.getElementsByClassName ? document.getElementsByClassName('postpone-load') : document.getElementsByTagName('img');

  /**
   * Check if image is out of the viewport
   */
  function outOfView(image){

    var coords = image.getBoundingClientRect();
    return !(coords.top + coords.height > tolerance) || !(window.innerHeight - coords.top > tolerance) || !(coords.left + coords.width > 0) || !(window.innerWidth - coords.left > 0);

  }

  function loadImage(){
    this.classList.remove('postpone-load');
  }

  function swapSrc(src, lookup){
    //get token and replace with correct size for this breakpoint
    var match = (/#\{(.+)\}/).exec(src),
    bp;

    if(match){
      bp = parseInt(match[1], 10);
      match = match[0];


      if(document.currentBreakPoint > bp){
        src = src.replace(match, document.currentBreakPoint);
      }

      else {
        src = src.replace(match, bp);
      }

    }
    return src;
  }

  /**
   * Scan list of images and load if in view
   */
  function scan(){

    for(var i = -1;++i<images.length;){

      var image = images[i];

      //determine whether its a lazy module rather than an image
      var isLazyModule;// = !image.nodeName.match(/img/g);

      //check if image is out of view, if not then swap src and remove from loop
      if(outOfView(image)){
        continue;
      }

      if(isLazyModule){
        image.classList.remove('postpone-load');
        image.classList.add('callfn');
        continue;
      }

      //its an image, so get image attributes
      var attrs = image.dataset;
      var src = attrs.imageSrc;
      console.log(src);
      //if the image has no data-image then remove from loop and skip
      if(!src){
        image.classList.remove('postpone-load');
        continue;
      }

      else {

        // use 3 methods to ensure onload is called in the various scenarios/browsers
        image.onload = loadImage;
        // //image.onerror = errorImage;
        // image.naturalWidth > 0 && loadImage.call(image);
        // image.readyState === 'complete' && loadImage.call(image);
        image.src = swapSrc(src, attrs.lookup);
      }
    }

    window.setTimeout(function(){
      window.requestAnimationFrame(scan);
    }, 1000);
  }

  scan();


})(window, document);
