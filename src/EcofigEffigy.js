'use strict';

import { default as ecofigConfig } from './config.js';

const ecoCodeConfig = ecofigConfig.ecofigModelSetup.cesiumModelConfig;

class EcofigEffigy { //  alt-names: SiteEffigy, SiteDepiction, EcofigEffigy

    constructor(ecofigs, options) {
        this.update(ecofigs, options);
    }

    update(ecofigs, options={}, scale=ecofigConfig.ecofigModelSetup.modelScale) {
        this.ecofigs = ecofigs;
        this.scale = scale;
        this.ecofig = this.coalesce();
        this.layout();
        // FIXME Move to ecofigValue???
        ecofig.createModels();
        this.boundry = this.createBoundry();
    }

    getModels() {
        return this.values.reduce((a, b) => a.models.concat(b), []).set('boundry', [ this.boundry ]);
    }

    createModels(strategy=ecofigConfig.ecofigModelSetup.cesiumModelStrategy, config=ecofigConfig.ecofigModelSetup)
    {
        this.ecofig.values.forEach(
            x => { x.models = strategy.create(this.ecofig, x, config); }
        )
        //return new Map(this.ecofig.values.map(x => [ x.ecoCode.id, strategy.create(this.ecofig, x, config) ]));
    }

    createBoundry(strategy=ecofigConfig.ecofigModelSetup.boundry.modelStrategy, config=ecofigConfig.ecofigModelSetup.boundry.config)
    {
        return strategy.create(this.ecofig, config.config);
    }

    coalesce(strategy=ecofigConfig.ecofigModelSetup.ecofigCoalesceStrategy) {
        return strategy.coalesce(this.ecofigs);
    }

    layout(strategy=ecofigConfig.ecofigModelSetup.ecofigLayoutStrategy) {
        // FIXME: Should be bound to models as well
        return strategy.layout(this.ecofig);
    }

    scaleValue(ecofigValue, globalScale=this.scale) {
        let config = ecoCodeConfig.get(ecofigValue.ecoCode.id);
        // if (!this.models.has(id))
        //     return null;
        //let ecofigValue = this.ecofig.getVale(id);
        return (config.scale ? ecofigValue.scale : 1.0) * (parseFloat(config.factor) || 1.0) * globalScale;
    }

    rescale(id, scale) {
        .forEach(m => { m.models.get(id).forEach(e => { e.show = value; }); });
    }
}

export { EcofigEffigy };
