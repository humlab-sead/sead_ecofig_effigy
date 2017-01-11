"use strict";

import { default as ecoCodeConfig } from './config.ecocode.js';
import { default as ecofigDefaultModelSetup } from './config.ecofig.model.js';

const ecofigSetup = {
    ecoCodeConfig: ecoCodeConfig,
    ecofigModelSetup: ecofigDefaultModelSetup,
    restUrl: '/geo2.json',

    getEcoCode: id => ecofigSetup.ecoCodeConfig.ecoCodeMap.get(id),
    getEcoCodeSetup: id => ecofigSetup.ecofigModelSetup.cesiumModelConfig.ecoCodeConfig.get(id),
    getDefaultModelStrategy: () => ecofigSetup.ecofigModelSetup.cesiumModelStrategy,
    getDefaultBoundryStrategy: () => ecofigSetup.ecofigModelSetup.boundry.modelStrategy,
    getDefaultCoalesceStrategy: () => ecofigSetup.ecofigModelSetup.ecofigCoalesceStrategy,
    getDefaultLayoutStrategy: () => ecofigSetup.ecofigModelSetup.ecofigLayoutStrategy
}
export default ecofigSetup;
