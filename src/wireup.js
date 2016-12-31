"use strict";

import { default as ecofigConfig } from './config.js'; 
import { default as wireupConfig } from './wireupConfig.js';

const wireup = () =>
{
    let boundry = ecofigConfig.ecofigModelSetup.boundry;

    boundry.config.modelStrategy = wireupConfig.boundry.modelStrategy;
    boundry.config.geometryStrategy = wireupConfig.boundry.geometryStrategy;
    boundry.modelStrategy = new boundry.config.modelStrategy(new boundry.config.geometryStrategy(), boundry.config);

    ecofigConfig.ecofigModelSetup.midPointCalculator = new wireupConfig.midPointCalculator();
    ecofigConfig.ecofigModelSetup.ecofigLayoutStrategy = new wireupConfig.ecofigLayoutStrategy();
    ecofigConfig.ecofigModelSetup.cesiumModelStrategy = new wireupConfig.cesiumModelStrategy();
    ecofigConfig.ecofigModelSetup.ecofigCoalesceStrategy = new wireupConfig.ecofigCoalesceStrategy();

}

export default wireup;
