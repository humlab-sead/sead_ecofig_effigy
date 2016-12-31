"use strict";

import { default as ecoCodeConfig } from './config.ecocode.js';
import { default as ecofigDefaultModelSetup } from './config.ecofig.model.js';

const ecofigSetup = {
    ecoCodeConfig: ecoCodeConfig,
    ecofigModelSetup: ecofigDefaultModelSetup,
    restUrl: '/geo2.json'
}
export default ecofigSetup;
