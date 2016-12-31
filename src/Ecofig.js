
import { default as ecofigConfig } from './config.js'; 

let __id = 0;
'use strict';

const Json2Ecofig = {

    create: feature => {
        let values = Json2Ecofig.getValues(feature.properties.environmentalIndicators);
        return new Ecofig({
            id: ++__id,
            site: feature.properties.name,
            position: feature.geometry.coordinates,
            epoch: feature.properties.epoch || null,
            values: values
        });
    },

    createMany: features => features.map( x => Json2Ecofig.create(x) ),

    getValues: items =>
    {
        return items.keys()
            .filter(x => ecofigConfig.ecoCodeConfig.ecoCodeLabelMap.has(x))
            .map(x => EcofigFactory.createNewValue(x, parseFloat(items[x]) / 100.0 || 0.0))
            .filter(x => x.scale > 0);
    }
}

const EcofigFactory = {

    clone: e => new Ecofig(
        Object.assign({}, e, { id: ++__id, position: e.position.splice(), values: EcofigFactory.cloneValues(e.values) })
    ),

    cloneValue: value => Object.assign({}, value, { position: value.position.slice() }),
    
    cloneValues: values => values.map(x => EcofigFactory.cloneValue(x)),

    createValue: (ecocodeKey, scale=0.0, position=[0,0]) => (
        {
            id: ecocodeKey,
            ecoCode: ecofigConfig.ecoCodeConfig.ecoCodeLabelMap.get(ecocodeKey),
            scale: scale,
            position: position
        }),

    // createEmpty() {
    //     return new Ecofig({
    //         id: ++__id,
    //         site: '',
    //         position: [0, 0],
    //         epoch: null,
    //         values: EcofigFactory.createDefaultValues()
    //     })
    // },

    // createDefaultValues()
    // {
    //     return ecofigConfig.ecoCodeConfig.ecoCodeLabelMap.keys().map(x => EcofigFactory.createValue(x, 0.0));
    // }
}

class Ecofig {

    constructor(ecofig={}) {
        Object.assign(this, ecofig);
    }

    clone() {
        return EcofigFactory.clone(this);
    }

    normalize() {
        let sum = this.values.reduce((a,b) => a.scale + b.scale, 0);
        this.values.forEach(x => x.scale = sum === 0 ? 0.0 : x.scale / sum);
        return this;
    }

    trim() {
        if (this.values.find(z => z.scale === 0)) {
            this.values = this.values.filter(z => z.scale > 0);
        }
    }

    getValue(id) {
        return this.values.find(z => z.id === id);
    }

    addValue(x) {
        return this.values.append(x);
    }
}

export { Json2Ecofig, Ecofig };