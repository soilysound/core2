/*! core2 22/01/2014 */
if(!window.addEventListener&&function(a,b){function c(a,b){var c=this;for(property in a)c[property]=a[property];c.currentTarget=b,c.target=a.srcElement||b,c.timeStamp=+new Date,c.preventDefault=function(){a.returnValue=!1},c.stopPropagation=function(){a.cancelBubble=!0}}function d(a,b){var d=this,e=d.listeners=d.listeners||[],f=e.push([b,function(a){b.call(d,new c(a,d))}])-1;d.attachEvent("on"+a,e[f][1])}function e(a,b){for(var c=this,d=c.listeners||[],e=d.length,f=0;e>f;++f)d[f][0]===b&&c.detachEvent("on"+a,d[f][1])}a.addEventListener=b.addEventListener=d,a.removeEventListener=b.removeEventListener=e,Element.prototype.addEventListener=d,Element.prototype.removeEventListener=e,Event.prototype.preventDefault=function(){this.cancelable!==!1&&(this.returnValue=!1)},Event.prototype.stopPropagation=function(){this.cancelBubble=!0}}(window,document),function(){Function.prototype.bind||(Function.prototype.bind=function(a){"use strict";if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var b=Array.prototype.slice.call(arguments,1),c=this,d=function(){},e=function(){return c.apply(this instanceof d&&a?this:a,b.concat(Array.prototype.slice.call(arguments)))};return d.prototype=this.prototype,e.prototype=new d,e})}(),"undefined"==typeof document||"classList"in document.createElement("a")||!function(a){"use strict";if("HTMLElement"in a||"Element"in a){var b="classList",c="prototype",d=(a.HTMLElement||a.Element)[c],e=Object,f=String[c].trim||function(){return this.replace(/^\s+|\s+$/g,"")},g=Array[c].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1},h=function(a,b){this.name=a,this.code=DOMException[a],this.message=b},i=function(a,b){if(""===b)throw new h("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(b))throw new h("INVALID_CHARACTER_ERR","String contains an invalid character");return g.call(a,b)},j=function(a){for(var b=f.call(a.className),c=b?b.split(/\s+/):[],d=0,e=c.length;e>d;d++)this.push(c[d]);this._updateClassName=function(){a.className=this.toString()}},k=j[c]=[],l=function(){return new j(this)};if(h[c]=Error[c],k.item=function(a){return this[a]||null},k.contains=function(a){return a+="",-1!==i(this,a)},k.add=function(){var a,b=arguments,c=0,d=b.length,e=!1;do a=b[c]+"",-1===i(this,a)&&(this.push(a),e=!0);while(++c<d);e&&this._updateClassName()},k.remove=function(){var a,b=arguments,c=0,d=b.length,e=!1;do{a=b[c]+"";var f=i(this,a);-1!==f&&(this.splice(f,1),e=!0)}while(++c<d);e&&this._updateClassName()},k.toggle=function(a,b){a+="";var c=this.contains(a),d=c?b!==!0&&"remove":b!==!1&&"add";return d&&this[d](a),!c},k.toString=function(){return this.join(" ")},e.defineProperty){var m={get:l,enumerable:!0,configurable:!0};try{e.defineProperty(d,b,m)}catch(n){-2146823252===n.number&&(m.enumerable=!1,e.defineProperty(d,b,m))}}else e[c].__defineGetter__&&d.__defineGetter__(b,l)}}(self),window.console||(window.console={}),function(){var a=function(){},b=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],c=b.length,d=0;do"function"!=typeof console[b[d]]&&(console[b[d]]=a),d++;while(c>d)}(),String.prototype.toDash=function(){return this.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})},String.prototype.toCamel=function(){return this.replace(/(\-[a-z])/g,function(a){return a.toUpperCase().replace("-","")})},Function.prototype.bind||(Function.prototype.bind=function(a){"use strict";if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var b=Array.prototype.slice.call(arguments,1),c=this,d=function(){},e=function(){return c.apply(this instanceof d&&a?this:a,b.concat(Array.prototype.slice.call(arguments)))};return d.prototype=this.prototype,e.prototype=new d,e}),function(){"use strict";var a=Object.prototype,b=a.__defineGetter__,c=a.__defineSetter__,d=a.__lookupGetter__,e=a.__lookupSetter__,f=a.hasOwnProperty;b&&c&&d&&e&&(Object.defineProperty||(Object.defineProperty=function(a,g,h){if(arguments.length<3)throw new TypeError("Arguments not optional");if(g+="",f.call(h,"value")&&(d.call(a,g)||e.call(a,g)||(a[g]=h.value),f.call(h,"get")||f.call(h,"set")))throw new TypeError("Cannot specify an accessor and a value");if(!(h.writable&&h.enumerable&&h.configurable))throw new TypeError("This implementation of Object.defineProperty does not support false for configurable, enumerable, or writable.");return h.get&&b.call(a,g,h.get),h.set&&c.call(a,g,h.set),a}),Object.getOwnPropertyDescriptor||(Object.getOwnPropertyDescriptor=function(a,b){if(arguments.length<2)throw new TypeError("Arguments not optional.");b+="";var c={configurable:!0,enumerable:!0,writable:!0},g=d.call(a,b),h=e.call(a,b);return f.call(a,b)?g||h?(delete c.writable,c.get=c.set=void 0,g&&(c.get=g),h&&(c.set=h),c):(c.value=a[b],c):c}),Object.defineProperties||(Object.defineProperties=function(a,b){var c;for(c in b)f.call(b,c)&&Object.defineProperty(a,c,b[c])}))}(),!(document.documentElement.dataset||Object.getOwnPropertyDescriptor(Element.prototype,"dataset")&&Object.getOwnPropertyDescriptor(Element.prototype,"dataset").get)){var propDescriptor={enumerable:!0,get:function(){"use strict";var a,b,c,d,e,f,g=this,h=this.attributes,i=h.length,j=function(a){return a.charAt(1).toUpperCase()},k=function(){return this},l=function(a,b){return"undefined"!=typeof b?this.setAttribute(a,b):this.removeAttribute(a)};try{({}).__defineGetter__("test",function(){}),b={}}catch(m){b=document.createElement("div")}for(a=0;i>a;a++)if(f=h[a],f&&f.name&&/^data-\w[\w\-]*$/.test(f.name)){c=f.value,d=f.name,e=d.substr(5).replace(/-./g,j);try{Object.defineProperty(b,e,{enumerable:this.enumerable,get:k.bind(c||""),set:l.bind(g,d)})}catch(n){b[e]=c}}return b}};try{Object.defineProperty(Element.prototype,"dataset",propDescriptor)}catch(e){propDescriptor.enumerable=!1,Object.defineProperty(Element.prototype,"dataset",propDescriptor)}}!function(){"use strict";function a(){var a=document.createElement("div");return a.setAttribute("data-a-b","c"),!(!a.dataset||"c"!==a.dataset.aB)}function b(a){return a.replace(/^data-/,"").replace(/-([a-z])/g,function(a,b){return b.toUpperCase()})}a()||Object.defineProperty(Element.prototype,"dataset",{get:function(){for(var a={},c=this.attributes,d=0;d<c.length;d++){var e=c[d];/^data-/.test(e.nodeName)&&(a[b(e.nodeName)]=e.nodeValue)}return a}})}(),Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){if(void 0===this||null===this)throw new TypeError('"this" is null or not defined');var c=this.length>>>0;for(b=+b||0,1/0===Math.abs(b)&&(b=0),0>b&&(b+=c,0>b&&(b=0));c>b;b++)if(this[b]===a)return b;return-1}),function(){for(var a=0,b=["moz","webkit"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b){var c=(new Date).getTime(),d=Math.max(0,16-(c-a)),e=window.setTimeout(function(){b(c+d)},d);return a=c+d,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})}(),function(){"use strict";var a=document.createElement("div");a.innerHTML="text",a.textContent||Object.defineProperty(Element.prototype,"textContent",{get:function(){return this.innerText},set:function(a){this.innerText=a}})}(),function(a,b){function c(a,b){(a in g==!1||g[a]!==b)&&(g[a]=b,e())}function d(a){a in g&&delete g[a],e()}function e(){var a=f();h.styleSheet?h.styleSheet.cssText=a:h.textContent=a}function f(){var a="";for(var b in g)a+=g[b];return a}a.SKY_SPORTS=a.SKY_SPORTS||{};var g={};a.localStorage.getItem("cssjs")&&(g=JSON.parse(a.localStorage.getItem("cssjs")));var h=b.createElement("style");h.id="cssjs",b.getElementsByTagName("head")[0].appendChild(h),a.onbeforeunload=function(){},e(),a.SKY_SPORTS.addCss=c,a.SKY_SPORTS.removeCss=d}(window,document),function(a,b){"use strict";function c(){var c=a.getComputedStyle(b.head,null).getPropertyValue("font-family");return c=parseInt(c.replace(/['"]/g,""),10)}function d(a,b){function c(){function c(){d=null,a.apply(f,e)}var e,f;d||(e=arguments,f=this,d=setTimeout(c,b))}var d;return c}function e(){b.dispatchEvent(f)}if(b.currentBreakPoint=10,b.createEvent){var f=b.createEvent("Event");if(f.initEvent("breakPointChange",!0,!0),a.requestAnimationFrame(function(){b.currentBreakPoint=c()}),a.matchMedia&&a.matchMedia("all").addListener){var g=a.matchMedia("(max-width:600px)");g.addListener(function(a){a.matches&&(b.currentBreakPoint=30,e())});var h=a.matchMedia("(min-width:601px) and (max-width:800px)");h.addListener(function(a){a.matches&&(b.currentBreakPoint=20,e())});var i=a.matchMedia("(min-width:801px)");i.addListener(function(a){a.matches&&(b.currentBreakPoint=10,e())})}else a.addEventListener("resize",d(function(){var a=c();a!==b.currentBreakPoint&&(b.currentBreakPoint=a,b.dispatchEvent(f))},300),!1)}}(window,document),function(a,b){function c(){var c=b.createElement("shim");c.style.cssText="width:10vw;-webkit-animation-name:xxx;-moz-animation-name:xxx;animation-name:xxx;-webkit-appearance:none";var d={webkitAnimation:"webkitAnimationStart",mozAnimation:"mozAnimationStart",animation:"animationstart",msAnimation:"MSAnimationStart"},e=!1;for(var f in d)f in c.style&&(e=d[f]);return{viewportUnits:!!c.style.width,cssAnimations:!!(c.style.animationName||c.style.webkitAnimationName||c.style.mozAnimationName),touch:"ontouchstart"in a||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0,animationEvent:e}}function d(){var b=navigator.userAgent,c=function(){return null!==new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(navigator.userAgent)?parseFloat(RegExp.$1):!1}(),d=!!a.chrome,e=b.match(/firefox/i),f=b.match(/safari/i),g=b.match(/iPad/),h=b.match(/iP/),i=b.match(/android/i);return c?{msie:!0,version:c,legacyie:10>c}:g?{ipad:!0,ios:!0,mobile:!0,version:6}:h?{iphone:!0,ios:!0,mobile:!0,version:6}:i?{android:!0,mobile:!0}:d?{chrome:!0}:e?{firefox:!0}:f?{safari:!0}:void 0}a.SKY_SPORTS=a.SKY_SPORTS||{};var e=b.documentElement;SKY_SPORTS.hasFeature=c(),SKY_SPORTS.isDevice=d();for(var f in SKY_SPORTS.isDevice)"version"===f?e.classList.add("version-"+SKY_SPORTS.isDevice[f]):e.classList.add(f);for(var g in SKY_SPORTS.hasFeature)e.classList.add(SKY_SPORTS.hasFeature[g]?g.toDash():"no-"+g.toDash())}(window,document),function(a,b){"use strict";function c(b){var c=b.getBoundingClientRect();return!(c.top+c.height>0&&a.innerHeight-c.top>0&&c.left+c.width>0&&a.innerWidth-c.left>0)}function d(){this.classList.remove("postpone-load")}function e(a){var c,d=/#\{(.+)\}/.exec(a);return d&&(c=parseInt(d[1],10),d=d[0],a=b.currentBreakPoint>c?a.replace(d,b.currentBreakPoint):a.replace(d,c)),a}function f(){for(var b=-1;++b<g.length;){var h=g[b],i=!h.nodeName.match(/img/g);if(!c(h))if(i)h.classList.remove("postpone-load"),h.classList.add("callfn");else{var j=h.dataset,k=j.imageSrc;k?(h.onload=d,h.src=e(k,j.lookup)):h.classList.remove("postpone-load")}}a.setTimeout(function(){a.requestAnimationFrame(f)},250)}var g=b.getElementsByClassName?b.getElementsByClassName("postpone-load"):b.getElementsByTagName("img");f()}(window,document);