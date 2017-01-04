'use strict';

var Cesium = require('cesium/Source/Cesium');

import { default as ecofigConfig } from './config.js';
import { default as utility } from './utility.js';

// import { default as cesiumUtility } from './CesiumUtility.js';

class CesiumModelStrategy {
    create() {
        return null;
    }
}

// http://stackoverflow.com/questions/34727726/what-is-difference-between-entity-and-primitive-in-cesiumjs

class GltfCesiumModelStrategy extends CesiumModelStrategy {

    constructor() {
        super();
        this.modelConfig = ecofigConfig.ecofigModelSetup.cesiumModelConfig;
        this.assetPath = this.modelConfig.assetPath;
        this.ecoCodeConfig = this.modelConfig.ecoCodeConfig;
    }

    create(ecofig, ecofigValue) {
        // FIXME Implement the various possible config setups!!!
        let ecoCodeConfig = this.ecoCodeConfig.get(ecofigValue.ecoCode.id);
        return this.createModels(ecofig, ecofigValue, ecoCodeConfig);
    }

    createModels(ecofig, ecofigValue, ecoCodeConfig) {
        // FIXME Scale, Multiply, background etc
        // FIXME change to entity api

        let models = [];

        //[ "BEco1",  { type: "default", setup: { asset: "waterdrop.gltf", scale: false, multiply: [0,10], spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}] 

        // scale=[0.2, 0.15] [ scale[0] * c[0] + origo[0], scale[1] * c[1] + origo[1]

        let modelCount = ecoCodeConfig.setup.multiply ? Math.ceil(ecofigValue.scale * ecoCodeConfig.setup.multiply[1]) : 1;
        let coordinate = (ecoCodeConfig.setup.spread === "random") ? (() => utility.randomCirclePoint(ecofig.position, 0.25)) : (() => ecofigValue.position);
        let scale = ecoCodeConfig.setup.multiply ? 1 : ecofigValue.scale;

        while (modelCount-- > 0) {
            models.push(new Cesium.Entity({
                position : Cesium.Cartesian3.fromDegrees(...coordinate()),
                model : {
                    uri :this.assetPath + ecoCodeConfig.setup.asset,
                    scale: this.modelConfig.modelScale * scale
                }
            }));
        }

        return models;
    }

}

export { GltfCesiumModelStrategy };
