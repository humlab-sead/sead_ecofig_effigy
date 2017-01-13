"use strict";

import { EcofigCloneService } from './Ecofig.js';

class SimpleEcofigCoalesceStrategy {

    constructor(midPointCalculator) {
        this.midPointCalculator = midPointCalculator;
    }

    coalesce(ecofigs) {
        return ecofigs.reduce((x,y) => this.merge(x,y), null);
    }

    merge(p, q) {

        if (!p || !q) {
            if (!p && !q) {
                throw "SimpleEcofigCoalesceStrategy.merge: null args";
            }
            return (p || q).clone();
        }

        if (p.siteName !== q.siteName) {
            throw "SimpleEcofigCoalesceStrategy.merge: siteName mismatch";
        }

        // Skip cloning of already cloned ecofigs
        let ecofig = p.id > 0 ? p.clone() : p;

        q.values.forEach(
            z => {
                let value = ecofig.getValue(z.id);
                if (value) {
                    value.scale += z.scale;
                    // FIXME: Use when weighing ecofigValues??
                    //value.scale = p.totalOfAbundance * value.scale + q.totalOfAbundance * p.scale / (p.totalOfAbundance)
                } else {
                    ecofig.addValue(EcofigCloneService.cloneValue(z));
                }
            }
        );

        ecofig.position = this.midPointCalculator.midpoint(p.position, q.position);
        ecofig.ageEarliest = Math.max(p.ageEarliest, q.ageEarliest);
        ecofig.ageLatest = Math.max(p.ageLatest, q.ageLatest);
        ecofig.totalOfAbundance = p.totalOfAbundance + q.totalOfAbundance;
        ecofig.normalize();
        return ecofig;
    }
}

export { SimpleEcofigCoalesceStrategy };