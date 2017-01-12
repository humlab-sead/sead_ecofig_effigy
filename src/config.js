"use strict";

import { default as ecoCodeConfig } from './config.ecocode.js';
import { default as ecofigDefaultModelSetup } from './config.ecofig.model.js';

const ecofigSetup = {
    ecoCodeConfig: ecoCodeConfig,
    ecofigModelSetup: ecofigDefaultModelSetup,
    restUrl: '/geo2.json',

    getEcoCode: id => ecofigSetup.ecoCodeConfig.ecoCodeMap.get(id),
    getEcoCodeByLabel: label => ecofigSetup.ecoCodeConfig.ecoCodeLabelMap.get(label),
    getEcoCodeSetup: id => ecofigSetup.ecofigModelSetup.cesiumModelConfig.ecoCodeConfig.get(id).setup,
    getDefaultModelStrategy: () => ecofigSetup.ecofigModelSetup.cesiumModelStrategy,
    getDefaultBoundryStrategy: () => ecofigSetup.ecofigModelSetup.boundry.modelStrategy,
    getDefaultCoalesceStrategy: () => ecofigSetup.ecofigModelSetup.ecofigCoalesceStrategy,
    getDefaultLayoutStrategy: () => ecofigSetup.ecofigModelSetup.ecofigLayoutStrategy,

    globalScale: ecofigDefaultModelSetup.modelScale
}
export default ecofigSetup;
