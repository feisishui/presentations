///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
    'dojo/_base/declare',
    'jimu/BaseWidget',
    'esri/widgets/Zoom',
    'esri/widgets/Zoom/ZoomViewModel'
  ], function(declare, BaseWidget, Zoom, ZoomViewModel) {
    var clazz = declare([BaseWidget], {

      name: 'ZoomSlider',
      baseClass: 'jimu-widget-zoom',

      postCreate: function(){
        this.inherited(arguments);
        this.zoom = new Zoom({
          viewModel: new ZoomViewModel({
            view: this.sceneView
          })
        });
        this.zoom.placeAt(this.domNode);
      }

    });

    return clazz;
  });