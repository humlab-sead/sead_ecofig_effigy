'use strict';

import { default as ecofigConfig } from './config.js';

const defaultModelStrategy = ecofigConfig.ecofigModelSetup.cesiumModelStrategy;
const defaultModelConfig = ecofigConfig.ecofigModelSetup;
const defaultBoundryStrategy = ecofigConfig.ecofigModelSetup.boundry.modelStrategy;
const defaultBoundryConfig = ecofigConfig.ecofigModelSetup.boundry.config;
const defaultCoalesceStrategy = ecofigConfig.ecofigModelSetup.ecofigCoalesceStrategy;

class EcofigEffigy {

    constructor(ecofigs, scale=defaultModelConfig.modelScale) {
        this.ecofigs = ecofigs;
        this.ecofig = this.coalesce();
        this.scale = scale;
        this.update();
    }

    update() {
        this.layout();
        this.models = this.createModels();
        this.boundry = this.createBoundry();
    }

    getModels() {
        return this.models.set('boundry', [ this.boundry ]);
    }

    getEcoCodeModels(id) {
        return this.models.has(id) ? this.models.get(id) : [];
    }

    createModels(strategy=ecofigConfig.ecofigModelSetup.cesiumModelStrategy, config=ecofigConfig.ecofigModelSetup)
    {
        return new Map(this.ecofig.values.map(x => [ x.ecoCode.id, strategy.create(this.ecofig, x, config) ]));
    }

    createBoundry(strategy=defaultBoundryStrategy, config=defaultBoundryConfig)
    {
        return strategy.create(this.ecofig, config.config);
    }

    coalesce(strategy=defaultCoalesceStrategy) {
        return strategy.coalesce(this.ecofigs);
    }

    layout(strategy=ecofigConfig.ecofigModelSetup.ecofigLayoutStrategy) {
        // FIXME: Should be bound to models as well
        return strategy.layout(this.ecofig);
    }

    rescale(id, scale) {
    }
}

export { EcofigEffigy };
