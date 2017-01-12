'use strict';

var Cesium = require('cesium/Source/Cesium');

import { default as ecofigConfig } from './config.js';
import { default as utility } from './utility.js';

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

    computeCoordinate(ecofigValue, magnitude=0.2)
    {
        if (ecofigValue.options.spread === "random")
            return utility.randomCirclePoint(ecofigValue.ecofig.position, magnitude)
        return ecofigValue.position;
    }

    createModels(ecofig, ecofigValue) {
        let model = {
            uri: this.assetPath + ecofigValue.options.asset,
            scale: ecofigValue.computeScale(),                      // runAnimations: false, shadows: false
        };
        let entities = [];
        let count = ecofigValue.getModelCount()
        while (count-- > 0) {
            let [x, y, z] = this.computeCoordinate(ecofigValue);
            entities.push(new Cesium.Entity({
                position : Cesium.Cartesian3.fromDegrees(x, y, 0),
                model : model
            }));
        }
        return entities;
    }
}

export { GltfCesiumModelStrategy };
