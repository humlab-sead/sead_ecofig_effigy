'use strict';
var Cesium = require('cesium/Source/Cesium');

import { Json2Ecofig } from './Ecofig.js';
import { default as ecofigConfig } from './config.js';
import { default as cesiumUtility } from './CesiumUtility.js';

class EcofigEffigy { //  alt-names: SiteEffigy, SiteDepiction, EcofigEffigy

    constructor(ecofigs) {

        this.ecofigs = ecofigs;
        this.ecofig = ecofigConfig.ecofigModelSetup.ecofigCoalesceStrategy.coalesce(ecofigs);
        this.scale = ecofigConfig.ecofigModelSetup.modelScale;

        // FIXME Move to a controller?
        // this.layout(this.ecofig);

        this.models = this.createModels(this.ecofig);
        this.boundry = ecofigConfig.ecoFigModelSetup.boundryModelStrategy.createBoundryFor();

    }

    createModels(ecofig)
    {
        return new Map(ecofig.values.map(x => [ x.ecoCode.id, ecofigConfig.ecofigModelSetup.cesiumModelStrategy.create(ecofig, x) ]));
    }

    createBoundry(ecofig)
    {
        return new Map(ecofig.values.map(x => [ x.ecoCode.id, ecofigConfig.ecofigModelSetup.cesiumModelStrategy.create(ecofig, x) ]));
    }

    coalesc(ecofigs) {
        return ecofigConfig.ecofigModelSetup.ecofigCoalesceStrategy.coalesce(ecofigs);
    }

    layout(ecofig) {
        return ecofigConfig.ecofigModelSetup.ecofigLayoutStrategy.layout(ecofig);
    }

    rescale() { }
}

export { EcofigEffigy };
