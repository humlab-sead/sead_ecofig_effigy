'use strict';

import { default as ecofigConfig } from './config.js';

const defaultModelConfig = ecofigConfig.ecofigModelSetup;
const defaultBoundryConfig = defaultModelConfig.boundry.config;

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

    createModels(strategy=ecofigConfig.getDefaultModelStrategy(), config=defaultModelConfig)
    {
        return new Map(this.ecofig.values.map(x => [ x.ecoCode.id, strategy.create(this.ecofig, x, config) ]));
    }

    createBoundry(strategy=ecofigConfig.getDefaultBoundryStrategy(), config=defaultBoundryConfig)
    {
        return strategy.create(this.ecofig, config.config);
    }

    coalesce(strategy=ecofigConfig.getDefaultCoalesceStrategy()) {
        return strategy.coalesce(this.ecofigs);
    }

    layout(strategy=ecofigConfig.getDefaultLayoutStrategy()) {
        // FIXME: Should be bound to models as well
        return strategy.layout(this.ecofig);
    }

    rescale(id, scale) {
    }
}

export { EcofigEffigy };
