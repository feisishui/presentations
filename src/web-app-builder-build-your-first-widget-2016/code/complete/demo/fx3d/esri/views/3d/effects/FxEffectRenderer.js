/**
 * Copyright @ 2016 Esri.
 * All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 */
define(["dojo/_base/declare","dojo/_base/lang","esri/core/Collection","esri/core/Scheduler","esri/core/watchUtils","esri/views/3d/webgl-engine/lib/ShaderSnippets","esri/views/3d/support/earthUtils","esri/views/3d/lib/glMatrix","esri/views/3d/webgl-engine/lib/RenderSlot","./Effect","../support/fx3dUtils","dojo/text!./CommonShaders.xml"],function(e,t,i,s,n,a,r,_,h,o,d,c){var f=_.mat4d,l=_.vec3d,x=e(null,{declaredClass:"esri.views.3d.effects.FxEffectRenderer",constructor:function(){this._sceneView=null,this._internallyReady=!1,this._effects=new i,this._fx3dFrameTask=null,this._shaderSnippets=null,this._normalMatrix=f.create(),this._viewDirection=l.create()},_init:function(e){!this._internallyReady&&t.isObject(e)&&(this._sceneView=e,n.whenTrue(this._sceneView,"ready",this._viewReadyHandler.bind(this)),this._effects.on("change",this._collectionChangeHandler.bind(this)))},_viewReadyHandler_bak:function(){this._gl=this._sceneView._stage&&this._sceneView._stage.view&&this._sceneView._stage.view._gl,this._gl instanceof window.WebGLRenderingContext&&(this._internallyReady!==!0&&(this._enableExtensions()?(this._shaderSnippets||(this._shaderSnippets=new a,this._shaderSnippets._parse(c)),this._internallyReady=!0):d.extensionsMessage()),this._internallyReady&&(this._fx3dFrameTask||this._initializeFrameTask()))},_viewReadyHandler:function(){this._sceneView._stage.addExternalRenderer([h.OPAQUE_TERRAIN],this)},_enableExtensions:function(){var e=this._gl.getExtension("OES_element_index_uint")||this._gl.getExtension("MOZ_OES_element_index_uint")||this._gl.getExtension("WEBKIT_OES_element_index_uint");return e&&(e=this._gl.getExtension("OES_texture_float")||this._gl.getExtension("OES_texture_float_linear")||this._gl.getExtension("OES_texture_half_float")||this._gl.getExtension("OES_texture_half_float_linear")),e?!0:!1},_update:function(){this._lightingData=this._sceneView._stage.view._viewport.getLightingData(),this._camera=this._sceneView._stage.getCamera(),this._cameraPos=this._camera._eye,this._viewMatrix=this._camera.viewMatrix,this._projMatrix=this._camera.projectionMatrix,this._viewInverseTransposeMatrix=this._camera.viewInverseTransposeMatrix,this._viewport=this._camera.viewport,f.set(this._viewInverseTransposeMatrix,this._normalMatrix),this._normalMatrix[3]=this._normalMatrix[7]=this._normalMatrix[11]=0,l.set3(this._viewMatrix[12],this._viewMatrix[13],this._viewMatrix[14],this._viewDirection)},initializeRenderContext:function(e){this.needsRender=!1,this._gl=e.gl,this._internallyReady!==!0&&(this._enableExtensions()?(this._shaderSnippets||(this._shaderSnippets=new a,this._shaderSnippets._parse(c)),this._internallyReady=!0,this.needsRender=!0):(this._sceneView._stage.removeExternalRenderer(this),d.extensionsMessage()))},render:function(e){f.set(e.camera.viewInverseTransposeMatrix,this._normalMatrix),this._normalMatrix[3]=this._normalMatrix[7]=this._normalMatrix[11]=0,this._effects.forEach(function(e){e.effect.preRender()}),this._effects.forEach(function(t){t.effect.render({proj:e.camera.projectionMatrix,view:e.camera.viewMatrix,normalMat:this._normalMatrix,camPos:e.camera._eye,earthRadius:r.earthRadius,lightingData:e.lightingData,viewport:e.camera.viewport})}.bind(this)),this._effects.forEach(function(e){e.effect.update()})},_initializeFrameTask:function(){var e=this;this._frameTask={preRender:function(){e._update(),e._effects.forEach(function(e){e.effect.preRender()})},render:function(){e._effects.forEach(function(t){t.effect.render({proj:e._projMatrix,view:e._viewMatrix,normalMat:e._normalMatrix,camPos:e._cameraPos,earthRadius:r.earthRadius,lightingData:e._lightingData,viewport:e._viewport})})},update:function(){e._effects.forEach(function(e){e.effect.update()}),e._sceneView._stage.setNeedsRender()}},this._fx3dFrameTask=s.addFrameTask(this._frameTask)},_add:function(e,i){if(t.isObject(e)&&"esri.layers.FxLayer"===e.declaredClass&&t.isObject(i)){var s=this._effects.add||this._effects.addItem;"function"==typeof s&&s.call(this._effects,{id:e.id,effect:i})}},_remove:function(e,t){if(e&&"esri.layers.FxLayer"===e.declaredClass){t=t||e.id;var i=this._effects.findIndex(function(e){return e.id===t?!0:void 0});"number"==typeof i&&i>-1&&this._effects.removeItemAt(i),0===this._effects.length&&(this._effects.clear(),this._fx3dFrameTask&&(this._fx3dFrameTask.remove(),this._fx3dFrameTask=null),this._internallyReady=!1,this._sceneView._stage.removeExternalRenderer(this))}},_collectionChangeHandler:function(e){var t=null;e.added.length>0?(t=e.added[0],t.id&&t.effect instanceof o&&"function"==typeof t.effect.setContext&&t.effect.setContext({gl:this._gl,shaderSnippets:this._shaderSnippets})):e.removed.length>0&&(t=e.removed[0],t.id&&t.effect instanceof o&&t.effect.destroy())}}),u=null;return x.init=function(e){u||(u=new x),u._init(e)},x.add=function(e,t){u&&u._add(e,t)},x.destroy=function(e,t){u&&u._remove(e,t)},x.pause=function(){u&&(u._fx3dFrameTask&&u._fx3dFrameTask.pause(),u.needsRender=!1)},x});