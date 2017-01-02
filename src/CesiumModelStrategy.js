'use strict';

var Cesium = require('cesium/Source/Cesium');

import { default as ecofigConfig } from './config.js';
// import { default as cesiumUtility } from './CesiumUtility.js';

class CesiumModelStrategy {
    create() {
        return null;
    }
}

class GltfCesiumModelStrategy extends CesiumModelStrategy {

    constructor() {
        super();
        this.modelConfig = ecofigConfig.ecofigModelSetup.cesiumModelConfig;
        this.assetPath = this.modelConfig.assetPath;
        this.ecoCodeConfig = this.modelSetup.ecoCodeConfig;
    }

    create(ecofig, ecofigValue) {

        // TODO Implement the various possible config setups!!!

        let ecoCodeConfig = this.ecoCodeConfig.get(ecofigValue.ecoCode.id);
        return this.createModels(ecofig, ecofigValue, ecoCodeConfig);
    }

    createModels(ecofig, ecofigValue, ecoCodeConfig) {

        // TODO: Scale, Multiply, background etc
        // TODO change to entity api

        return new Cesium.Entity({
            position : Cesium.Cartesian3.fromDegrees(...ecofigValue.position),
            model : {
                uri :this.assetPath + ecoCodeConfig.setup.asset,
                scale: this.modelConfig.modelScale * ecofigValue.scale
            }
        });
        // return Cesium.Model.fromGltf({
        //     url : this.assetPath + ecoCodeConfig.setup.asset,
        //     modelMatrix : cesiumUtility.createMatrix(ecofigValue.position),
        //     scale : this.modelConfig.modelScale * ecofigValue.scale
        // });
    }

}

export { GltfCesiumModelStrategy };
