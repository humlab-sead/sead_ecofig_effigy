'use strict';

var Cesium = require('cesium/Source/Cesium');

import { default as ecofigConfig } from './config.js';
import { default as utility } from './utility.js';

// import { default as cesiumUtility } from './CesiumUtility.js';

const randomCirclePoint = (ecofig, value, circleRadius=0.2) => utility.randomCirclePoint(ecofig.position, circleRadius);
const valuePoint = (ecofig, value) => value.position;

var coordinateComputor = (x) => {
    return (x === "random") ? randomCirclePoint : valuePoint;
}

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
        // FIXME Implement the various possible config setups!!!
        let ecoCodeConfig = this.ecoCodeConfig.get(ecofigValue.ecoCode.id);
        return this.createModels(ecofig, ecofigValue, ecoCodeConfig);
    }

    computeScale(ecofigValue, config, globalScale=this.modelConfig.modelScale) {
        return (config.scale ? ecofigValue.scale : 1.0) * (parseFloat(config.factor) || 1.0) * globalScale;
    }

    // FIXME: Radius should be within boundry (and in Cartesian3 instead of degrees)!
    computeCoordinate(ecofig, ecofigValue, config, circleRadius=0.2)
    {
        return (config.spread === "random") ?
            utility.randomCirclePoint(ecofig.position, circleRadius) : ecofigValue.position;
    }

    computeModelCount(ecofigValue, config)
    {
        return config.multiply ? Math.ceil(ecofigValue.scale * config.multiply[1]) : 1;
    }

    createModels(ecofig, ecofigValue, ecoCodeConfig) {
        // FIXME Allow runtime changes?
        // FIXME Scale, Multiply, background etc
        let config = ecoCodeConfig.setup;
        let models = [];

        let modelCount = this.computeModelCount(ecofigValue, config);
        let scale = this.computeScale(ecofigValue, config);
        let computeCoordinate = coordinateComputor(config.spread);
        let model = {
            uri: this.assetPath + config.asset,
            scale: scale,
            //runAnimations: false,
            //shadows: false
        };
        while (modelCount-- > 0) {
            let [x, y, z] = computeCoordinate(ecofig, ecofigValue);
            models.push(new Cesium.Entity({
                position : Cesium.Cartesian3.fromDegrees(x, y, 0),
                model : model
            }));
        }

        return models;
    }

}

export { GltfCesiumModelStrategy };
