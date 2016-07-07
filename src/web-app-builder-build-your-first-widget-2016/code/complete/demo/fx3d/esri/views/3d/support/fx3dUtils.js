/**
 * Copyright @ 2016 Esri.
 * All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 */
define(["dojo/_base/array","dojox/validate/regexp","esri/views/3d/support/mathUtils","esri/views/3d/webgl-engine/lib/gl-matrix","esri/views/3d/webgl-engine/lib/Util","dojo/text!../effects/config.json"],function(e,t,r,n,i,o,a){var s=(n.vec3d,n.vec2d,i.assert,i.EARTH_RADIUS),l=r.deg2rad(1);r.rad2deg(1);o=JSON.parse(o);var c,u={version:"1.0",description:"3dfx library",copyright:"Esri Beijing R&D Center",layerId:"3dfx-layer-",enableAddTesting:!0,debug_timeCost:!0,debug_showPoint:!1,debug_clearEarth:!1,KeySplit:"$",NotFound:"NULL",InvalidFlag:-9999,CSVDateFileSuffix:"_dates",DataFormatNotSupported:"not-supported",DateToValueOfTime:-1,wgs84ToSphericalEngineCoords:function(e,t,r,n){var i=s+e[t+2],o=l*e[t+1],a=l*e[t],c=Math.cos(o);r[n++]=Math.cos(a)*c*i,r[n++]=Math.sin(a)*c*i,r[n]=Math.sin(o)*i},checkTimeSlider:function(t){var r=null;return t instanceof Array&&e.some(t,function(e){var t=e.attributes.pointId;if(t===u.DateToValueOfTime){r={};for(var n in e.attributes)n.startWith("valueOfTime")&&(r[n]=e.attributes[n]);return!0}}),r},isDigit:function(e){var t=/^-?\d+\.?\d*$/;return null===t.exec(e)||""===e?!1:!0},rgba2float:function(e){return e[0]/256+e[1]/65536+e[2]/16777216},endsWith:function(e,t){return-1!==e.indexOf(t,e.length-t.length)},mod:function(e,t){var r;return r=parseInt(e/t,10),e-=r*t,0>e&&(e+=t),e},nextHighestPowerOfTwo:function(e){--e;for(var t=1;32>t;t<<=1)e|=e>>t;return e+1},isPowerOfTwo:function(e){return 0===(e&e-1)&&0!==e},doubleTo2Floats:function(e){var t,r,n;return e>=0?(n=65536*Math.floor(e/65536),t=n,r=e-t):(n=65536*Math.floor(-e/65536),t=-n,r=e+n),[t,r]},vec3DoubleTo2Floats:function(e){if(e instanceof Array){for(var t=[],r=0;r<e.length;r++)t.push(this.doubleTo2Floats(e[r]));return t}},littleEndian:function(){var e=new ArrayBuffer(2);return new DataView(e).setInt16(0,256,!0),256===new Int16Array(e)[0]}(),Log:{Info:0,Warn:1,Error:2,msg:function(e,t,r){if("number"==typeof e&&"string"==typeof t&&"string"==typeof r)switch(e){case this.Info:console.info(t+": "+r);break;case this.Warn:console.warn(t+": "+r);break;case this.Error:console.error(t+": "+r)}}},ExpDataSourceType:{CSV:"csv",FeatureServer:"featureserver",Grib2:"grib2",Volume:"volume"},EffectType:{AreaExtrude:"AreaExtrude",DensityMesh:"DensityMesh",PointExtrude:"PointExtrude",Bounce:"Bounce",Pulse:"Pulse",Fireball:"Fireball",JetTrail:"JetTrail",LineBox:"LineBox",Worm:"Worm",HeatLine:"HeatLine",DensityWall:"DensityWall",HeatGrid:"HeatGrid",Current:"Current",Cascade:"Cascade",Volume:"Volume"},EffectDataFormat:{AreaExtrude:{keyFields:["boundaryId"],checkRules:["multi time values"]},DensityMesh:{keyFields:["areaId"],checkRules:["multi time values"]},PointExtrude:{keyFields:["pointId"],checkRules:["multi time values"]},Bounce:{keyFields:["pointId"],checkRules:["multi time values"]},Pulse:{keyFields:["pointId"],checkRules:["single time value"]},Fireball:{keyFields:["pointId","pathId"],checkRules:["single time value"]},JetTrail:{keyFields:["pointId","pathId"],checkRules:["single time value"]},LineBox:{keyFields:["pointId","pathId"],checkRules:["single time value"]},Worm:{keyFields:["pointId","pathId"],checkRules:["single time value"]},HeatLine:{keyFields:["pointId","pathId"],checkRules:["multi time values"]},DensityWall:{keyFields:["pointId","pathId"],checkRules:["multi time values"]},HeatGrid:{keyFields:["gfs"],checkRules:["multi time values"]},Current:{keyFields:["gfs"],checkRules:["multi time values"]},Cascade:{keyFields:["pointId","pathId"],checkRules:["multi time values"]}},EffectDataType:{AreaType:["DensityMesh"],BoundaryType:["AreaExtrude"],PathType:["Cascade","Fireball","JetTrail","LineBox","Worm","HeatLine","DensityWall"],PointType:["PointExtrude","Bounce","Pulse"],GfsType:["HeatGrid","Current"],VolumeType:["Volume"]},getLayerTypeOfVolume:function(e){switch(e){case"Q":return 1;case"N":case"N2":return 2;case"P2s":return 3;case"P1x":return 4;case"P1s":return 5;case"C2t":case"C3t":return 6;case"C2b":return 7;case"O1l":case"O1+2":return 8;default:return 0}return 0},groupLayerType:function(e){var t,r;for(t in e)if("N"===t)for(r in e)"N2"===r&&delete e[r];else if("N2"===t)for(r in e)"N"===r&&delete e[r];else if("O1l"===t)for(r in e)"O1+2"===r&&delete e[r];else if("O1+2"===t)for(r in e)"O1l"===r&&delete e[r];else if("C2t"===t)for(r in e)"C3t"===r&&delete e[r];else if("C3t"===t)for(r in e)"C2t"===r&&delete e[r]},addTestEffect:function(e,t){if("string"==typeof e&&"string"==typeof t){var r;"point"===t?r=this.EffectDataType.PointType:"area"===t?r=this.EffectDataType.AreaType:"path"===t?r=this.EffectDataType.PathType:"boundary"===t?r=this.EffectDataType.BoundaryType:"gfs"===t?r=this.EffectDataType.GfsType:"volume"===t&&(r=this.EffectDataType.Volume),r instanceof Array&&(this.EffectType[e]=e,r.push(e))}},TypeCheckResult:{NOT_MATHCH:1,TYPE_FIELD_MISSED:2,ALL_FIELDS_MISSED:3,ITEM_VALUE_INVALID:4,SUCCESS:100,SUCCESS_AreaType:101,SUCCESS_BoundaryType:102,SUCCESS_PathType:103,SUCCESS_PointType:104,SUCCESS_GfsType:105,SUCCESS_VolumeType:106},pairCheck:function(e,t){if("string"==typeof e&&"string"==typeof t)for(var r=this.EffectDataType[e],n=0;n<r.length;n++)if(r[n]===t)return this.TypeCheckResult["SUCCESS_"+e];return this.TypeCheckResult.NOT_MATHCH},checkDataEffect:function(e,t){var r=this.TypeCheckResult.SUCCESS;if(e instanceof Array){for(var n=!1,i=!1,o=!1,a=!1,s=!1,l=0;l<e.length;l++)n||"pointid"!=e[l].toLowerCase()||(n=!0),i||"pathid"!=e[l].toLowerCase()||(i=!0),o||"areaid"!=e[l].toLowerCase()||(o=!0),a||"boundaryid"!=e[l].toLowerCase()||(a=!0),s||"bhid"!=e[l].toLowerCase()||(s=!0);r=!o||a||i||!n||s?o||!a||i||!n||s?o||a||!i||!n||s?o||a||i||!n||s?o||a||i||n||!s?this.TypeCheckResult.TYPE_FIELD_MISSED:this.pairCheck("VolumeType",t):this.pairCheck("PointType",t):this.pairCheck("PathType",t):this.pairCheck("BoundaryType",t):this.pairCheck("AreaType",t)}else r=this.TypeCheckResult.ALL_FIELDS_MISSED;return r},GFSDataGroupLen:{HeatGrid:1,Current:2},checkEffectGFSPair:function(e,t){return"number"==typeof e&&"string"==typeof t&&e===this.GFSDataGroupLen[t]?!0:!1},isInforAttrChanged:function(e,t){function r(e,t){var o,a=!1;if("function"==typeof e&&"function"==typeof t||e instanceof Date&&t instanceof Date||e instanceof RegExp&&t instanceof RegExp||e instanceof String&&t instanceof String||e instanceof Array&&t instanceof Array||e instanceof Number&&t instanceof Number)e.toString()!==t.toString()&&t.toString().length>0&&(a=!0);else if("object"==typeof e&&"object"==typeof t){if(null!==t)for(o in t)if(e.hasOwnProperty(o)){if(n.push(e),i.push(t),r(e[o],t[o])){a=!0,e[o]=t[o];break}n.pop(),i.pop()}}else isNaN(e)&&isNaN(t)&&"number"==typeof e&&"number"==typeof t&&(a=!1),e!==t&&(a=!0);return a}var n,i;return n=[],i=[],r(e,t)},ColorUtil:{_colors:[],_pos:[],_min:0,_max:1,setColors:function(e){var t,r;if(e||(e=[[220,220,220],[20,20,20]]),this._colors=[],this._pos=[],e instanceof Array){for(e=e.slice(0),t=0;t<e.length;t++)if(col=e[t],col instanceof Array){for(r in col)col[r]<0&&(col[r]=0),col[r]>255&&(col[r]=255);this._colors.push(col)}for(t=0;t<this._colors.length;t++)this._pos.push(t/(this._colors.length-1))}},getColor:function(e){var t,r,n,i,o,a;for(r=(e-this._min)/(this._max-this._min),r=Math.min(1,Math.max(0,r)),t=0;t<this._pos.length;t++){if(n=this._pos[t],n>=r){i=this._colors[t];break}if(r>=n&&t===this._pos.length-1){i=this._colors[t];break}if(r>n&&r<this._pos[t+1]){o=this._colors[t],a=this._colors[t+1],o instanceof Array&&a instanceof Array||(i=[123,123,123]),r=(r-n)/(this._pos[t+1]-n),(!r||0>r)&&(r=.5),i=[o[0]+r*(a[0]-o[0]),o[1]+r*(a[1]-o[1]),o[2]+r*(a[2]-o[2])];break}}return[i[0]/255,i[1]/255,i[2]/255]}},CatmullRomUtil:{getPoints:function(e,t){e||(e=10);for(var r=[],n=0;e>=n;n++)r.push(this._getPoint(n/e,t));return r},_getPoint:function(e,t){var r,n,i,o,a,s,l=[];o=(t.length-1)*e,a=Math.floor(o),s=o-a,l[0]=0===a?a:a-1,l[1]=a,l[2]=a>t.length-2?t.length-1:a+1,l[3]=a>t.length-3?t.length-1:a+2;var c=t[l[0]],u=t[l[1]],h=t[l[2]],f=t[l[3]];return r=this._interpolate(s,c[0],u[0],h[0],f[0]),n=this._interpolate(s,c[1],u[1],h[1],f[1]),i=this._interpolate(s,c[2],u[2],h[2],f[2]),[r,n,i]},_interpolate:function(e,t,r,n,i){var o=.5*(n-t),a=.5*(i-r),s=e*e,l=e*s;return(2*r-2*n+o+a)*l+(-3*r+3*n-2*o-a)*s+o*e+r}},createTextTexture:function(e,t,r,n,i,o){c||(c=document.createElement("canvas"));var a,s,l,u,h=c.getContext("2d"),f=function(e){for(var t=1;e>t;)t*=2;return t},d=function(e,t){return e.measureText(t).width},p=function(e,t,r,n){t=t.replace("\n"," ");var i,o,a,s=t,l=0,c=0,u=t.split(" ");for(o=a=u.length;d(e,s)>r&&o>1;){o--;s=i="";for(var h=0;a>h;h++)o>h?(s+=u[h],o>h+1&&(s+=" ")):(i+=u[h],a>h+1&&(i+=" "))}return n.push(s),c=d(e,s),i&&(l=p(e,i,r,n),l>c&&(c=l)),c},y=256,g=[];if(y&&d(h,e)>y?(y=p(h,e,y,g),a=f(y)):(g.push(e),a=f(h.measureText(e).width)),s=f(t*(g.length+1)),s>a){var m=a;a=s,s=m}switch(c.width=a,c.height=s,n){case"left":l=0;break;case"center":l=a/2;break;case"right":l=a}u=s/2,h.fillStyle=o,h.fillRect(0,0,h.canvas.width,h.canvas.height),h.fillStyle=r,h.textAlign=n,h.textBaseline="middle",h.font=t+"px "+i;for(var v=.5*(s-t*(g.length+1)),b=0;b<g.length;b++)g.length>1&&(u=(b+1)*t+v),h.fillText(g[b],l,u);return c},createLinearHaloTexture:function(e,t){e instanceof Array&&3===e.length||(e=[255,255,255]),t instanceof Array&&3===t.length||(t=[255,255,0]),c||(c=document.createElement("canvas")),c.width=128,c.height=1;var r=c.getContext("2d"),n=r.createLinearGradient(0,0,c.width,0),i="rgba("+e[0]+","+e[1]+","+e[2]+",1.0)",o="rgba("+t[0]+","+t[1]+","+t[2]+",1.0)";return n.addColorStop(0,"rgba(255, 255, 255, 0.0)"),n.addColorStop(.4,o),n.addColorStop(.5,i),n.addColorStop(.6,o),n.addColorStop(1,"rgba(255, 255, 255, 0.0)"),r.fillStyle=n,r.fillRect(0,0,c.width,c.height),c},createRadialTexture:function(e,t){e instanceof Array&&3===e.length||(e=[255,255,255]),t instanceof Array&&3===t.length||(t=[255,255,0]),c||(c=document.createElement("canvas")),c.width=512,c.height=512;var r=c.getContext("2d"),n=[.5*c.width,.5*c.height],i=r.createRadialGradient(n[0],n[1],0,n[0],n[1],.5*Math.min(c.height,c.width)),o="rgba("+e[0]+","+e[1]+","+e[2]+",1.0)",a="rgba("+t[0]+","+t[1]+","+t[2]+",1.0)";return i.addColorStop(.05,o),i.addColorStop(.5,a),i.addColorStop(1,"rgba(255, 255, 255, 0.0)"),r.fillStyle=i,r.fillRect(0,0,c.width,c.height),r.fillRect(0,0,c.width,c.height),c},rgb2hexExt:function(e){return e instanceof Array&&3===e.length?"#"+("0"+parseInt(e[0],10).toString(16)).slice(-2)+("0"+parseInt(e[1],10).toString(16)).slice(-2)+("0"+parseInt(e[2],10).toString(16)).slice(-2):"#000000"},toPercent:function(e){var t=100*parseFloat(e),r=t.toString()+"%";return r},updateColorBar:function(e,t,r,n){if(e&&r instanceof Array&&t instanceof Array){var i="",o=t.length;i+="bottom: 4px;",i+="right: 4px;",i+="font-size: 12px;",n?(i+="width: "+60*o+"px;",i+="height: 80px;"):(i+="width: 80px;",i+="height: "+50*o+"px;"),e.style.cssText="position: absolute; display: block; z-index: 110; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.5); border-width: 0px; border-radius: 1px; border-style: solid; border-color: rgba(255,255,255,0.3); -webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.05); box-shadow: 0 1px 1px rgba(0,0,0,0.05);",e.style.cssText+=i;var a=document.createElement("canvas");n?(a.height=.4*e.clientHeight,a.width=e.clientWidth):(a.height=e.clientHeight,a.width=.4*e.clientWidth);var s=a.getContext("2d"),l=null;l=n?s.createLinearGradient(0,0,a.width,a.height):s.createLinearGradient(0,0,0,a.height);for(var c=0;c<r.length;c++)!(r[c]instanceof Object)||null===r[c].step&&null==r[c].step||null===r[c].color&&null==r[c].color||l.addColorStop(r[c].step,this.rgb2hexExt(r[c].color));s.fillStyle=l,s.fillRect(0,0,a.width,a.height);var u=document.getElementById("3dexpColorBar");u.src=a.toDataURL(),u.style.width=a.width+" px",u.style.height=a.height+" px";var h=document.getElementsByClassName("3dexpSpanLabel"),f=e;if(f&&h.length>0)for(;h.length>0;)f.removeChild(h[0]);for(var d=0;d<r.length;d++)if(r[d]instanceof Object&&(null!==r[d].label||null!=r[d].label)&&(null!==r[d].step||null!=r[d].step)){var p=document.createElement("span");p.className="3dexpSpanLabel",p.style.cssText="position: absolute; left: 46px; font-family: 'Arial', sans-serif; font-size: 12px; color: #e0e0e0; font-style: italic;",n?(p.style.cssText+="top: "+1.5*a.height+"px",p.style.cssText+="left: "+this.toPercent(r[d].step>.99?r[d].step-.14:r[d].step)+";"):(p.style.cssText+="left: "+1.5*a.width+"px",p.style.cssText+="top: "+this.toPercent(r[d].step>.99?r[d].step-.06:r[d].step)+";"),p.innerHTML="<span>"+r[d].label+r[d].unit+"</span>",f.appendChild(p)}}},createColorBar:function(){var e=document.createElement("div");document.body.appendChild(e);var t=document.createElement("img");return t.id="3dexpColorBar",e.appendChild(t),e},showColorBar:function(e,t){e&&(t?e.style.display="block":e.style.display="none")},equals:function(e,t){var r,n;return e===t?!0:typeof e!=typeof t?!1:"object"==typeof e?e.constructor===e.constructor?e instanceof Array?e.length===t.length?e.every(function(e,r){return equals(e,t[r])}):!1:e instanceof RegExp?e.toString()===t.toString():(r=Object.keys(e),n=Object.keys(t),r.length===n.length?r.every(function(r){return equals(e[r],t[r])}):!1):!1:"function"==typeof e?e.toString()===t.toString():e===t},isUrl:function(e){var r="^"+t.url({allowNamed:!0,allowLocal:!0}),n=new RegExp(r,"g"),i=n.test(e);return i},availableVizTypes:function(e){var t=o[e];return t?t:[]},effectConfig:function(t){var r=Object.getOwnPropertyNames(o),n=null;return e.some(r,function(r){return e.some(o[r],function(e){return t.toLowerCase()===e.name.toLowerCase()?(n=e,!0):void 0})}),n},extensionsMessage:function(){var e=document.createElement("div");e.innerHTML=f(h),e.style.position="fixed",e.style.top="0",e.style.width="100%",e.style.color="#ff0000",e.style.zIndex=1e6,document.body.appendChild(e)}},h='The 3DFx requires a browser that supports `OES_element_index_uint` and `OES_texture_float` extensions of WebGL. <br/><a href="https://www.khronos.org/registry/webgl/extensions">Click here for more information.</a>',f=function(e){return'<table style="background-color: #8CE; width: 100%; height: 100%;"><tr><td align="center"><div style="display: table-cell; vertical-align: middle;"><div style="">'+e+"</div></div></td></tr></table>"};return u});