"use strict";

// Alt #1: var Viewer = require('cesium/Source/Widgets/Viewer/Viewer');
// Alt #1: var Cesium = require('cesium/Source/Cesium');
import { default as Cesium } from "cesiumDll/Cesium";

//import { default as ecofigConfig } from './config.js';
import { default as cesiumUtility } from './CesiumUtility.js';

class CesiumView {

    constructor(container /*, config=ecofigConfig*/) {

        Cesium.BingMapsApi.defaultKey = "AtX_asZEVy_1leXfOPX_93jqHdVNDK1_c4m_vafwQLV5-2GLt6yLQIjIQZJHWKSp";

        let imageryProvider = new Cesium.UrlTemplateImageryProvider({
            url: 'http://{s}.tiles.mapbox.com/v3/isawnyu.map-knmctlkh/{z}/{x}/{y}.png',
        });

        let terrainProvider = new Cesium.CesiumTerrainProvider({
            url: 'https://assets.agi.com/stk-terrain/world',
            requestWaterMask: true,
            requestVertexNormals: true
        });

        this.viewer = new Cesium.Viewer(container, {
            homeButton: false,
            infoBox: true,
            imageryProvider:imageryProvider,
            baseLayerPicker: false,
            terrainProvider: terrainProvider,
            terrainExaggeration: 3.0,
            shadows: false, //true,
            mapProjection: new Cesium.WebMercatorProjection(),
            animation: false,
            timeline: false,
            sceneMode: Cesium.SceneMode.COLUMBUS_VIEW
        });

    }

    flyTo(destination, orientation) { 
        cesiumUtility.flyTo(this.viewer.camera, destination, orientation);
    }

    display(models) {
        models.forEach(x => { x.forEach(y => this.viewer.entities.add(y)); });
    }

    reset() {
        this.viewer.entities.removeAll();
    }

}

export default CesiumView;
