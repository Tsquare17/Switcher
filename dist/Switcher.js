!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).Switcher=t()}(this,(function(){"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function n(e){return function(e){if(Array.isArray(e))return i(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||r(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function o(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=r(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,o=function(){};return{s:o,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return c=e.done,e},e:function(e){l=!0,a=e},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw a}}}}function a(e,t){return function(e,t){if(t.get)return t.get.call(e);return t.value}(e,l(e,t,"get"))}function c(e,t,n){return function(e,t,n){if(t.set)t.set.call(e,n);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n}}(e,l(e,t,"set"),n),n}function l(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}function u(e,t,n){return function(e,t){if(e!==t)throw new TypeError("Private static access of wrong provenance")}(e,t),n}function s(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}function f(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function h(e,t,n){f(e,t),t.set(e,n)}function d(e,t){f(e,t),t.add(e)}var p=new WeakMap,y=new WeakMap,v=new WeakMap,m=new WeakMap,w=new WeakSet,S=new WeakSet,b=new WeakSet,g=new WeakSet,E=new WeakSet,q=new WeakSet,A=new WeakSet,k=new WeakSet,T=function(){function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.containerSelector,i=void 0===r?"body":r,o=t.linkSelector,a=void 0===o?"a":o,c=t.debugging,l=void 0!==c&&c;e(this,n),d(this,k),d(this,A),d(this,q),d(this,E),d(this,g),d(this,b),d(this,S),d(this,w),h(this,p,{writable:!0,value:"Switcher"}),h(this,y,{writable:!0,value:[]}),h(this,v,{writable:!0,value:[]}),h(this,m,{writable:!0,value:[]}),this.containerSelector=i,this.linkSelector=a,this.debugging=l}var r,i,c;return r=n,(i=[{key:"init",value:function(){var e,t=this,n=o(document.querySelectorAll("head *"));try{for(n.s();!(e=n.n()).done;){var r=e.value;a(this,y).push(r)}}catch(e){n.e(e)}finally{n.f()}var i,c=o(document.querySelectorAll(this.containerSelector+" script"));try{for(c.s();!(i=c.n()).done;){var l=i.value;a(this,v).push(l)}}catch(e){c.e(e)}finally{c.f()}document.querySelector("body").addEventListener("click",(function(e){"false"!==e.target.getAttribute("data-switcher")&&e.target.host===window.location.host&&e.target.matches(t.linkSelector)&&(e.preventDefault(),s(t,w,M).call(t,e))})),s(this,S,W).call(this,this.linkSelector)}}])&&t(r.prototype,i),c&&t(r,c),n}();function M(e){var t=this,n=new XMLHttpRequest;n.onreadystatechange=function(){if(n.readyState===XMLHttpRequest.DONE){var r=(new DOMParser).parseFromString(n.responseText,"text/html"),i=r.querySelector(t.containerSelector).innerHTML,o=new CustomEvent("switcher.before",{detail:{event:e,content:i}});document.dispatchEvent(o),s(t,b,C).call(t,r),s(t,g,L).call(t,r);var a=r.querySelector(t.containerSelector);s(t,A,x).call(t,a),u(T,T,N).call(T,e.target);var c=new CustomEvent("switcher.after");document.dispatchEvent(c)}},n.open("GET",e.target,!0),n.send()}function N(e){window.history.pushState(null,"",e)}function W(e){var t=document.querySelector(e);return null===t&&this.debugging&&console.log(a(this,p)+": No elements matching "+e+" were found"),t}function C(e){var t,n=o(e.querySelectorAll("head *"));try{for(n.s();!(t=n.n()).done;){var r,i=t.value,c=!1,l=o(a(this,y));try{for(l.s();!(r=l.n()).done;){var u=r.value;i.isEqualNode(u)&&(c=!0)}}catch(e){l.e(e)}finally{l.f()}if(!c){if(i.matches("title")){document.querySelector("title").innerHTML=i.innerHTML;continue}if(i.matches("script")){s(this,E,j).call(this,i,"head"),a(this,y).push(i);continue}if(i.matches("meta")){var f=document.querySelector('meta[name="'+i.getAttribute("name")+'"]');if(f){f.setAttribute("content",i.getAttribute("content"));continue}var h=document.querySelector('meta[property="'+i.getAttribute("property")+'"]');if(h){h.setAttribute("content",i.getAttribute("content"));continue}}a(this,y).push(i),document.querySelector("head").appendChild(i)}}}catch(e){n.e(e)}finally{n.f()}}function L(e){var t,n=o(e.querySelectorAll(this.containerSelector+" script"));try{for(n.s();!(t=n.n()).done;){var r,i=t.value,c=!1,l=o(a(this,v));try{for(l.s();!(r=l.n()).done;){var u=r.value;i.isEqualNode(u)&&(c=!0)}}catch(e){l.e(e)}finally{l.f()}c||s(this,E,j).call(this,i,this.containerSelector)}}catch(e){n.e(e)}finally{n.f()}}function j(e,t){var n=document.createElement("script");s(this,q,H).call(this,e,n),e.innerHTML&&n.appendChild(document.createTextNode(e.innerHTML)),n.async=!1,document.querySelector(t).appendChild(n)}function H(e,t){n(e.attributes).forEach((function(e){t.setAttribute(e.nodeName,e.nodeValue)}))}function x(e){c(this,m,[]),s(this,k,O).call(this,e,document.querySelector(this.containerSelector));var t,n=o(a(this,m));try{for(n.s();!(t=n.n()).done;){var r=t.value;if("BODY"!==r.current.tagName){if(!r.current.isEqualNode(r.replacement)){var i=r.replacement.cloneNode(!0);r.current.parentNode.replaceChild(i,r.current)}}else s(this,q,H).call(this,r.replacement,r.current)}}catch(e){n.e(e)}finally{n.f()}}function O(e,t){for(var n=0;n<e.children.length;n++)if(!e.children[n].isEqualNode(t.children[n])){if(!t.children[n])return a(this,m).push({current:t,replacement:e});s(this,k,O).call(this,e.children[n],t.children[n])}e.isEqualNode(t)||a(this,m).push({current:t,replacement:e})}return T}));
//# sourceMappingURL=Switcher.js.map
