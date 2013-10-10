/*! core2 10/10/2013 */
"undefined"==typeof document||"classList"in document.createElement("a")||!function(a){"use strict";if("HTMLElement"in a||"Element"in a){var b="classList",c="prototype",d=(a.HTMLElement||a.Element)[c],e=Object,f=String[c].trim||function(){return this.replace(/^\s+|\s+$/g,"")},g=Array[c].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1},h=function(a,b){this.name=a,this.code=DOMException[a],this.message=b},i=function(a,b){if(""===b)throw new h("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(b))throw new h("INVALID_CHARACTER_ERR","String contains an invalid character");return g.call(a,b)},j=function(a){for(var b=f.call(a.className),c=b?b.split(/\s+/):[],d=0,e=c.length;e>d;d++)this.push(c[d]);this._updateClassName=function(){a.className=this.toString()}},k=j[c]=[],l=function(){return new j(this)};if(h[c]=Error[c],k.item=function(a){return this[a]||null},k.contains=function(a){return a+="",-1!==i(this,a)},k.add=function(){var a,b=arguments,c=0,d=b.length,e=!1;do a=b[c]+"",-1===i(this,a)&&(this.push(a),e=!0);while(++c<d);e&&this._updateClassName()},k.remove=function(){var a,b=arguments,c=0,d=b.length,e=!1;do{a=b[c]+"";var f=i(this,a);-1!==f&&(this.splice(f,1),e=!0)}while(++c<d);e&&this._updateClassName()},k.toggle=function(a,b){a+="";var c=this.contains(a),d=c?b!==!0&&"remove":b!==!1&&"add";return d&&this[d](a),!c},k.toString=function(){return this.join(" ")},e.defineProperty){var m={get:l,enumerable:!0,configurable:!0};try{e.defineProperty(d,b,m)}catch(n){-2146823252===n.number&&(m.enumerable=!1,e.defineProperty(d,b,m))}}else e[c].__defineGetter__&&d.__defineGetter__(b,l)}}(self),window.console||(window.console={}),function(){var a=function(){},b=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],c=b.length,d=0;do"function"!=typeof console[b[d]]&&(console[b[d]]=a),d++;while(c>d)}(),String.prototype.toDash=function(){return this.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})},String.prototype.toCamel=function(){return this.replace(/(\-[a-z])/g,function(a){return a.toUpperCase().replace("-","")})},function(a,b){function c(a,b,c){(a in g==!1||g[a]!==b)&&(g[a]=b,c===!0&&(alert("persist"),h[a]=b),console.log(g,h),e())}function d(a){a in g&&delete g[a],a in h&&delete h[a],e()}function e(){var a=f();i.styleSheet?i.styleSheet=a:i.innerHTML=a}function f(){var a="";for(var b in g)a+=g[b];return a}a.SKY_SPORTS=a.SKY_SPORTS||{};var g={},h={};a.localStorage.getItem("jscss")&&(g=JSON.parse(a.localStorage.getItem("jscss")),h=JSON.parse(a.localStorage.getItem("jscss")));var i=b.createElement("style");i.id="jscss",b.getElementsByTagName("head")[0].appendChild(i),a.addEventListener("beforeunload",function(){a.localStorage.setItem("jscss",JSON.stringify(h))},!1),e(),a.SKY_SPORTS.addCss=c,a.SKY_SPORTS.removeCss=d}(window,document),function(a,b){"use strict";function c(){var c=a.getComputedStyle(b.head,null).getPropertyValue("font-family");return c=parseInt(c.replace(/['"]/g,""),10),b.documentElement.id="current-breakpoint-"+c,c}function d(a,b){function c(){function c(){d=null,a.apply(f,e)}var e,f;d||(e=arguments,f=this,d=setTimeout(c,b))}var d;return c}if(a.addEventListener){var e=b.createEvent("Event");e.initEvent("breakPointChange",!0,!0),e.currentBreakPoint=c,b.currentBreakPoint=c(),a.addEventListener("resize",d(function(){var a=c();a!==b.currentBreakPoint&&(b.currentBreakPoint=a,b.dispatchEvent(e))},300),!1)}}(window,document),function(a,b){function c(){var c=b.createElement("shim");return c.style.cssText="width:10vw;-webkit-animation-name:xxx;-moz-animation-name:xxx;animation-name:xxx;-webkit-appearance:none",{viewportUnits:!!c.style.width,cssAnimations:!!(c.style.animationName||c.style.webkitAnimationName||c.style.mozAnimationName),touch:"ontouchstart"in a||"DocumentTouch"in a&&b instanceof a.documentumentTouch}}function d(){var b=navigator.userAgent,c=function(){return null!==new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(navigator.userAgent)?parseFloat(RegExp.$1):!1}(),d=!!a.chrome,e=b.match(/firefox/i),f=b.match(/safari/i),g=b.match(/iPad/),h=b.match(/iP/),i=b.match(/android/i);return c?{msie:!0,version:c,legacyie:10>c}:g?{ipad:!0,ios:!0,mobile:!0,version:6}:h?{iphone:!0,ios:!0,mobile:!0,version:6}:i?{android:!0,mobile:!0}:d?{chrome:!0}:e?{firefox:!0}:f?{safari:!0}:void 0}a.SKY_SPORTS=a.SKY_SPORTS||{};var e=b.documentElement;SKY_SPORTS.hasFeature=c(),SKY_SPORTS.isDevice=d();for(var f in SKY_SPORTS.isDevice)"version"===f?e.classList.add("version-"+SKY_SPORTS.isDevice[f]):e.classList.add(f);for(var g in SKY_SPORTS.hasFeature)e.classList.add(SKY_SPORTS.hasFeature[g]===!0?g.toDash():"no-"+g.toDash())}(window,document);