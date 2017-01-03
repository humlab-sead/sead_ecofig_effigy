"use strict";

var Viewer = require('cesium/Source/Widgets/Viewer/Viewer');
var Cesium = require('cesium/Source/Cesium');

import { default as ecofigConfig } from './config.js';
import { default as cesiumUtility } from './CesiumUtility.js';

class CesiumView {

// 'cesiumContainer'

    constructor(container) {

        Cesium.BingMapsApi.defaultKey = "AtX_asZEVy_1leXfOPX_93jqHdVNDK1_c4m_vafwQLV5-2GLt6yLQIjIQZJHWKSp";

        this.viewer = new Viewer(container, {
            homeButton: true,
            infoBox: true,
            imageryProvider: new Cesium.UrlTemplateImageryProvider({
                url: 'http://{s}.tiles.mapbox.com/v3/isawnyu.map-knmctlkh/{z}/{x}/{y}.png',
            }),
            baseLayerPicker: false,
            //imageryProviderViewModels: [],
            terrainProvider: new Cesium.CesiumTerrainProvider({
                url: 'https://assets.agi.com/stk-terrain/world',
                requestWaterMask: true,
                requestVertexNormals: true
            }),
            terrainExaggeration: 3.0,
            shadows: true,
            mapProjection: new Cesium.WebMercatorProjection(),
            animation: false,
            timeline: false,
            sceneMode: Cesium.SceneMode.COLUMBUS_VIEW
        });

    }

    flyTo() { 
        cesiumUtility.flyTo(this.viewer.camera, ecofigConfig.ecofigModelSetup.startDestination, ecofigConfig.ecofigModelSetup.startOrientation);
    }

    display(models, boundry) {
        models.forEach(x => this.viewer.scene.primitives.add(x));
        this.viewer.entities.add(boundry);
    }

    removeAll() {
        this.viewer.entities.removeAll();
    }
}

export default CesiumView;
