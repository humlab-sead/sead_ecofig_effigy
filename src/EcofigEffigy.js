'use strict';
var Cesium = require('cesium/Source/Cesium');

import { Json2Ecofig } from './Ecofig.js';
import { default as ecofigConfig } from './config.js';
import { default as cesiumUtility } from './CesiumUtility.js';

class EcofigDepiction { //  alt-names: SiteEffigy, SiteDepiction, EcofigEffigy

    constructor(ecofigs) {

        this.ecofig = ecofigCoalesceStrategy.create(ecofigs);
        this.position = ecofig.position;
        this.scale = ecofigConfig.ecofigModelSetup.modelScale;
        this.ecofig = Json2Ecofig.create(ecofigs);

        // TODO: Move to a controller
        ecofigConfig.ecofigModelSetup.ecofigLayoutStrategy.layout(this.ecofig);

        this.cesiumModels = new Map(this.ecofig.values.map(x => [ x.ecoCode.id, ecofigConfig.ecofigModelSetup.cesiumModelStrategy.create(this.ecofig, x) ]));
        this.cesiumBoundry = ecofigConfig.ecoFigModelSetup.boundryModelStrategy.createBoundryFor();
    }

    // setScaleByHeight(height) {
    //     this.scale = 0.001 * height;
    //     for (var key in this.cesiumModels) {
    //         this.cesiumModels[key].scale = this.scale;
    //     }
    // }



}

class EnvironmentMarkers {

    constructor(viewer) {
        this.markers = [];
        this.viewer = viewer;
    }

    get(url) {
        let promise = Cesium.loadJson(url);
        promise
            .then(jsonData => this.load(jsonData.features))
            .otherwise(function (error) {
                console.error(error);
            });
    }
//http://stackoverflow.com/questions/34727726/what-is-difference-between-entity-and-primitive-in-cesiumjs

    addToViewer(viewer, marker) {
        marker.cesiumModels.forEach(x => viewer.scene.primitives.add(x));
        
        viewer.entities.add(marker.cesiumBoundry);
    }

    load(data) {
        for (var key in data) {
            var marker = this.findCloseByMarker(data[key], ecofigConfig.ecofigModelSetup.modelScale);
            if (marker) {
                marker.merge(data[key]);
            } else {
                let ecofig = Json2Ecofig(data[key]);
                this.markers.push(new EcofigDepiction(ecofig));
            }
        }

        return this.markers;
    }

    findCloseByMarker(env, mergeDistance) {

        for (var key in this.markers) {
            var marker = this.markers[key];
            if (cesiumUtility.distance(marker.coordinates, env.geometry.coordinates) < mergeDistance) {
                return marker;
            }
        }
        return null;
    }


}

export { EcofigDepiction, EnvironmentMarkers };
