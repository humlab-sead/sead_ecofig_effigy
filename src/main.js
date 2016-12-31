'use strict';
// require('cesium/Source/Widgets/widgets.css');
// require('jquery-ui/themes/base/core.css');
// require('jquery-ui/themes/base/menu.css');
// require('jquery-ui/themes/base/theme.css');

var $ = require('jquery');

import "../css/main.css";
import "../css/map.css";

var BuildModuleUrl = require('cesium/Source/Core/buildModuleUrl');
BuildModuleUrl.setBaseUrl('./Cesium/');

import CesiumView from './CesiumView';
import TimelineSlider from './TimelineSlider';
import { default as wireup } from './wireup';

var cesiumView = null;

$(document).ready(function () {

    wireup.wireup();
    
    // TODO create store

    new TimelineSlider("#timeline", () => { } )

    cesiumView = new CesiumView('cesiumContainer');
    cesiumView.get("/geo2.json");
    cesiumView.flyTo();

    // setInterval(function() {
    //     var camera = cesiumView.viewer.scene.camera;
    //     var state = {
    //         position: camera.position.clone(),
    //         direction: camera.direction.clone(),
    //         up: camera.up.clone(),
    //         right: camera.right.clone(),
    //         transform: camera.transform.clone(),
    //         frustum: camera.frustum.clone()
    //     };
    //     console.log(state);
    // }, 1000);

});
