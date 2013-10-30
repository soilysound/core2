(function(window, document){

  'use strict';

  var images = document.getElementsByClassName('lazy-image');

  /**
   * Check if image is out of the viewport
   */
  function outOfView(image){

    var coords = image.getBoundingClientRect();
    return !(coords.top + coords.height > 0) || !(window.innerHeight - coords.top > 0) || !(coords.left + coords.width > 0) || !(window.innerWidth - coords.left > 0);

  }

  function loadImage(){
    this.classList.add('lazy-image--loaded');
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

      //get image attributes
      var attrs = image.dataset;
      var src = attrs.imageSrc;
      
      //if the image has no data-image then remove from loop and skip
      if(!src){
        image.classList.remove('lazy-image');
        continue;
      }

      //check if image is out of view, if not then swap src and remove from loop
      if(outOfView(image)){
        continue;
      }
      else {
        image.classList.remove('lazy-image');
        // use 3 methods to ensure onload is called in the various scenarios/browsers
        image.onload = loadImage;
        image.naturalWidth > 0 && loadImage.call(image);
        image.readyState === 'complete' && loadImage.call(image);
        image.src = swapSrc(src, attrs.lookup);
      }
    }

    window.setTimeout(function(){
      window.requestAnimationFrame(scan);
    }, 250);
  }

  scan();


})(window, document);