'use strict';
var Cesium = require('cesium/Source/Cesium');

import { Json2Ecofig } from './Ecofig.js';
import { default as ecofigConfig } from './config.js';
import { default as EcofigEffigy } from './EcofigEffegy.js';
import { default as cesiumUtility } from './CesiumUtility.js';

class EcofigEffigyController {

    constructor(viewer, store) {
        this.ecofigEffegies = [];
        this.viewer = viewer;
    }
 
    //http://stackoverflow.com/questions/34727726/what-is-difference-between-entity-and-primitive-in-cesiumjs

    dispatch(viewer, ecofigEffegy) {
        ecofigEffegy.layout();
    }

    load(data) {
        for (var key in data) {
            var ecofigEffegy = this.findCloseByMarker(data[key], ecofigConfig.ecofigModelSetup.modelScale);
            if (ecofigEffegy) {
                ecofigEffegy.merge(data[key]);
            } else {
                let ecofig = Json2Ecofig(data[key]);
                this.ecofigEffegies.push(new EcofigEffigy(ecofig));
            }
        }
        return this.ecofigEffegies;
    }

    display(filter)
    {
        let ecofigs = this.store.find(filter);
        
        for (var key in this.ecofigEffegies) {
            var ecofigEffigy = this.ecofigEffegies[key];
            if (cesiumUtility.distance(marker.coordinates, env.geometry.coordinates) < mergeDistance) {
                return marker;
            }
        }
        return null;
    }
}

export { EcofigEffigyController };
