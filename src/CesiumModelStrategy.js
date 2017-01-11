'use strict';

var Cesium = require('cesium/Source/Cesium');

import { default as ecofigConfig } from './config.js';

class CesiumModelStrategy {
    create() {
        return null;
    }
}

// http://stackoverflow.com/questions/34727726/what-is-difference-between-entity-and-primitive-in-cesiumjs

class GltfCesiumModelStrategy extends CesiumModelStrategy {

    constructor(config=ecofigConfig.ecofigModelSetup.cesiumModelConfig) {
        super();
        this.modelConfig = config;
        this.assetPath = config.assetPath;
        this.ecoCodeConfig = config.ecoCodeConfig;
    }

    create(ecofig, ecofigValue) {
        return this.createModels(ecofig, ecofigValue);
    }

    createModels(ecofig, ecofigValue) {

        let entities = [];
        let computeCoordinate = coordinateComputor(ecofigValue.options.spread);
        let model = {
            uri: this.assetPath + ecofigValue.options.asset,
            scale: ecofigValue.computeScale(),                      // runAnimations: false, shadows: false
        };
        let count = ecofigValue.getModelCount()
        while (count-- > 0) {
            let [x, y, z] = computeCoordinate(ecofig, ecofigValue);
            entities.push(new Cesium.Entity({
                position : Cesium.Cartesian3.fromDegrees(x, y, 0),
                model : model
            }));
        }

        return entities;
    }

}

export { GltfCesiumModelStrategy };
