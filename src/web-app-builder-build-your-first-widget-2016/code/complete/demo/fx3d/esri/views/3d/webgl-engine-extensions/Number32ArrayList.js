/**
 * Copyright @ 2016 Esri.
 * All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 */
define([],function(){return function(n,e){var t=null;t=n?Float32Array:Uint32Array,null==e?e=4096:65536>e&&(e=nextHighestPowerOfTwo(e));var r=new t(e),i=0;this.resize2=function(n){i=n;var e,u;if(i>r.length){for(e=r.length;i>e;)e*=2;return u=new t(e),u.set(r),r=u,!0}if(i<=r.length/2){e=r.length;for(var s=2*i;e>=s;)e/=2;return u=new t(e),u.set(r.subarray(0,e)),r=u,!0}return!1},this.resize=function(n){i=n;var e;return i>r.length?(e=new t(i),e.set(r),r=null,r=e,!0):i<r.length?(e=new t(i),e.set(r.subarray(0,i)),r=null,r=e,!0):!0},this.append=function(n){var e=i;this.resize(i+n.length),r.set(n,e)},this.whole=function(n){n.length!==i&&(r=new t(n.length),i=n.length),r.set(n)},this.erase=function(n,e){for(var t=n;e>t;++t)r[t]=0},this.getArray=function(){return r},this.getSize=function(){return i},this.getArrayType=function(){return t}}});