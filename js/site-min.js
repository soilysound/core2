/*! core2 19/02/2014 */
var requirejs,require,define;!function(global){function isFunction(a){return"[object Function]"===ostring.call(a)}function isArray(a){return"[object Array]"===ostring.call(a)}function each(a,b){if(a){var c;for(c=0;c<a.length&&(!a[c]||!b(a[c],c,a));c+=1);}}function eachReverse(a,b){if(a){var c;for(c=a.length-1;c>-1&&(!a[c]||!b(a[c],c,a));c-=1);}}function hasProp(a,b){return hasOwn.call(a,b)}function getOwn(a,b){return hasProp(a,b)&&a[b]}function eachProp(a,b){var c;for(c in a)if(hasProp(a,c)&&b(a[c],c))break}function mixin(a,b,c,d){return b&&eachProp(b,function(b,e){(c||!hasProp(a,e))&&(d&&"string"!=typeof b?(a[e]||(a[e]={}),mixin(a[e],b,c,d)):a[e]=b)}),a}function bind(a,b){return function(){return b.apply(a,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(a){throw a}function getGlobal(a){if(!a)return a;var b=global;return each(a.split("."),function(a){b=b[a]}),b}function makeError(a,b,c,d){var e=new Error(b+"\nhttp://requirejs.org/docs/errors.html#"+a);return e.requireType=a,e.requireModules=d,c&&(e.originalError=c),e}function newContext(a){function b(a){var b,c;for(b=0;a[b];b+=1)if(c=a[b],"."===c)a.splice(b,1),b-=1;else if(".."===c){if(1===b&&(".."===a[2]||".."===a[0]))break;b>0&&(a.splice(b-1,2),b-=2)}}function c(a,c,d){var e,f,g,h,i,j,k,l,m,n,o,p=c&&c.split("/"),q=p,r=x.map,s=r&&r["*"];if(a&&"."===a.charAt(0)&&(c?(q=getOwn(x.pkgs,c)?p=[c]:p.slice(0,p.length-1),a=q.concat(a.split("/")),b(a),f=getOwn(x.pkgs,e=a[0]),a=a.join("/"),f&&a===e+"/"+f.main&&(a=e)):0===a.indexOf("./")&&(a=a.substring(2))),d&&r&&(p||s)){for(h=a.split("/"),i=h.length;i>0;i-=1){if(k=h.slice(0,i).join("/"),p)for(j=p.length;j>0;j-=1)if(g=getOwn(r,p.slice(0,j).join("/")),g&&(g=getOwn(g,k))){l=g,m=i;break}if(l)break;!n&&s&&getOwn(s,k)&&(n=getOwn(s,k),o=i)}!l&&n&&(l=n,m=o),l&&(h.splice(0,m,l),a=h.join("/"))}return a}function d(a){isBrowser&&each(scripts(),function(b){return b.getAttribute("data-requiremodule")===a&&b.getAttribute("data-requirecontext")===u.contextName?(b.parentNode.removeChild(b),!0):void 0})}function e(a){var b=getOwn(x.paths,a);return b&&isArray(b)&&b.length>1?(b.shift(),u.require.undef(a),u.require([a]),!0):void 0}function f(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function g(a,b,d,e){var g,h,i,j,k=null,l=b?b.name:null,m=a,n=!0,o="";return a||(n=!1,a="_@r"+(E+=1)),j=f(a),k=j[0],a=j[1],k&&(k=c(k,l,e),h=getOwn(C,k)),a&&(k?o=h&&h.normalize?h.normalize(a,function(a){return c(a,l,e)}):c(a,l,e):(o=c(a,l,e),j=f(o),k=j[0],o=j[1],d=!0,g=u.nameToUrl(o))),i=!k||h||d?"":"_unnormalized"+(F+=1),{prefix:k,name:o,parentMap:b,unnormalized:!!i,url:g,originalName:m,isDefine:n,id:(k?k+"!"+o:o)+i}}function h(a){var b=a.id,c=getOwn(y,b);return c||(c=y[b]=new u.Module(a)),c}function i(a,b,c){var d=a.id,e=getOwn(y,d);!hasProp(C,d)||e&&!e.defineEmitComplete?(e=h(a),e.error&&"error"===b?c(e.error):e.on(b,c)):"defined"===b&&c(C[d])}function j(a,b){var c=a.requireModules,d=!1;b?b(a):(each(c,function(b){var c=getOwn(y,b);c&&(c.error=a,c.events.error&&(d=!0,c.emit("error",a)))}),d||req.onError(a))}function k(){globalDefQueue.length&&(apsp.apply(B,[B.length-1,0].concat(globalDefQueue)),globalDefQueue=[])}function l(a){delete y[a],delete z[a]}function m(a,b,c){var d=a.map.id;a.error?a.emit("error",a.error):(b[d]=!0,each(a.depMaps,function(d,e){var f=d.id,g=getOwn(y,f);!g||a.depMatched[e]||c[f]||(getOwn(b,f)?(a.defineDep(e,C[f]),a.check()):m(g,b,c))}),c[d]=!0)}function n(){var a,b,c,f,g=1e3*x.waitSeconds,h=g&&u.startTime+g<(new Date).getTime(),i=[],k=[],l=!1,o=!0;if(!s){if(s=!0,eachProp(z,function(c){if(a=c.map,b=a.id,c.enabled&&(a.isDefine||k.push(c),!c.error))if(!c.inited&&h)e(b)?(f=!0,l=!0):(i.push(b),d(b));else if(!c.inited&&c.fetched&&a.isDefine&&(l=!0,!a.prefix))return o=!1}),h&&i.length)return c=makeError("timeout","Load timeout for modules: "+i,null,i),c.contextName=u.contextName,j(c);o&&each(k,function(a){m(a,{},{})}),h&&!f||!l||!isBrowser&&!isWebWorker||w||(w=setTimeout(function(){w=0,n()},50)),s=!1}}function o(a){hasProp(C,a[0])||h(g(a[0],null,!0)).init(a[1],a[2])}function p(a,b,c,d){a.detachEvent&&!isOpera?d&&a.detachEvent(d,b):a.removeEventListener(c,b,!1)}function q(a){var b=a.currentTarget||a.srcElement;return p(b,u.onScriptLoad,"load","onreadystatechange"),p(b,u.onScriptError,"error"),{node:b,id:b&&b.getAttribute("data-requiremodule")}}function r(){var a;for(k();B.length;){if(a=B.shift(),null===a[0])return j(makeError("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));o(a)}}var s,t,u,v,w,x={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},config:{}},y={},z={},A={},B=[],C={},D={},E=1,F=1;return v={require:function(a){return a.require?a.require:a.require=u.makeRequire(a.map)},exports:function(a){return a.usingExports=!0,a.map.isDefine?a.exports?a.exports:a.exports=C[a.map.id]={}:void 0},module:function(a){return a.module?a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){var b,c=getOwn(x.pkgs,a.map.id);return b=c?getOwn(x.config,a.map.id+"/"+c.main):getOwn(x.config,a.map.id),b||{}},exports:C[a.map.id]}}},t=function(a){this.events=getOwn(A,a.id)||{},this.map=a,this.shim=getOwn(x.shim,a.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},t.prototype={init:function(a,b,c,d){d=d||{},this.inited||(this.factory=b,c?this.on("error",c):this.events.error&&(c=bind(this,function(a){this.emit("error",a)})),this.depMaps=a&&a.slice(0),this.errback=c,this.inited=!0,this.ignore=d.ignore,d.enabled||this.enabled?this.enable():this.check())},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0,u.startTime=(new Date).getTime();var a=this.map;return this.shim?(u.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return a.prefix?this.callPlugin():this.load()})),void 0):a.prefix?this.callPlugin():this.load()}},load:function(){var a=this.map.url;D[a]||(D[a]=!0,u.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id,d=this.depExports,e=this.exports,f=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(f)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{e=u.execCb(c,f,d,e)}catch(g){a=g}else e=u.execCb(c,f,d,e);if(this.map.isDefine&&(b=this.module,b&&void 0!==b.exports&&b.exports!==this.exports?e=b.exports:void 0===e&&this.usingExports&&(e=this.exports)),a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?"define":"require",j(this.error=a)}else e=f;this.exports=e,this.map.isDefine&&!this.ignore&&(C[c]=e,req.onResourceLoad&&req.onResourceLoad(u,this.map,this.depMaps)),l(c),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var a=this.map,b=a.id,d=g(a.prefix);this.depMaps.push(d),i(d,"defined",bind(this,function(d){var e,f,k,m=this.map.name,n=this.map.parentMap?this.map.parentMap.name:null,o=u.makeRequire(a.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(d.normalize&&(m=d.normalize(m,function(a){return c(a,n,!0)})||""),f=g(a.prefix+"!"+m,this.map.parentMap),i(f,"defined",bind(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),k=getOwn(y,f.id),k&&(this.depMaps.push(f),this.events.error&&k.on("error",bind(this,function(a){this.emit("error",a)})),k.enable()),void 0):(e=bind(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),e.error=bind(this,function(a){this.inited=!0,this.error=a,a.requireModules=[b],eachProp(y,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&l(a.map.id)}),j(a)}),e.fromText=bind(this,function(c,d){var f=a.name,i=g(f),k=useInteractive;d&&(c=d),k&&(useInteractive=!1),h(i),hasProp(x.config,b)&&(x.config[f]=x.config[b]);try{req.exec(c)}catch(l){return j(makeError("fromtexteval","fromText eval for "+b+" failed: "+l,l,[b]))}k&&(useInteractive=!0),this.depMaps.push(i),u.completeLoad(f),o([f],e)}),d.load(a.name,o,e,x),void 0)})),u.enable(d,this),this.pluginMaps[d.id]=d},enable:function(){z[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(a,b){var c,d,e;if("string"==typeof a){if(a=g(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[b]=a,e=getOwn(v,a.id))return this.depExports[b]=e(this),void 0;this.depCount+=1,i(a,"defined",bind(this,function(a){this.defineDep(b,a),this.check()})),this.errback&&i(a,"error",bind(this,this.errback))}c=a.id,d=y[c],hasProp(v,c)||!d||d.enabled||u.enable(a,this)})),eachProp(this.pluginMaps,bind(this,function(a){var b=getOwn(y,a.id);b&&!b.enabled&&u.enable(a,this)})),this.enabling=!1,this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]),c.push(b)},emit:function(a,b){each(this.events[a],function(a){a(b)}),"error"===a&&delete this.events[a]}},u={config:x,contextName:a,registry:y,defined:C,urlFetched:D,defQueue:B,Module:t,makeModuleMap:g,nextTick:req.nextTick,onError:j,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=x.pkgs,c=x.shim,d={paths:!0,config:!0,map:!0};eachProp(a,function(a,b){d[b]?"map"===b?(x.map||(x.map={}),mixin(x[b],a,!0,!0)):mixin(x[b],a,!0):x[b]=a}),a.shim&&(eachProp(a.shim,function(a,b){isArray(a)&&(a={deps:a}),!a.exports&&!a.init||a.exportsFn||(a.exportsFn=u.makeShimExports(a)),c[b]=a}),x.shim=c),a.packages&&(each(a.packages,function(a){var c;a="string"==typeof a?{name:a}:a,c=a.location,b[a.name]={name:a.name,location:c||a.name,main:(a.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}}),x.pkgs=b),eachProp(y,function(a,b){a.inited||a.map.unnormalized||(a.map=g(b))}),(a.deps||a.callback)&&u.require(a.deps||[],a.callback)},makeShimExports:function(a){function b(){var b;return a.init&&(b=a.init.apply(global,arguments)),b||a.exports&&getGlobal(a.exports)}return b},makeRequire:function(b,e){function f(c,d,i){var k,l,m;return e.enableBuildCallback&&d&&isFunction(d)&&(d.__requireJsBuild=!0),"string"==typeof c?isFunction(d)?j(makeError("requireargs","Invalid require call"),i):b&&hasProp(v,c)?v[c](y[b.id]):req.get?req.get(u,c,b,f):(l=g(c,b,!1,!0),k=l.id,hasProp(C,k)?C[k]:j(makeError("notloaded",'Module name "'+k+'" has not been loaded yet for context: '+a+(b?"":". Use require([])")))):(r(),u.nextTick(function(){r(),m=h(g(null,b)),m.skipMap=e.skipMap,m.init(c,d,i,{enabled:!0}),n()}),f)}return e=e||{},mixin(f,{isBrowser:isBrowser,toUrl:function(a){var d,e=a.lastIndexOf("."),f=a.split("/")[0],g="."===f||".."===f;return-1!==e&&(!g||e>1)&&(d=a.substring(e,a.length),a=a.substring(0,e)),u.nameToUrl(c(a,b&&b.id,!0),d,!0)},defined:function(a){return hasProp(C,g(a,b,!1,!0).id)},specified:function(a){return a=g(a,b,!1,!0).id,hasProp(C,a)||hasProp(y,a)}}),b||(f.undef=function(a){k();var c=g(a,b,!0),e=getOwn(y,a);d(a),delete C[a],delete D[c.url],delete A[a],e&&(e.events.defined&&(A[a]=e.events),l(a))}),f},enable:function(a){var b=getOwn(y,a.id);b&&h(a).enable()},completeLoad:function(a){var b,c,d,f=getOwn(x.shim,a)||{},g=f.exports;for(k();B.length;){if(c=B.shift(),null===c[0]){if(c[0]=a,b)break;b=!0}else c[0]===a&&(b=!0);o(c)}if(d=getOwn(y,a),!b&&!hasProp(C,a)&&d&&!d.inited){if(!(!x.enforceDefine||g&&getGlobal(g)))return e(a)?void 0:j(makeError("nodefine","No define call for "+a,null,[a]));o([a,f.deps||[],f.exportsFn])}n()},nameToUrl:function(a,b,c){var d,e,f,g,h,i,j,k,l;if(req.jsExtRegExp.test(a))k=a+(b||"");else{for(d=x.paths,e=x.pkgs,h=a.split("/"),i=h.length;i>0;i-=1){if(j=h.slice(0,i).join("/"),f=getOwn(e,j),l=getOwn(d,j)){isArray(l)&&(l=l[0]),h.splice(0,i,l);break}if(f){g=a===f.name?f.location+"/"+f.main:f.location,h.splice(0,i,g);break}}k=h.join("/"),k+=b||(/^data\:|\?/.test(k)||c?"":".js"),k=("/"===k.charAt(0)||k.match(/^[\w\+\.\-]+:/)?"":x.baseUrl)+k}return x.urlArgs?k+((-1===k.indexOf("?")?"?":"&")+x.urlArgs):k},load:function(a,b){req.load(u,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||readyRegExp.test((a.currentTarget||a.srcElement).readyState)){interactiveScript=null;var b=q(a);u.completeLoad(b.id)}},onScriptError:function(a){var b=q(a);return e(b.id)?void 0:j(makeError("scripterror","Script error for: "+b.id,a,[b.id]))}},u.require=u.makeRequire(),u}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(a){return"interactive"===a.readyState?interactiveScript=a:void 0}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.1.9",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,apsp=ap.splice,isBrowser=!("undefined"==typeof window||"undefined"==typeof navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if("undefined"==typeof define){if("undefined"!=typeof requirejs){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}"undefined"==typeof require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(a,b,c,d){var e,f,g=defContextName;return isArray(a)||"string"==typeof a||(f=a,isArray(b)?(a=b,b=c,c=d):a=[]),f&&f.context&&(g=f.context),e=getOwn(contexts,g),e||(e=contexts[g]=req.s.newContext(g)),f&&e.configure(f),e.require(a,b,c)},req.config=function(a){return req(a)},req.nextTick="undefined"!=typeof setTimeout?function(a){setTimeout(a,4)}:function(a){a()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(a){req[a]=function(){var b=contexts[defContextName];return b.require[a].apply(b,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(a){var b=a.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return b.type=a.scriptType||"text/javascript",b.charset="utf-8",b.async=!0,b},req.load=function(a,b,c){var d,e=a&&a.config||{};if(isBrowser)return d=req.createNode(e,b,c),d.setAttribute("data-requirecontext",a.contextName),d.setAttribute("data-requiremodule",b),!d.attachEvent||d.attachEvent.toString&&d.attachEvent.toString().indexOf("[native code")<0||isOpera?(d.addEventListener("load",a.onScriptLoad,!1),d.addEventListener("error",a.onScriptError,!1)):(useInteractive=!0,d.attachEvent("onreadystatechange",a.onScriptLoad)),d.src=c,currentlyAddingScript=d,baseElement?head.insertBefore(d,baseElement):head.appendChild(d),currentlyAddingScript=null,d;if(isWebWorker)try{importScripts(c),a.completeLoad(b)}catch(f){a.onError(makeError("importscripts","importScripts failed for "+b+" at "+c,f,[b]))}},isBrowser&&!cfg.skipDataMain&&eachReverse(scripts(),function(a){return head||(head=a.parentNode),dataMain=a.getAttribute("data-main"),dataMain?(mainScript=dataMain,cfg.baseUrl||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0):void 0}),define=function(a,b,c){var d,e;"string"!=typeof a&&(c=b,b=a,a=null),isArray(b)||(c=b,b=null),!b&&isFunction(c)&&(b=[],c.length&&(c.toString().replace(commentRegExp,"").replace(cjsRequireRegExp,function(a,c){b.push(c)}),b=(1===c.length?["require"]:["require","exports","module"]).concat(b))),useInteractive&&(d=currentlyAddingScript||getInteractiveScript(),d&&(a||(a=d.getAttribute("data-requiremodule")),e=contexts[d.getAttribute("data-requirecontext")])),(e?e.defQueue:globalDefQueue).push([a,b,c])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}}(this),require.config({baseUrl:"/js",paths:{"adaptive-html":"modules/adaptive-html",fastclick:"vendor/fastclick","nav-secondary-all":"modules/nav-secondary-all",reqwest:"vendor/reqwest","site-layout-primary":"modules/site-layout-primary",underscore:"vendor/lodash.custom",accordian:"modules/accordian","widget-lite":"modules/widget-lite","trigger-event":"modules/trigger-event"}}),define("fastclick",[],function(){function a(b){"use strict";var c,d=this;if(this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=10,this.layer=b,!b||!b.nodeType)throw new TypeError("Layer must be a document node");this.onClick=function(){return a.prototype.onClick.apply(d,arguments)},this.onMouse=function(){return a.prototype.onMouse.apply(d,arguments)},this.onTouchStart=function(){return a.prototype.onTouchStart.apply(d,arguments)},this.onTouchMove=function(){return a.prototype.onTouchMove.apply(d,arguments)},this.onTouchEnd=function(){return a.prototype.onTouchEnd.apply(d,arguments)},this.onTouchCancel=function(){return a.prototype.onTouchCancel.apply(d,arguments)},a.notNeeded(b)||(this.deviceIsAndroid&&(b.addEventListener("mouseover",this.onMouse,!0),b.addEventListener("mousedown",this.onMouse,!0),b.addEventListener("mouseup",this.onMouse,!0)),b.addEventListener("click",this.onClick,!0),b.addEventListener("touchstart",this.onTouchStart,!1),b.addEventListener("touchmove",this.onTouchMove,!1),b.addEventListener("touchend",this.onTouchEnd,!1),b.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(b.removeEventListener=function(a,c,d){var e=Node.prototype.removeEventListener;"click"===a?e.call(b,a,c.hijacked||c,d):e.call(b,a,c,d)},b.addEventListener=function(a,c,d){var e=Node.prototype.addEventListener;"click"===a?e.call(b,a,c.hijacked||(c.hijacked=function(a){a.propagationStopped||c(a)}),d):e.call(b,a,c,d)}),"function"==typeof b.onclick&&(c=b.onclick,b.addEventListener("click",function(a){c(a)},!1),b.onclick=null))}return a.prototype.deviceIsAndroid=navigator.userAgent.indexOf("Android")>0,a.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent),a.prototype.deviceIsIOS4=a.prototype.deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent),a.prototype.deviceIsIOSWithBadTarget=a.prototype.deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),a.prototype.needsClick=function(a){"use strict";switch(a.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(a.disabled)return!0;break;case"input":if(this.deviceIsIOS&&"file"===a.type||a.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(a.className)},a.prototype.needsFocus=function(a){"use strict";switch(a.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!this.deviceIsAndroid;case"input":switch(a.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!a.disabled&&!a.readOnly;default:return/\bneedsfocus\b/.test(a.className)}},a.prototype.sendClick=function(a,b){"use strict";var c,d;document.activeElement&&document.activeElement!==a&&document.activeElement.blur(),d=b.changedTouches[0],c=document.createEvent("MouseEvents"),c.initMouseEvent(this.determineEventType(a),!0,!0,window,1,d.screenX,d.screenY,d.clientX,d.clientY,!1,!1,!1,!1,0,null),c.forwardedTouchEvent=!0,a.dispatchEvent(c)},a.prototype.determineEventType=function(a){"use strict";return this.deviceIsAndroid&&"select"===a.tagName.toLowerCase()?"mousedown":"click"},a.prototype.focus=function(a){"use strict";var b;this.deviceIsIOS&&a.setSelectionRange&&0!==a.type.indexOf("date")&&"time"!==a.type?(b=a.value.length,a.setSelectionRange(b,b)):a.focus()},a.prototype.updateScrollParent=function(a){"use strict";var b,c;if(b=a.fastClickScrollParent,!b||!b.contains(a)){c=a;do{if(c.scrollHeight>c.offsetHeight){b=c,a.fastClickScrollParent=c;break}c=c.parentElement}while(c)}b&&(b.fastClickLastScrollTop=b.scrollTop)},a.prototype.getTargetElementFromEventTarget=function(a){"use strict";return a.nodeType===Node.TEXT_NODE?a.parentNode:a},a.prototype.onTouchStart=function(a){"use strict";var b,c,d;if(a.targetTouches.length>1)return!0;if(b=this.getTargetElementFromEventTarget(a.target),c=a.targetTouches[0],this.deviceIsIOS){if(d=window.getSelection(),d.rangeCount&&!d.isCollapsed)return!0;if(!this.deviceIsIOS4){if(c.identifier===this.lastTouchIdentifier)return a.preventDefault(),!1;this.lastTouchIdentifier=c.identifier,this.updateScrollParent(b)}}return this.trackingClick=!0,this.trackingClickStart=a.timeStamp,this.targetElement=b,this.touchStartX=c.pageX,this.touchStartY=c.pageY,a.timeStamp-this.lastClickTime<200&&a.preventDefault(),!0},a.prototype.touchHasMoved=function(a){"use strict";var b=a.changedTouches[0],c=this.touchBoundary;return Math.abs(b.pageX-this.touchStartX)>c||Math.abs(b.pageY-this.touchStartY)>c?!0:!1},a.prototype.onTouchMove=function(a){"use strict";return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(a.target)||this.touchHasMoved(a))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},a.prototype.findControl=function(a){"use strict";return void 0!==a.control?a.control:a.htmlFor?document.getElementById(a.htmlFor):a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},a.prototype.onTouchEnd=function(a){"use strict";var b,c,d,e,f,g=this.targetElement;if(!this.trackingClick)return!0;if(a.timeStamp-this.lastClickTime<200)return this.cancelNextClick=!0,!0;if(this.cancelNextClick=!1,this.lastClickTime=a.timeStamp,c=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,this.deviceIsIOSWithBadTarget&&(f=a.changedTouches[0],g=document.elementFromPoint(f.pageX-window.pageXOffset,f.pageY-window.pageYOffset)||g,g.fastClickScrollParent=this.targetElement.fastClickScrollParent),d=g.tagName.toLowerCase(),"label"===d){if(b=this.findControl(g)){if(this.focus(g),this.deviceIsAndroid)return!1;g=b}}else if(this.needsFocus(g))return a.timeStamp-c>100||this.deviceIsIOS&&window.top!==window&&"input"===d?(this.targetElement=null,!1):(this.focus(g),this.deviceIsIOS4&&"select"===d||(this.targetElement=null,a.preventDefault()),!1);return this.deviceIsIOS&&!this.deviceIsIOS4&&(e=g.fastClickScrollParent,e&&e.fastClickLastScrollTop!==e.scrollTop)?!0:(this.needsClick(g)||(a.preventDefault(),this.sendClick(g,a)),!1)},a.prototype.onTouchCancel=function(){"use strict";this.trackingClick=!1,this.targetElement=null},a.prototype.onMouse=function(a){"use strict";return this.targetElement?a.forwardedTouchEvent?!0:a.cancelable?!this.needsClick(this.targetElement)||this.cancelNextClick?(a.stopImmediatePropagation?a.stopImmediatePropagation():a.propagationStopped=!0,a.stopPropagation(),a.preventDefault(),!1):!0:!0:!0},a.prototype.onClick=function(a){"use strict";var b;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===a.target.type&&0===a.detail?!0:(b=this.onMouse(a),b||(this.targetElement=null),b)},a.prototype.destroy=function(){"use strict";var a=this.layer;this.deviceIsAndroid&&(a.removeEventListener("mouseover",this.onMouse,!0),a.removeEventListener("mousedown",this.onMouse,!0),a.removeEventListener("mouseup",this.onMouse,!0)),a.removeEventListener("click",this.onClick,!0),a.removeEventListener("touchstart",this.onTouchStart,!1),a.removeEventListener("touchmove",this.onTouchMove,!1),a.removeEventListener("touchend",this.onTouchEnd,!1),a.removeEventListener("touchcancel",this.onTouchCancel,!1)},a.notNeeded=function(b){"use strict";var c,d;if("undefined"==typeof window.ontouchstart)return!0;if(d=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!a.prototype.deviceIsAndroid)return!0;if(c=document.querySelector("meta[name=viewport]")){if(-1!==c.content.indexOf("user-scalable=no"))return!0;if(d>31&&window.innerWidth<=window.screen.width)return!0}}return"none"===b.style.msTouchAction?!0:!1},a.attach=function(b){"use strict";return new a(b)},a}),function(){function a(a,b,c){for(var d=(c||0)-1,e=a?a.length:0;++d<e;)if(a[d]===b)return d;return-1}function b(b,c){var d=typeof c;if(b=b.cache,"boolean"==d||null==c)return b[c]?0:-1;"number"!=d&&"string"!=d&&(d="object");var e="number"==d?c:K+c;return b=(b=b[d])&&b[e],"object"==d?b&&a(b,c)>-1?0:-1:b?0:-1}function c(a){var b=this.cache,c=typeof a;if("boolean"==c||null==a)b[a]=!0;else{"number"!=c&&"string"!=c&&(c="object");var d="number"==c?a:K+a,e=b[c]||(b[c]={});"object"==c?(e[d]||(e[d]=[])).push(a):e[d]=!0}}function d(a){var b=-1,d=a.length,e=a[0],g=a[d/2|0],h=a[d-1];if(e&&"object"==typeof e&&g&&"object"==typeof g&&h&&"object"==typeof h)return!1;var i=f();i["false"]=i["null"]=i["true"]=i.undefined=!1;var j=f();for(j.array=a,j.cache=i,j.push=c;++b<d;)j.push(a[b]);return j}function e(){return H.pop()||[]}function f(){return I.pop()||{array:null,cache:null,"false":!1,"null":!1,number:null,object:null,push:null,string:null,"true":!1,undefined:!1}}function g(a){a.length=0,H.length<M&&H.push(a)}function h(a){var b=a.cache;b&&h(b),a.array=a.cache=a.object=a.number=a.string=null,I.length<M&&I.push(a)}function i(a,b,c){b||(b=0),"undefined"==typeof c&&(c=a?a.length:0);for(var d=-1,e=c-b||0,f=Array(0>e?0:e);++d<e;)f[d]=a[b+d];return f}function j(){}function l(a){function b(){if(d){var a=d.slice();lb.apply(a,arguments)}if(this instanceof b){var f=m(c.prototype),g=c.apply(f,a||arguments);return x(g)?g:f}return c.apply(e,a||arguments)}var c=a[0],d=a[2],e=a[4];return vb(b,a),b}function m(a){return x(a)?ob(a):{}}function n(a,b,c){if("function"!=typeof a)return F;if("undefined"==typeof b||!("prototype"in a))return a;var d=a.__bindData__;if("undefined"==typeof d&&(tb.funcNames&&(d=!a.name),d=d||!tb.funcDecomp,!d)){var e=jb.call(a);tb.funcNames||(d=!N.test(e)),d||(d=O.test(e),vb(a,d))}if(d===!1||d!==!0&&1&d[1])return a;switch(c){case 1:return function(c){return a.call(b,c)};case 2:return function(c,d){return a.call(b,c,d)};case 3:return function(c,d,e){return a.call(b,c,d,e)};case 4:return function(c,d,e,f){return a.call(b,c,d,e,f)}}return D(a,b)}function o(a){function b(){var a=j?g:this;if(e){var q=e.slice();lb.apply(q,arguments)}if((f||l)&&(q||(q=i(arguments)),f&&lb.apply(q,f),l&&q.length<h))return d|=16,o([c,n?d:-4&d,q,null,g,h]);if(q||(q=arguments),k&&(c=a[p]),this instanceof b){a=m(c.prototype);var r=c.apply(a,q);return x(r)?r:a}return c.apply(a,q)}var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5],j=1&d,k=2&d,l=4&d,n=8&d,p=c;return vb(b,a),b}function p(c,e){var f=-1,g=u(),i=c?c.length:0,j=i>=L&&g===a,k=[];if(j){var l=d(e);l?(g=b,e=l):j=!1}for(;++f<i;){var m=c[f];g(e,m)<0&&k.push(m)}return j&&h(e),k}function q(a,b,c,d){for(var e=(d||0)-1,f=a?a.length:0,g=[];++e<f;){var h=a[e];if(h&&"object"==typeof h&&"number"==typeof h.length&&(wb(h)||v(h))){b||(h=q(h,b,c));var i=-1,j=h.length,k=g.length;for(g.length+=j;++i<j;)g[k++]=h[i]}else c||g.push(h)}return g}function r(a,b,c,d,f,h){if(c){var i=c(a,b);if("undefined"!=typeof i)return!!i}if(a===b)return 0!==a||1/a==1/b;var j=typeof a,k=typeof b;if(!(a!==a||a&&ab[j]||b&&ab[k]))return!1;if(null==a||null==b)return a===b;var l=hb.call(a),m=hb.call(b);if(l==Q&&(l=X),m==Q&&(m=X),l!=m)return!1;switch(l){case S:case T:return+a==+b;case W:return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case Y:case Z:return a==String(b)}var n=l==R;if(!n){var o=kb.call(a,"__wrapped__"),p=kb.call(b,"__wrapped__");if(o||p)return r(o?a.__wrapped__:a,p?b.__wrapped__:b,c,d,f,h);if(l!=X)return!1;var q=!tb.argsObject&&v(a)?Object:a.constructor,s=!tb.argsObject&&v(b)?Object:b.constructor;if(q!=s&&!(w(q)&&q instanceof q&&w(s)&&s instanceof s)&&"constructor"in a&&"constructor"in b)return!1}var t=!f;f||(f=e()),h||(h=e());for(var u=f.length;u--;)if(f[u]==a)return h[u]==b;var x=0;if(i=!0,f.push(a),h.push(b),n){if(u=a.length,x=b.length,i=x==a.length,!i&&!d)return i;for(;x--;){var y=u,z=b[x];if(d)for(;y--&&!(i=r(a[y],z,c,d,f,h)););else if(!(i=r(a[x],z,c,d,f,h)))break}return i}return Eb(b,function(b,e,g){return kb.call(g,e)?(x++,i=kb.call(a,e)&&r(a[e],b,c,d,f,h)):void 0}),i&&!d&&Eb(a,function(a,b,c){return kb.call(c,b)?i=--x>-1:void 0}),t&&(g(f),g(h)),i}function s(a,b,c,d,e,f){var g=1&b,h=2&b,i=4&b,j=16&b,k=32&b;if(!h&&!w(a))throw new TypeError;j&&!c.length&&(b&=-17,j=c=!1),k&&!d.length&&(b&=-33,k=d=!1);var m=a&&a.__bindData__;if(m&&m!==!0)return m=m.slice(),!g||1&m[1]||(m[4]=e),!g&&1&m[1]&&(b|=8),!i||4&m[1]||(m[5]=f),j&&lb.apply(m[2]||(m[2]=[]),c),k&&lb.apply(m[3]||(m[3]=[]),d),m[1]|=b,s.apply(null,m);var n=1==b||17===b?l:o;return n([a,b,c,d,e,f])}function t(){_.shadowedProps=P,_.array=_.bottom=_.loop=_.top="",_.init="iterable",_.useHas=!0;for(var a,b=0;a=arguments[b];b++)for(var c in a)_[c]=a[c];var d=_.args;_.firstArg=/^[^,]+/.exec(d)[0];var e=Function("baseCreateCallback, errorClass, errorProto, hasOwnProperty, indicatorObject, isArguments, isArray, isString, keys, objectProto, objectTypes, nonEnumProps, stringClass, stringProto, toString","return function("+d+") {\n"+ub(_)+"\n}");return e(n,U,eb,kb,J,v,wb,y,_.keys,fb,ab,sb,Z,gb,hb)}function u(){var b=(b=j.indexOf)===B?a:b;return b}function v(a){return a&&"object"==typeof a&&"number"==typeof a.length&&hb.call(a)==Q||!1}function w(a){return"function"==typeof a}function x(a){return!(!a||!ab[typeof a])}function y(a){return"string"==typeof a||a&&"object"==typeof a&&hb.call(a)==Z||!1}function z(a,b,c){if(b&&"undefined"==typeof c&&wb(a))for(var d=-1,e=a.length;++d<e&&b(a[d],d,a)!==!1;);else Cb(a,b,c);return a}function A(a){return p(a,q(arguments,!0,!0,1))}function B(b,c,d){if("number"==typeof d){var e=b?b.length:0;d=0>d?rb(0,e+d):d||0}else if(d){var f=C(b,c);return b[f]===c?f:-1}return a(b,c,d)}function C(a,b,c,d){var e=0,f=a?a.length:e;for(c=c?j.createCallback(c,d,1):F,b=c(b);f>e;){var g=e+f>>>1;c(a[g])<b?e=g+1:f=g}return e}function D(a,b){return arguments.length>2?s(a,17,i(arguments,2),null,b):s(a,1,null,null,b)}function E(a,b,c){var d=typeof a;if(null==a||"function"==d)return n(a,b,c);if("object"!=d)return function(b){return b[a]};var e=yb(a),f=e[0],g=a[f];return 1!=e.length||g!==g||x(g)?function(b){for(var c=e.length,d=!1;c--&&(d=r(b[e[c]],a[e[c]],null,!0)););return d}:function(a){var b=a[f];return g===b&&(0!==g||1/g==1/b)}}function F(a){return a}function G(){}var H=[],I=[],J={},K=+new Date+"",L=75,M=40,N=/^\s*function[ \n\r\t]+\w/,O=/\bthis\b/,P=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],Q="[object Arguments]",R="[object Array]",S="[object Boolean]",T="[object Date]",U="[object Error]",V="[object Function]",W="[object Number]",X="[object Object]",Y="[object RegExp]",Z="[object String]",$={configurable:!1,enumerable:!1,value:null,writable:!1},_={args:"",array:null,bottom:"",firstArg:"",init:"",keys:null,loop:"",shadowedProps:null,support:null,top:"",useHas:!1},ab={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},bb=ab[typeof window]&&window||this,cb=ab[typeof global]&&global;!cb||cb.global!==cb&&cb.window!==cb||(bb=cb);var db=[],eb=Error.prototype,fb=Object.prototype,gb=String.prototype,hb=fb.toString,ib=RegExp("^"+String(hb).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),jb=Function.prototype.toString,kb=fb.hasOwnProperty,lb=db.push,mb=fb.propertyIsEnumerable,nb=function(){try{var a={},b=ib.test(b=Object.defineProperty)&&b,c=b(a,a,a)&&b}catch(d){}return c
}(),ob=ib.test(ob=Object.create)&&ob,pb=ib.test(pb=Array.isArray)&&pb,qb=ib.test(qb=Object.keys)&&qb,rb=Math.max,sb={};sb[R]=sb[T]=sb[W]={constructor:!0,toLocaleString:!0,toString:!0,valueOf:!0},sb[S]=sb[Z]={constructor:!0,toString:!0,valueOf:!0},sb[U]=sb[V]=sb[Y]={constructor:!0,toString:!0},sb[X]={constructor:!0},function(){for(var a=P.length;a--;){var b=P[a];for(var c in sb)kb.call(sb,c)&&!kb.call(sb[c],b)&&(sb[c][b]=!1)}}();var tb=j.support={};!function(){var a=function(){this.x=1},b={0:1,length:1},c=[];a.prototype={valueOf:1,y:1};for(var d in new a)c.push(d);for(d in arguments);tb.argsClass=hb.call(arguments)==Q,tb.argsObject=arguments.constructor==Object&&!(arguments instanceof Array),tb.enumErrorProps=mb.call(eb,"message")||mb.call(eb,"name"),tb.enumPrototypes=mb.call(a,"prototype"),tb.funcDecomp=!ib.test(bb.WinRTError)&&O.test(function(){return this}),tb.funcNames="string"==typeof Function.name,tb.nonEnumArgs=0!=d,tb.nonEnumShadows=!/valueOf/.test(c),tb.spliceObjects=(db.splice.call(b,0,1),!b[0]),tb.unindexedChars="x"[0]+Object("x")[0]!="xx"}(1);var ub=function(a){var b="var index, iterable = "+a.firstArg+", result = "+a.init+";\nif (!iterable) return result;\n"+a.top+";";a.array?(b+="\nvar length = iterable.length; index = -1;\nif ("+a.array+") {  ",tb.unindexedChars&&(b+="\n  if (isString(iterable)) {\n    iterable = iterable.split('')\n  }  "),b+="\n  while (++index < length) {\n    "+a.loop+";\n  }\n}\nelse {  "):tb.nonEnumArgs&&(b+="\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += '';\n      "+a.loop+";\n    }\n  } else {  "),tb.enumPrototypes&&(b+="\n  var skipProto = typeof iterable == 'function';\n  "),tb.enumErrorProps&&(b+="\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  ");var c=[];if(tb.enumPrototypes&&c.push('!(skipProto && index == "prototype")'),tb.enumErrorProps&&c.push('!(skipErrorProps && (index == "message" || index == "name"))'),a.useHas&&a.keys)b+="\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n",c.length&&(b+="    if ("+c.join(" && ")+") {\n  "),b+=a.loop+";    ",c.length&&(b+="\n    }"),b+="\n  }  ";else if(b+="\n  for (index in iterable) {\n",a.useHas&&c.push("hasOwnProperty.call(iterable, index)"),c.length&&(b+="    if ("+c.join(" && ")+") {\n  "),b+=a.loop+";    ",c.length&&(b+="\n    }"),b+="\n  }    ",tb.nonEnumShadows){for(b+="\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ",k=0;7>k;k++)b+="\n    index = '"+a.shadowedProps[k]+"';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))",a.useHas||(b+=" || (!nonEnum[index] && iterable[index] !== objectProto[index])"),b+=") {\n      "+a.loop+";\n    }      ";b+="\n  }    "}return(a.array||tb.nonEnumArgs)&&(b+="\n}"),b+=a.bottom+";\nreturn result"};ob||(m=function(){function a(){}return function(b){if(x(b)){a.prototype=b;var c=new a;a.prototype=null}return c||bb.Object()}}());var vb=nb?function(a,b){$.value=b,nb(a,"__bindData__",$)}:G;tb.argsClass||(v=function(a){return a&&"object"==typeof a&&"number"==typeof a.length&&kb.call(a,"callee")&&!mb.call(a,"callee")||!1});var wb=pb||function(a){return a&&"object"==typeof a&&"number"==typeof a.length&&hb.call(a)==R||!1},xb=t({args:"object",init:"[]",top:"if (!(objectTypes[typeof object])) return result",loop:"result.push(index)"}),yb=qb?function(a){return x(a)?tb.enumPrototypes&&"function"==typeof a||tb.nonEnumArgs&&a.length&&v(a)?xb(a):qb(a):[]}:xb,zb={args:"collection, callback, thisArg",top:"callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",array:"typeof length == 'number'",keys:yb,loop:"if (callback(iterable[index], index, collection) === false) return result"},Ab={args:"object, source, guard",top:"var args = arguments,\n    argsIndex = 0,\n    argsLength = typeof guard == 'number' ? 2 : args.length;\nwhile (++argsIndex < argsLength) {\n  iterable = args[argsIndex];\n  if (iterable && objectTypes[typeof iterable]) {",keys:yb,loop:"if (typeof result[index] == 'undefined') result[index] = iterable[index]",bottom:"  }\n}"},Bb={top:"if (!objectTypes[typeof iterable]) return result;\n"+zb.top,array:!1},Cb=t(zb),Db=t(Ab,{top:Ab.top.replace(";",";\nif (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n  callback = args[--argsLength];\n}"),loop:"result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]"}),Eb=t(zb,Bb,{useHas:!1});w(/x/)&&(w=function(a){return"function"==typeof a&&hb.call(a)==V}),j.assign=Db,j.bind=D,j.createCallback=E,j.difference=A,j.forEach=z,j.forIn=Eb,j.keys=yb,j.each=z,j.extend=Db,j.identity=F,j.indexOf=B,j.isArguments=v,j.isArray=wb,j.isFunction=w,j.isObject=x,j.isString=y,j.noop=G,j.sortedIndex=C,j.VERSION="2.3.0","function"==typeof define&&"object"==typeof define.amd&&define.amd&&define("underscore",[],function(){return j})}.call(this),function(){"use strict";SKY_SPORTS.hasFeature.touch&&require(["fastclick"],function(a){a.attach(document.body)}),require(["widget-lite"],function(a){a.init()})}();