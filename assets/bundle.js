!function(){"use strict";var t=function(t){if("object"!=typeof(n=t)||Array.isArray(n))throw"state should be an object";var n},n=function(t,n,e,r){return(o=t,o.reduce((function(t,n,e){return t.indexOf(n)>-1?t:t.concat(n)}),[])).reduce((function(t,e){return t.concat(n[e]||[])}),[]).map((function(t){return t(e,r)}));var o};function e(e){void 0===e&&(e={});var r={};return{getState:function(){return Object.assign({},e)},hydrate:function(o){return t(o),Object.assign(e,o),function(){var t=["*"].concat(Object.keys(o));n(t,r,e)}},on:function(t,n){return(t=[].concat(t)).map((function(t){return r[t]=(r[t]||[]).concat(n)})),function(){return t.map((function(t){return r[t].splice(r[t].indexOf(n),1)}))}},emit:function(o,u,c){var i=("*"===o?[]:["*"]).concat(o);(u="function"==typeof u?u(e):u)&&(t(u),Object.assign(e,u),i=i.concat(Object.keys(u))),n(i,r,e,c)}}}e();var r=function(t){return"object"==typeof t&&!Array.isArray(t)},o=function(t){return"function"==typeof t};var u=function(t,n,u){void 0===t&&(t={}),void 0===n&&(n={}),void 0===u&&(u=[]);var c=e(n),i=[];return{on:c.on,emit:c.emit,getState:function(){return c.getState()},add:function(n){if(!r(n))throw"components should be an object";Object.assign(t,n)},use:function(t){if(!o(t))throw"plugins should be a function";u.push(t)},hydrate:function(t){return c.hydrate(t)},mount:function(n){void 0===n&&(n="data-component"),n=[].concat(n);for(var e=0;e<n.length;e++){for(var a=n[e],f=[].slice.call(document.querySelectorAll("["+a+"]")),s=function(){for(var n=f.pop(),e=n.getAttribute(a).split(/\s/),s=0;s<e.length;s++){var d=t[e[s]];if(d){n.removeAttribute(a);try{var v=u.reduce((function(t,e){var o=e(n,c);return r(o)?Object.assign(t,o):t}),{}),m=d(n,Object.assign({},v,c));o(m.unmount)&&i.push(m)}catch(t){console.error(t),c.emit("error",{error:t}),c.hydrate({error:void 0})}}}};f.length;)s();c.emit("mount")}},unmount:function(){for(var t=i.length-1;t>-1;t--){var n=i[t],e=n.subs;(0,n.unmount)(n.node),e.map((function(t){return t()})),i.splice(t,1)}c.emit("unmount")}}}({},{}),c=u;document.addEventListener("DOMContentLoaded",(function(t){c.mount()}))}();