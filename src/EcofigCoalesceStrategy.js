"use strict";

import { default as ecofigConfig } from './config.js'; 
import { Ecofig, EcofigFactory } from './Ecofig.js';

var __coalesceCounter = 0;

class SimpleEcofigCoalesceStrategy { // alt-names: SiteCoalesceStrategy

    coalesce(ecofigs) {
        return ecofigs.reduce((x,y) => this.merge(x,y), null);
    }

    merge(p, q) {

        if (!p || !q) {
            if (!p && !q) {
                throw "SimpleEcofigCoalesceStrategy.merge: null args";
            }
            return EcofigFactory.clone(p || q);
        }

        if (p.site !== q.site) {
            throw "SimpleEcofigCoalesceStrategy.merge: site mismatch";
        }

        // Skip cloning of already cloned ecofigs
        let ecofig = p.id > 0 ? EcofigFactory.clone(p) : p;

        ecofig.id = --__coalesceCounter;
        ecofig.site = p.site === q.site ? p.site : (p.site + '*');
        ecofig.position = ecofigConfig.ecofigModelSetup.midPointCalculator.midpoint(p.position, q.position);
        ecofig.epoch = p.epoch || q.epoch;

        q.values.forEach(
            z => {
                let value = ecofig.getValue(z.id);
                if (value) {
                    value.scale += z.value;
                } else {
                    ecofig.addValue(EcofigFactory.cloneValue(z));
                }
            }
        );

        ecofig.normalize();
        return ecofig;
    }

}

export { SimpleEcofigCoalesceStrategy };