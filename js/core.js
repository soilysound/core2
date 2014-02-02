/**
 * Call all core modules you want to include in the main site.js build
 */
(function(){

  "use strict";

  if(SKY_SPORTS.hasFeature.touch){

    require(['fastclick'], function(Fastclick){
			callfn.init();
      Fastclick.attach(document.body);

    });
  }

  require(['callfn'], function(callfn){
		callfn.init();
  });
  
})();
