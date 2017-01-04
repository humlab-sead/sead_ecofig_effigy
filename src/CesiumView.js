"use strict";

var Viewer = require('cesium/Source/Widgets/Viewer/Viewer');
var Cesium = require('cesium/Source/Cesium');

import { default as ecofigConfig } from './config.js';
import { default as cesiumUtility } from './CesiumUtility.js';

class CesiumView {

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

    flyTo(destination, orientation) { 
        cesiumUtility.flyTo(this.viewer.camera, destination, orientation);
    }

    display(models) {
        models.forEach(x => {
            try {
                x.forEach(y => this.viewer.entities.add(y));
            } catch (ex) {
                console.log(ex);
            }
        });
    }

    reset() {
        // FIXME: Need smarter reset, and also to remove boundries
        this.viewer.entities.removeAll();
    }

}

export default CesiumView;
