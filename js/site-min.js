/*! core2 19/11/2013 */
function FastClick(a){"use strict";var b,c=this;if(this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=10,this.layer=a,!a||!a.nodeType)throw new TypeError("Layer must be a document node");this.onClick=function(){return FastClick.prototype.onClick.apply(c,arguments)},this.onMouse=function(){return FastClick.prototype.onMouse.apply(c,arguments)},this.onTouchStart=function(){return FastClick.prototype.onTouchStart.apply(c,arguments)},this.onTouchMove=function(){return FastClick.prototype.onTouchMove.apply(c,arguments)},this.onTouchEnd=function(){return FastClick.prototype.onTouchEnd.apply(c,arguments)},this.onTouchCancel=function(){return FastClick.prototype.onTouchCancel.apply(c,arguments)},FastClick.notNeeded(a)||(this.deviceIsAndroid&&(a.addEventListener("mouseover",this.onMouse,!0),a.addEventListener("mousedown",this.onMouse,!0),a.addEventListener("mouseup",this.onMouse,!0)),a.addEventListener("click",this.onClick,!0),a.addEventListener("touchstart",this.onTouchStart,!1),a.addEventListener("touchmove",this.onTouchMove,!1),a.addEventListener("touchend",this.onTouchEnd,!1),a.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(a.removeEventListener=function(b,c,d){var e=Node.prototype.removeEventListener;"click"===b?e.call(a,b,c.hijacked||c,d):e.call(a,b,c,d)},a.addEventListener=function(b,c,d){var e=Node.prototype.addEventListener;"click"===b?e.call(a,b,c.hijacked||(c.hijacked=function(a){a.propagationStopped||c(a)}),d):e.call(a,b,c,d)}),"function"==typeof a.onclick&&(b=a.onclick,a.addEventListener("click",function(a){b(a)},!1),a.onclick=null))}FastClick.prototype.deviceIsAndroid=navigator.userAgent.indexOf("Android")>0,FastClick.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent),FastClick.prototype.deviceIsIOS4=FastClick.prototype.deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent),FastClick.prototype.deviceIsIOSWithBadTarget=FastClick.prototype.deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),FastClick.prototype.needsClick=function(a){"use strict";switch(a.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(a.disabled)return!0;break;case"input":if(this.deviceIsIOS&&"file"===a.type||a.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(a.className)},FastClick.prototype.needsFocus=function(a){"use strict";switch(a.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!this.deviceIsAndroid;case"input":switch(a.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!a.disabled&&!a.readOnly;default:return/\bneedsfocus\b/.test(a.className)}},FastClick.prototype.sendClick=function(a,b){"use strict";var c,d;document.activeElement&&document.activeElement!==a&&document.activeElement.blur(),d=b.changedTouches[0],c=document.createEvent("MouseEvents"),c.initMouseEvent(this.determineEventType(a),!0,!0,window,1,d.screenX,d.screenY,d.clientX,d.clientY,!1,!1,!1,!1,0,null),c.forwardedTouchEvent=!0,a.dispatchEvent(c)},FastClick.prototype.determineEventType=function(a){"use strict";return this.deviceIsAndroid&&"select"===a.tagName.toLowerCase()?"mousedown":"click"},FastClick.prototype.focus=function(a){"use strict";var b;this.deviceIsIOS&&a.setSelectionRange&&0!==a.type.indexOf("date")&&"time"!==a.type?(b=a.value.length,a.setSelectionRange(b,b)):a.focus()},FastClick.prototype.updateScrollParent=function(a){"use strict";var b,c;if(b=a.fastClickScrollParent,!b||!b.contains(a)){c=a;do{if(c.scrollHeight>c.offsetHeight){b=c,a.fastClickScrollParent=c;break}c=c.parentElement}while(c)}b&&(b.fastClickLastScrollTop=b.scrollTop)},FastClick.prototype.getTargetElementFromEventTarget=function(a){"use strict";return a.nodeType===Node.TEXT_NODE?a.parentNode:a},FastClick.prototype.onTouchStart=function(a){"use strict";var b,c,d;if(a.targetTouches.length>1)return!0;if(b=this.getTargetElementFromEventTarget(a.target),c=a.targetTouches[0],this.deviceIsIOS){if(d=window.getSelection(),d.rangeCount&&!d.isCollapsed)return!0;if(!this.deviceIsIOS4){if(c.identifier===this.lastTouchIdentifier)return a.preventDefault(),!1;this.lastTouchIdentifier=c.identifier,this.updateScrollParent(b)}}return this.trackingClick=!0,this.trackingClickStart=a.timeStamp,this.targetElement=b,this.touchStartX=c.pageX,this.touchStartY=c.pageY,a.timeStamp-this.lastClickTime<200&&a.preventDefault(),!0},FastClick.prototype.touchHasMoved=function(a){"use strict";var b=a.changedTouches[0],c=this.touchBoundary;return Math.abs(b.pageX-this.touchStartX)>c||Math.abs(b.pageY-this.touchStartY)>c?!0:!1},FastClick.prototype.onTouchMove=function(a){"use strict";return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(a.target)||this.touchHasMoved(a))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},FastClick.prototype.findControl=function(a){"use strict";return void 0!==a.control?a.control:a.htmlFor?document.getElementById(a.htmlFor):a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},FastClick.prototype.onTouchEnd=function(a){"use strict";var b,c,d,e,f,g=this.targetElement;if(!this.trackingClick)return!0;if(a.timeStamp-this.lastClickTime<200)return this.cancelNextClick=!0,!0;if(this.cancelNextClick=!1,this.lastClickTime=a.timeStamp,c=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,this.deviceIsIOSWithBadTarget&&(f=a.changedTouches[0],g=document.elementFromPoint(f.pageX-window.pageXOffset,f.pageY-window.pageYOffset)||g,g.fastClickScrollParent=this.targetElement.fastClickScrollParent),d=g.tagName.toLowerCase(),"label"===d){if(b=this.findControl(g)){if(this.focus(g),this.deviceIsAndroid)return!1;g=b}}else if(this.needsFocus(g))return a.timeStamp-c>100||this.deviceIsIOS&&window.top!==window&&"input"===d?(this.targetElement=null,!1):(this.focus(g),this.deviceIsIOS4&&"select"===d||(this.targetElement=null,a.preventDefault()),!1);return this.deviceIsIOS&&!this.deviceIsIOS4&&(e=g.fastClickScrollParent,e&&e.fastClickLastScrollTop!==e.scrollTop)?!0:(this.needsClick(g)||(a.preventDefault(),this.sendClick(g,a)),!1)},FastClick.prototype.onTouchCancel=function(){"use strict";this.trackingClick=!1,this.targetElement=null},FastClick.prototype.onMouse=function(a){"use strict";return this.targetElement?a.forwardedTouchEvent?!0:a.cancelable?!this.needsClick(this.targetElement)||this.cancelNextClick?(a.stopImmediatePropagation?a.stopImmediatePropagation():a.propagationStopped=!0,a.stopPropagation(),a.preventDefault(),!1):!0:!0:!0},FastClick.prototype.onClick=function(a){"use strict";var b;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===a.target.type&&0===a.detail?!0:(b=this.onMouse(a),b||(this.targetElement=null),b)},FastClick.prototype.destroy=function(){"use strict";var a=this.layer;this.deviceIsAndroid&&(a.removeEventListener("mouseover",this.onMouse,!0),a.removeEventListener("mousedown",this.onMouse,!0),a.removeEventListener("mouseup",this.onMouse,!0)),a.removeEventListener("click",this.onClick,!0),a.removeEventListener("touchstart",this.onTouchStart,!1),a.removeEventListener("touchmove",this.onTouchMove,!1),a.removeEventListener("touchend",this.onTouchEnd,!1),a.removeEventListener("touchcancel",this.onTouchCancel,!1)},FastClick.notNeeded=function(a){"use strict";var b,c;if("undefined"==typeof window.ontouchstart)return!0;if(c=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!FastClick.prototype.deviceIsAndroid)return!0;if(b=document.querySelector("meta[name=viewport]")){if(-1!==b.content.indexOf("user-scalable=no"))return!0;if(c>31&&window.innerWidth<=window.screen.width)return!0}}return"none"===a.style.msTouchAction?!0:!1},FastClick.attach=function(a){"use strict";return new FastClick(a)},"undefined"!=typeof define&&define.amd?define(function(){"use strict";return FastClick}):"undefined"!=typeof module&&module.exports?(module.exports=FastClick.attach,module.exports.FastClick=FastClick):window.FastClick=FastClick,function(){function a(a,b,c){c=(c||0)-1;for(var d=a?a.length:0;++c<d;)if(a[c]===b)return c;return-1}function b(b,c){var d=typeof c;if(b=b.l,"boolean"==d||null==c)return b[c]?0:-1;"number"!=d&&"string"!=d&&(d="object");var e="number"==d?c:D+c;return b=(b=b[d])&&b[e],"object"==d?b&&-1<a(b,c)?0:-1:b?0:-1}function c(a){var b=this.l,c=typeof a;if("boolean"==c||null==a)b[a]=!0;else{"number"!=c&&"string"!=c&&(c="object");var d="number"==c?a:D+a,b=b[c]||(b[c]={});"object"==c?(b[d]||(b[d]=[])).push(a):b[d]=!0}}function d(){return B.pop()||{k:null,l:null,"false":!1,"null":!1,number:null,object:null,push:null,string:null,"true":!1,undefined:!1}}function e(a){a.length=0,A.length<E&&A.push(a)}function f(a){var b=a.l;b&&f(b),a.k=a.l=a.object=a.number=a.string=null,B.length<E&&B.push(a)}function g(a,b){var c;b||(b=0),"undefined"==typeof c&&(c=a?a.length:0);var d=-1;c=c-b||0;for(var e=Array(0>c?0:c);++d<c;)e[d]=a[b+d];return e}function h(){}function i(a){function b(){if(d){var a=d.slice();cb.apply(a,arguments)}if(this instanceof b){var f=j(c.prototype),a=c.apply(f,a||arguments);return t(a)?a:f}return c.apply(e,a||arguments)}var c=a[0],d=a[2],e=a[4];return lb(b,a),b}function j(a){return t(a)?fb(a):{}}function l(a,b,c){if("function"!=typeof a)return y;if("undefined"==typeof b||!("prototype"in a))return a;var d=a.__bindData__;if("undefined"==typeof d&&(kb.funcNames&&(d=!a.name),d=d||!kb.funcDecomp,!d)){var e=ab.call(a);kb.funcNames||(d=!F.test(e)),d||(d=G.test(e),lb(a,d))}if(!1===d||!0!==d&&1&d[1])return a;switch(c){case 1:return function(c){return a.call(b,c)};case 2:return function(c,d){return a.call(b,c,d)};case 3:return function(c,d,e){return a.call(b,c,d,e)};case 4:return function(c,d,e,f){return a.call(b,c,d,e,f)}}return x(a,b)}function m(a){function b(){var a=k?h:this;if(e){var q=e.slice();cb.apply(q,arguments)}return(f||n)&&(q||(q=g(arguments)),f&&cb.apply(q,f),n&&q.length<i)?(d|=16,m([c,o?d:-4&d,q,null,h,i])):(q||(q=arguments),l&&(c=a[p]),this instanceof b?(a=j(c.prototype),q=c.apply(a,q),t(q)?q:a):c.apply(a,q))}var c=a[0],d=a[1],e=a[2],f=a[3],h=a[4],i=a[5],k=1&d,l=2&d,n=4&d,o=8&d,p=c;return lb(b,a),b}function n(a,b,c,d){d=(d||0)-1;for(var e=a?a.length:0,f=[];++d<e;){var g=a[d];if(g&&"object"==typeof g&&"number"==typeof g.length&&(mb(g)||r(g))){b||(g=n(g,b,c));var h=-1,i=g.length,j=f.length;for(f.length+=i;++h<i;)f[j++]=g[h]}else c||f.push(g)}return f}function o(a,b,c,d,f,g){if(c){var h=c(a,b);if("undefined"!=typeof h)return!!h}if(a===b)return 0!==a||1/a==1/b;if(a===a&&!(a&&T[typeof a]||b&&T[typeof b]))return!1;if(null==a||null==b)return a===b;var i=$.call(a),j=$.call(b);if(i==I&&(i=O),j==I&&(j=O),i!=j)return!1;switch(i){case K:case L:return+a==+b;case N:return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case P:case Q:return a==String(b)}if(j=i==J,!j){var k=bb.call(a,"__wrapped__"),l=bb.call(b,"__wrapped__");if(k||l)return o(k?a.__wrapped__:a,l?b.__wrapped__:b,c,d,f,g);if(i!=O)return!1;if(i=!kb.argsObject&&r(a)?Object:a.constructor,k=!kb.argsObject&&r(b)?Object:b.constructor,i!=k&&!(s(i)&&i instanceof i&&s(k)&&k instanceof k)&&"constructor"in a&&"constructor"in b)return!1}for(k=!f,f||(f=A.pop()||[]),g||(g=A.pop()||[]),i=f.length;i--;)if(f[i]==a)return g[i]==b;var m=0,h=!0;if(f.push(a),g.push(b),j){if(i=a.length,m=b.length,h=m==a.length,!h&&!d)return h;for(;m--;)if(j=i,k=b[m],d)for(;j--&&!(h=o(a[j],k,c,d,f,g)););else if(!(h=o(a[m],k,c,d,f,g)))break;return h}return qb(b,function(b,e,i){return bb.call(i,e)?(m++,h=bb.call(a,e)&&o(a[e],b,c,d,f,g)):void 0}),h&&!d&&qb(a,function(a,b,c){return bb.call(c,b)?h=-1<--m:void 0}),k&&(e(f),e(g)),h}function p(a,b,c,d,e,f){var g=1&b,h=4&b,j=16&b,k=32&b;if(!(2&b||s(a)))throw new TypeError;j&&!c.length&&(b&=-17,j=c=!1),k&&!d.length&&(b&=-33,k=d=!1);var l=a&&a.__bindData__;return l&&!0!==l?(l=l.slice(),!g||1&l[1]||(l[4]=e),!g&&1&l[1]&&(b|=8),!h||4&l[1]||(l[5]=f),j&&cb.apply(l[2]||(l[2]=[]),c),k&&cb.apply(l[3]||(l[3]=[]),d),l[1]|=b,p.apply(null,l)):(1==b||17===b?i:m)([a,b,c,d,e,f])}function q(){S.h=H,S.b=S.c=S.g=S.i="",S.e="t",S.j=!0;for(var a,b=0;a=arguments[b];b++)for(var c in a)S[c]=a[c];b=S.a,S.d=/^[^,]+/.exec(b)[0],a=Function,b="return function("+b+"){",c=S;var d="var n,t="+c.d+",E="+c.e+";if(!t)return E;"+c.i+";";c.b?(d+="var u=t.length;n=-1;if("+c.b+"){",kb.unindexedChars&&(d+="if(s(t)){t=t.split('')}"),d+="while(++n<u){"+c.g+";}}else{"):kb.nonEnumArgs&&(d+="var u=t.length;n=-1;if(u&&p(t)){while(++n<u){n+='';"+c.g+";}}else{"),kb.enumPrototypes&&(d+="var G=typeof t=='function';"),kb.enumErrorProps&&(d+="var F=t===k||t instanceof Error;");var e=[];if(kb.enumPrototypes&&e.push('!(G&&n=="prototype")'),kb.enumErrorProps&&e.push('!(F&&(n=="message"||n=="name"))'),c.j&&c.f)d+="var C=-1,D=B[typeof t]&&v(t),u=D?D.length:0;while(++C<u){n=D[C];",e.length&&(d+="if("+e.join("&&")+"){"),d+=c.g+";",e.length&&(d+="}"),d+="}";else if(d+="for(n in t){",c.j&&e.push("m.call(t, n)"),e.length&&(d+="if("+e.join("&&")+"){"),d+=c.g+";",e.length&&(d+="}"),d+="}",kb.nonEnumShadows){for(d+="if(t!==A){var i=t.constructor,r=t===(i&&i.prototype),f=t===J?I:t===k?j:L.call(t),x=y[f];",k=0;7>k;k++)d+="n='"+c.h[k]+"';if((!(r&&x[n])&&m.call(t,n))",c.j||(d+="||(!x[n]&&t[n]!==A[n])"),d+="){"+c.g+"}";d+="}"}return(c.b||kb.nonEnumArgs)&&(d+="}"),d+=c.c+";return E",a("d,j,k,m,o,p,q,s,v,A,B,y,I,J,L",b+d+"}")(l,M,X,bb,C,r,mb,u,S.f,Y,T,jb,Q,Z,$)}function r(a){return a&&"object"==typeof a&&"number"==typeof a.length&&$.call(a)==I||!1}function s(a){return"function"==typeof a}function t(a){return!(!a||!T[typeof a])}function u(a){return"string"==typeof a||a&&"object"==typeof a&&$.call(a)==Q||!1}function v(b,c,d){if("number"==typeof d){var e=b?b.length:0;d=0>d?ib(0,e+d):d||0}else if(d)return d=w(b,c),b[d]===c?d:-1;return a(b,c,d)}function w(a,b,c,d){var e=0,f=a?a.length:e;for(c=c?h.createCallback(c,d,1):y,b=c(b);f>e;)d=e+f>>>1,c(a[d])<b?e=d+1:f=d;return e}function x(a,b){return 2<arguments.length?p(a,17,g(arguments,2),null,b):p(a,1,null,null,b)}function y(a){return a}function z(){}var A=[],B=[],C={},D=+new Date+"",E=40,F=/^\s*function[ \n\r\t]+\w/,G=/\bthis\b/,H="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),I="[object Arguments]",J="[object Array]",K="[object Boolean]",L="[object Date]",M="[object Error]",N="[object Number]",O="[object Object]",P="[object RegExp]",Q="[object String]",R={configurable:!1,enumerable:!1,value:null,writable:!1},S={a:"",b:null,c:"",d:"",e:"",v:null,g:"",h:null,support:null,i:"",j:!1},T={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},U=T[typeof window]&&window||this,V=T[typeof global]&&global;!V||V.global!==V&&V.window!==V||(U=V);var W=[],X=Error.prototype,Y=Object.prototype,Z=String.prototype,$=Y.toString,_=RegExp("^"+String($).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),ab=Function.prototype.toString,bb=Y.hasOwnProperty,cb=W.push,db=Y.propertyIsEnumerable,eb=function(){try{var a={},b=_.test(b=Object.defineProperty)&&b,c=b(a,a,a)&&b}catch(d){}return c}(),fb=_.test(fb=Object.create)&&fb,gb=_.test(gb=Array.isArray)&&gb,hb=_.test(hb=Object.keys)&&hb,ib=Math.max,jb={};jb[J]=jb[L]=jb[N]={constructor:!0,toLocaleString:!0,toString:!0,valueOf:!0},jb[K]=jb[Q]={constructor:!0,toString:!0,valueOf:!0},jb[M]=jb["[object Function]"]=jb[P]={constructor:!0,toString:!0},jb[O]={constructor:!0},function(){for(var a=H.length;a--;){var b,c=H[a];for(b in jb)bb.call(jb,b)&&!bb.call(jb[b],c)&&(jb[b][c]=!1)}}();var kb=h.support={};!function(){function a(){this.x=1}var b={0:1,length:1},c=[];a.prototype={valueOf:1,y:1};for(var d in new a)c.push(d);for(d in arguments);kb.argsClass=$.call(arguments)==I,kb.argsObject=arguments.constructor==Object&&!(arguments instanceof Array),kb.enumErrorProps=db.call(X,"message")||db.call(X,"name"),kb.enumPrototypes=db.call(a,"prototype"),kb.funcDecomp=!_.test(U.m)&&G.test(function(){return this}),kb.funcNames="string"==typeof Function.name,kb.nonEnumArgs=0!=d,kb.nonEnumShadows=!/valueOf/.test(c),kb.spliceObjects=(W.splice.call(b,0,1),!b[0]),kb.unindexedChars="xx"!="x"[0]+Object("x")[0]}(1),fb||(j=function(){function a(){}return function(b){if(t(b)){a.prototype=b;var c=new a;a.prototype=null}return c||U.Object()}}());var lb=eb?function(a,b){R.value=b,eb(a,"__bindData__",R)}:z;kb.argsClass||(r=function(a){return a&&"object"==typeof a&&"number"==typeof a.length&&bb.call(a,"callee")&&!db.call(a,"callee")||!1});var mb=gb||function(a){return a&&"object"==typeof a&&"number"==typeof a.length&&$.call(a)==J||!1},nb=q({a:"z",e:"[]",i:"if(!(B[typeof z]))return E",g:"E.push(n)"}),ob=hb?function(a){return t(a)?kb.enumPrototypes&&"function"==typeof a||kb.nonEnumArgs&&a.length&&r(a)?nb(a):hb(a):[]}:nb,V={a:"g,e,K",i:"e=e&&typeof K=='undefined'?e:d(e,K,3)",b:"typeof u=='number'",v:ob,g:"if(e(t[n],n,g)===false)return E"},pb={a:"z,H,l",i:"var a=arguments,b=0,c=typeof l=='number'?2:a.length;while(++b<c){t=a[b];if(t&&B[typeof t]){",v:ob,g:"if(typeof E[n]=='undefined')E[n]=t[n]",c:"}}"},gb={i:"if(!B[typeof t])return E;"+V.i,b:!1},pb=q(pb,{i:pb.i.replace(";",";if(c>3&&typeof a[c-2]=='function'){var e=d(a[--c-1],a[c--],2)}else if(c>2&&typeof a[c-1]=='function'){e=a[--c]}"),g:"E[n]=e?e(E[n],t[n]):t[n]"}),qb=q(V,gb,{j:!1});s(/x/)&&(s=function(a){return"function"==typeof a&&"[object Function]"==$.call(a)}),h.assign=pb,h.bind=x,h.createCallback=function(a,b,c){var d=typeof a;if(null==a||"function"==d)return l(a,b,c);if("object"!=d)return function(b){return b[a]};var e=ob(a),f=e[0],g=a[f];return 1!=e.length||g!==g||t(g)?function(b){for(var c=e.length,d=!1;c--&&(d=o(b[e[c]],a[e[c]],null,!0)););return d}:function(a){return a=a[f],g===a&&(0!==g||1/g==1/a)}},h.difference=function(e){var g,i=e,j=n(arguments,!0,!0,1),k=-1;g=(g=h.indexOf)===v?a:g;var l=i?i.length:0,m=l>=75&&g===a,o=[];if(m){var p;p=j;var q=-1,r=p.length,s=p[0],t=p[0|r/2],u=p[r-1];if(s&&"object"==typeof s&&t&&"object"==typeof t&&u&&"object"==typeof u)p=!1;else{for(s=d(),s["false"]=s["null"]=s["true"]=s.undefined=!1,t=d(),t.k=p,t.l=s,t.push=c;++q<r;)t.push(p[q]);p=t}p?(g=b,j=p):m=!1}for(;++k<l;)p=i[k],0>g(j,p)&&o.push(p);return m&&f(j),o},h.forIn=qb,h.keys=ob,h.extend=pb,h.identity=y,h.indexOf=v,h.isArguments=r,h.isArray=mb,h.isFunction=s,h.isObject=t,h.isString=u,h.noop=z,h.sortedIndex=w,h.VERSION="2.3.0","function"==typeof define&&"object"==typeof define.amd&&define.amd&&define(function(){return h})}.call(this);var requirejs,require,define;!function(global){function isFunction(a){return"[object Function]"===ostring.call(a)}function isArray(a){return"[object Array]"===ostring.call(a)}function each(a,b){if(a){var c;for(c=0;c<a.length&&(!a[c]||!b(a[c],c,a));c+=1);}}function eachReverse(a,b){if(a){var c;for(c=a.length-1;c>-1&&(!a[c]||!b(a[c],c,a));c-=1);}}function hasProp(a,b){return hasOwn.call(a,b)}function getOwn(a,b){return hasProp(a,b)&&a[b]}function eachProp(a,b){var c;for(c in a)if(hasProp(a,c)&&b(a[c],c))break}function mixin(a,b,c,d){return b&&eachProp(b,function(b,e){(c||!hasProp(a,e))&&(d&&"string"!=typeof b?(a[e]||(a[e]={}),mixin(a[e],b,c,d)):a[e]=b)}),a}function bind(a,b){return function(){return b.apply(a,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(a){throw a}function getGlobal(a){if(!a)return a;var b=global;return each(a.split("."),function(a){b=b[a]}),b}function makeError(a,b,c,d){var e=new Error(b+"\nhttp://requirejs.org/docs/errors.html#"+a);return e.requireType=a,e.requireModules=d,c&&(e.originalError=c),e}function newContext(a){function b(a){var b,c;for(b=0;a[b];b+=1)if(c=a[b],"."===c)a.splice(b,1),b-=1;else if(".."===c){if(1===b&&(".."===a[2]||".."===a[0]))break;b>0&&(a.splice(b-1,2),b-=2)}}function c(a,c,d){var e,f,g,h,i,j,k,l,m,n,o,p=c&&c.split("/"),q=p,r=x.map,s=r&&r["*"];if(a&&"."===a.charAt(0)&&(c?(q=getOwn(x.pkgs,c)?p=[c]:p.slice(0,p.length-1),a=q.concat(a.split("/")),b(a),f=getOwn(x.pkgs,e=a[0]),a=a.join("/"),f&&a===e+"/"+f.main&&(a=e)):0===a.indexOf("./")&&(a=a.substring(2))),d&&r&&(p||s)){for(h=a.split("/"),i=h.length;i>0;i-=1){if(k=h.slice(0,i).join("/"),p)for(j=p.length;j>0;j-=1)if(g=getOwn(r,p.slice(0,j).join("/")),g&&(g=getOwn(g,k))){l=g,m=i;break}if(l)break;!n&&s&&getOwn(s,k)&&(n=getOwn(s,k),o=i)}!l&&n&&(l=n,m=o),l&&(h.splice(0,m,l),a=h.join("/"))}return a}function d(a){isBrowser&&each(scripts(),function(b){return b.getAttribute("data-requiremodule")===a&&b.getAttribute("data-requirecontext")===u.contextName?(b.parentNode.removeChild(b),!0):void 0})}function e(a){var b=getOwn(x.paths,a);return b&&isArray(b)&&b.length>1?(b.shift(),u.require.undef(a),u.require([a]),!0):void 0}function f(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function g(a,b,d,e){var g,h,i,j,k=null,l=b?b.name:null,m=a,n=!0,o="";return a||(n=!1,a="_@r"+(E+=1)),j=f(a),k=j[0],a=j[1],k&&(k=c(k,l,e),h=getOwn(C,k)),a&&(k?o=h&&h.normalize?h.normalize(a,function(a){return c(a,l,e)}):c(a,l,e):(o=c(a,l,e),j=f(o),k=j[0],o=j[1],d=!0,g=u.nameToUrl(o))),i=!k||h||d?"":"_unnormalized"+(F+=1),{prefix:k,name:o,parentMap:b,unnormalized:!!i,url:g,originalName:m,isDefine:n,id:(k?k+"!"+o:o)+i}}function h(a){var b=a.id,c=getOwn(y,b);return c||(c=y[b]=new u.Module(a)),c}function i(a,b,c){var d=a.id,e=getOwn(y,d);!hasProp(C,d)||e&&!e.defineEmitComplete?(e=h(a),e.error&&"error"===b?c(e.error):e.on(b,c)):"defined"===b&&c(C[d])}function j(a,b){var c=a.requireModules,d=!1;b?b(a):(each(c,function(b){var c=getOwn(y,b);c&&(c.error=a,c.events.error&&(d=!0,c.emit("error",a)))}),d||req.onError(a))}function k(){globalDefQueue.length&&(apsp.apply(B,[B.length-1,0].concat(globalDefQueue)),globalDefQueue=[])}function l(a){delete y[a],delete z[a]}function m(a,b,c){var d=a.map.id;a.error?a.emit("error",a.error):(b[d]=!0,each(a.depMaps,function(d,e){var f=d.id,g=getOwn(y,f);!g||a.depMatched[e]||c[f]||(getOwn(b,f)?(a.defineDep(e,C[f]),a.check()):m(g,b,c))}),c[d]=!0)}function n(){var a,b,c,f,g=1e3*x.waitSeconds,h=g&&u.startTime+g<(new Date).getTime(),i=[],k=[],l=!1,o=!0;if(!s){if(s=!0,eachProp(z,function(c){if(a=c.map,b=a.id,c.enabled&&(a.isDefine||k.push(c),!c.error))if(!c.inited&&h)e(b)?(f=!0,l=!0):(i.push(b),d(b));else if(!c.inited&&c.fetched&&a.isDefine&&(l=!0,!a.prefix))return o=!1}),h&&i.length)return c=makeError("timeout","Load timeout for modules: "+i,null,i),c.contextName=u.contextName,j(c);o&&each(k,function(a){m(a,{},{})}),h&&!f||!l||!isBrowser&&!isWebWorker||w||(w=setTimeout(function(){w=0,n()},50)),s=!1}}function o(a){hasProp(C,a[0])||h(g(a[0],null,!0)).init(a[1],a[2])}function p(a,b,c,d){a.detachEvent&&!isOpera?d&&a.detachEvent(d,b):a.removeEventListener(c,b,!1)}function q(a){var b=a.currentTarget||a.srcElement;return p(b,u.onScriptLoad,"load","onreadystatechange"),p(b,u.onScriptError,"error"),{node:b,id:b&&b.getAttribute("data-requiremodule")}}function r(){var a;for(k();B.length;){if(a=B.shift(),null===a[0])return j(makeError("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));o(a)}}var s,t,u,v,w,x={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},config:{}},y={},z={},A={},B=[],C={},D={},E=1,F=1;return v={require:function(a){return a.require?a.require:a.require=u.makeRequire(a.map)},exports:function(a){return a.usingExports=!0,a.map.isDefine?a.exports?a.exports:a.exports=C[a.map.id]={}:void 0},module:function(a){return a.module?a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){var b,c=getOwn(x.pkgs,a.map.id);return b=c?getOwn(x.config,a.map.id+"/"+c.main):getOwn(x.config,a.map.id),b||{}},exports:C[a.map.id]}}},t=function(a){this.events=getOwn(A,a.id)||{},this.map=a,this.shim=getOwn(x.shim,a.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},t.prototype={init:function(a,b,c,d){d=d||{},this.inited||(this.factory=b,c?this.on("error",c):this.events.error&&(c=bind(this,function(a){this.emit("error",a)})),this.depMaps=a&&a.slice(0),this.errback=c,this.inited=!0,this.ignore=d.ignore,d.enabled||this.enabled?this.enable():this.check())},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0,u.startTime=(new Date).getTime();var a=this.map;return this.shim?(u.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return a.prefix?this.callPlugin():this.load()})),void 0):a.prefix?this.callPlugin():this.load()}},load:function(){var a=this.map.url;D[a]||(D[a]=!0,u.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id,d=this.depExports,e=this.exports,f=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(f)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{e=u.execCb(c,f,d,e)}catch(g){a=g}else e=u.execCb(c,f,d,e);if(this.map.isDefine&&(b=this.module,b&&void 0!==b.exports&&b.exports!==this.exports?e=b.exports:void 0===e&&this.usingExports&&(e=this.exports)),a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?"define":"require",j(this.error=a)}else e=f;this.exports=e,this.map.isDefine&&!this.ignore&&(C[c]=e,req.onResourceLoad&&req.onResourceLoad(u,this.map,this.depMaps)),l(c),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var a=this.map,b=a.id,d=g(a.prefix);this.depMaps.push(d),i(d,"defined",bind(this,function(d){var e,f,k,m=this.map.name,n=this.map.parentMap?this.map.parentMap.name:null,o=u.makeRequire(a.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(d.normalize&&(m=d.normalize(m,function(a){return c(a,n,!0)})||""),f=g(a.prefix+"!"+m,this.map.parentMap),i(f,"defined",bind(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),k=getOwn(y,f.id),k&&(this.depMaps.push(f),this.events.error&&k.on("error",bind(this,function(a){this.emit("error",a)})),k.enable()),void 0):(e=bind(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),e.error=bind(this,function(a){this.inited=!0,this.error=a,a.requireModules=[b],eachProp(y,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&l(a.map.id)}),j(a)}),e.fromText=bind(this,function(c,d){var f=a.name,i=g(f),k=useInteractive;d&&(c=d),k&&(useInteractive=!1),h(i),hasProp(x.config,b)&&(x.config[f]=x.config[b]);try{req.exec(c)}catch(l){return j(makeError("fromtexteval","fromText eval for "+b+" failed: "+l,l,[b]))}k&&(useInteractive=!0),this.depMaps.push(i),u.completeLoad(f),o([f],e)}),d.load(a.name,o,e,x),void 0)})),u.enable(d,this),this.pluginMaps[d.id]=d},enable:function(){z[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(a,b){var c,d,e;if("string"==typeof a){if(a=g(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[b]=a,e=getOwn(v,a.id))return this.depExports[b]=e(this),void 0;this.depCount+=1,i(a,"defined",bind(this,function(a){this.defineDep(b,a),this.check()})),this.errback&&i(a,"error",bind(this,this.errback))}c=a.id,d=y[c],hasProp(v,c)||!d||d.enabled||u.enable(a,this)})),eachProp(this.pluginMaps,bind(this,function(a){var b=getOwn(y,a.id);b&&!b.enabled&&u.enable(a,this)})),this.enabling=!1,this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]),c.push(b)},emit:function(a,b){each(this.events[a],function(a){a(b)}),"error"===a&&delete this.events[a]}},u={config:x,contextName:a,registry:y,defined:C,urlFetched:D,defQueue:B,Module:t,makeModuleMap:g,nextTick:req.nextTick,onError:j,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=x.pkgs,c=x.shim,d={paths:!0,config:!0,map:!0};eachProp(a,function(a,b){d[b]?"map"===b?(x.map||(x.map={}),mixin(x[b],a,!0,!0)):mixin(x[b],a,!0):x[b]=a}),a.shim&&(eachProp(a.shim,function(a,b){isArray(a)&&(a={deps:a}),!a.exports&&!a.init||a.exportsFn||(a.exportsFn=u.makeShimExports(a)),c[b]=a}),x.shim=c),a.packages&&(each(a.packages,function(a){var c;a="string"==typeof a?{name:a}:a,c=a.location,b[a.name]={name:a.name,location:c||a.name,main:(a.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}}),x.pkgs=b),eachProp(y,function(a,b){a.inited||a.map.unnormalized||(a.map=g(b))}),(a.deps||a.callback)&&u.require(a.deps||[],a.callback)},makeShimExports:function(a){function b(){var b;return a.init&&(b=a.init.apply(global,arguments)),b||a.exports&&getGlobal(a.exports)}return b},makeRequire:function(b,e){function f(c,d,i){var k,l,m;return e.enableBuildCallback&&d&&isFunction(d)&&(d.__requireJsBuild=!0),"string"==typeof c?isFunction(d)?j(makeError("requireargs","Invalid require call"),i):b&&hasProp(v,c)?v[c](y[b.id]):req.get?req.get(u,c,b,f):(l=g(c,b,!1,!0),k=l.id,hasProp(C,k)?C[k]:j(makeError("notloaded",'Module name "'+k+'" has not been loaded yet for context: '+a+(b?"":". Use require([])")))):(r(),u.nextTick(function(){r(),m=h(g(null,b)),m.skipMap=e.skipMap,m.init(c,d,i,{enabled:!0}),n()}),f)}return e=e||{},mixin(f,{isBrowser:isBrowser,toUrl:function(a){var d,e=a.lastIndexOf("."),f=a.split("/")[0],g="."===f||".."===f;return-1!==e&&(!g||e>1)&&(d=a.substring(e,a.length),a=a.substring(0,e)),u.nameToUrl(c(a,b&&b.id,!0),d,!0)},defined:function(a){return hasProp(C,g(a,b,!1,!0).id)},specified:function(a){return a=g(a,b,!1,!0).id,hasProp(C,a)||hasProp(y,a)}}),b||(f.undef=function(a){k();var c=g(a,b,!0),e=getOwn(y,a);d(a),delete C[a],delete D[c.url],delete A[a],e&&(e.events.defined&&(A[a]=e.events),l(a))}),f},enable:function(a){var b=getOwn(y,a.id);b&&h(a).enable()},completeLoad:function(a){var b,c,d,f=getOwn(x.shim,a)||{},g=f.exports;for(k();B.length;){if(c=B.shift(),null===c[0]){if(c[0]=a,b)break;b=!0}else c[0]===a&&(b=!0);o(c)}if(d=getOwn(y,a),!b&&!hasProp(C,a)&&d&&!d.inited){if(!(!x.enforceDefine||g&&getGlobal(g)))return e(a)?void 0:j(makeError("nodefine","No define call for "+a,null,[a]));o([a,f.deps||[],f.exportsFn])}n()},nameToUrl:function(a,b,c){var d,e,f,g,h,i,j,k,l;if(req.jsExtRegExp.test(a))k=a+(b||"");else{for(d=x.paths,e=x.pkgs,h=a.split("/"),i=h.length;i>0;i-=1){if(j=h.slice(0,i).join("/"),f=getOwn(e,j),l=getOwn(d,j)){isArray(l)&&(l=l[0]),h.splice(0,i,l);break}if(f){g=a===f.name?f.location+"/"+f.main:f.location,h.splice(0,i,g);break}}k=h.join("/"),k+=b||(/^data\:|\?/.test(k)||c?"":".js"),k=("/"===k.charAt(0)||k.match(/^[\w\+\.\-]+:/)?"":x.baseUrl)+k}return x.urlArgs?k+((-1===k.indexOf("?")?"?":"&")+x.urlArgs):k},load:function(a,b){req.load(u,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||readyRegExp.test((a.currentTarget||a.srcElement).readyState)){interactiveScript=null;var b=q(a);u.completeLoad(b.id)}},onScriptError:function(a){var b=q(a);return e(b.id)?void 0:j(makeError("scripterror","Script error for: "+b.id,a,[b.id]))}},u.require=u.makeRequire(),u}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(a){return"interactive"===a.readyState?interactiveScript=a:void 0}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.1.9",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,apsp=ap.splice,isBrowser=!("undefined"==typeof window||"undefined"==typeof navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),contexts={},cfg={},globalDefQueue=[],useInteractive=!1;
if("undefined"==typeof define){if("undefined"!=typeof requirejs){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}"undefined"==typeof require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(a,b,c,d){var e,f,g=defContextName;return isArray(a)||"string"==typeof a||(f=a,isArray(b)?(a=b,b=c,c=d):a=[]),f&&f.context&&(g=f.context),e=getOwn(contexts,g),e||(e=contexts[g]=req.s.newContext(g)),f&&e.configure(f),e.require(a,b,c)},req.config=function(a){return req(a)},req.nextTick="undefined"!=typeof setTimeout?function(a){setTimeout(a,4)}:function(a){a()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(a){req[a]=function(){var b=contexts[defContextName];return b.require[a].apply(b,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(a){var b=a.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return b.type=a.scriptType||"text/javascript",b.charset="utf-8",b.async=!0,b},req.load=function(a,b,c){var d,e=a&&a.config||{};if(isBrowser)return d=req.createNode(e,b,c),d.setAttribute("data-requirecontext",a.contextName),d.setAttribute("data-requiremodule",b),!d.attachEvent||d.attachEvent.toString&&d.attachEvent.toString().indexOf("[native code")<0||isOpera?(d.addEventListener("load",a.onScriptLoad,!1),d.addEventListener("error",a.onScriptError,!1)):(useInteractive=!0,d.attachEvent("onreadystatechange",a.onScriptLoad)),d.src=c,currentlyAddingScript=d,baseElement?head.insertBefore(d,baseElement):head.appendChild(d),currentlyAddingScript=null,d;if(isWebWorker)try{importScripts(c),a.completeLoad(b)}catch(f){a.onError(makeError("importscripts","importScripts failed for "+b+" at "+c,f,[b]))}},isBrowser&&!cfg.skipDataMain&&eachReverse(scripts(),function(a){return head||(head=a.parentNode),dataMain=a.getAttribute("data-main"),dataMain?(mainScript=dataMain,cfg.baseUrl||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0):void 0}),define=function(a,b,c){var d,e;"string"!=typeof a&&(c=b,b=a,a=null),isArray(b)||(c=b,b=null),!b&&isFunction(c)&&(b=[],c.length&&(c.toString().replace(commentRegExp,"").replace(cjsRequireRegExp,function(a,c){b.push(c)}),b=(1===c.length?["require"]:["require","exports","module"]).concat(b))),useInteractive&&(d=currentlyAddingScript||getInteractiveScript(),d&&(a||(a=d.getAttribute("data-requiremodule")),e=contexts[d.getAttribute("data-requirecontext")])),(e?e.defQueue:globalDefQueue).push([a,b,c])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}}(this),require.config({baseUrl:"/core2/js",paths:{"adaptive-html":"modules/adaptive-html",underscore:"vendor/lodash.custom","class":"modules/class",fastclick:"vendor/fastclick","nav-primary-mobile":"modules/nav-primary-mobile"}}),function(){document.addEventListener(SKY_SPORTS.hasFeature.animationEvent,function(a){if("callfn"===a.animationName){var b=a.target,c=b.dataset,d=c.fn;d&&(require([d],function(a){if("function"==typeof a){var d=new a;d.init(b,c)}else a.init(b,c)}),b.classList.remove("callfn"))}},!1),SKY_SPORTS.addCss("callfn",".callfn {-webkit-animation:callfn 0.01s;-moz-animation:callfn 0.01s;animation:callfn 0.01s;}",!1)}(),function(){"use strict";SKY_SPORTS.hasFeature.touch&&require(["fastclick"],function(a){a.attach(document.body)})}();