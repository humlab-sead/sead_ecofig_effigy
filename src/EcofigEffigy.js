'use strict';

import { default as ecofigConfig } from './config.js';

class EcofigEffigy { //  alt-names: SiteEffigy, SiteDepiction, EcofigEffigy

    constructor(ecofigs, options) {
        this.update(ecofigs, options);
    }

    update(ecofigs, options={}, scale=ecofigConfig.ecofigModelSetup.modelScale) {
        this.ecofigs = ecofigs;
        this.scale = scale;
        this.ecofig = this.coalesce();
        this.layout();
        this.models = this.createModels();
        this.boundry = this.createBoundry();
    }

    getModels() {
        return this.models.set('boundry', [ this.boundry ]);
    }

    createModels(strategy=ecofigConfig.ecofigModelSetup.cesiumModelStrategy, config=ecofigConfig.ecofigModelSetup)
    {
        return new Map(this.ecofig.values.map(x => [ x.ecoCode.id, strategy.create(this.ecofig, x, config) ]));
    }

    createBoundry(strategy=ecofigConfig.ecofigModelSetup.boundry.modelStrategy, config=ecofigConfig.ecofigModelSetup.boundry.config)
    {
        return strategy.create(this.ecofig, config.config);
    }

    coalesce(strategy=ecofigConfig.ecofigModelSetup.ecofigCoalesceStrategy) {
        return strategy.coalesce(this.ecofigs);
    }

    layout(strategy=ecofigConfig.ecofigModelSetup.ecofigLayoutStrategy) {
        return strategy.layout(this.ecofig);
    }

    rescale() { }
}

export { EcofigEffigy };
