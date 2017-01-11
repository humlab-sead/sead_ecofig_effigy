
import { default as ecofigConfig } from './config.js'; 
import { default as utility } from './utility.js';

'use strict';

let __id = 0;

const Json2Ecofig = {

    create: feature => {
        let values = Json2Ecofig.getValues(feature.properties.environmentalIndicators);
        return new Ecofig({
            id: ++__id,
            site: feature.properties.name,
            position: feature.geometry.coordinates,
            epoch: feature.properties.epoch || '',
            values: []
        }).addValues(values);
    },

    createMany: features => features.map( x => Json2Ecofig.create(x) ),

    getValues: items =>
    {
        let map = ecofigConfig.ecoCodeConfig.ecoCodeLabelMap;
        return Object.keys(items)
            .filter(x => map.has(x))
            .map(x => new EcofigValue(null, x, parseFloat(items[x]) / 100.0 || 0.0))
            .filter(x => x.scale > 0);
    }
}

const EcofigCloneService = {
    clone: e => {
        return new Ecofig({
            id: -e.id,
            site: e.site,
            position: e.position.splice(),
            epoch: e.epoch || '',
            values: []
        }).addValues(EcofigCloneService.cloneValues(e.values));
        //let a = new Ecofig(JSON.parse(JSON.stringify(e)))
    },
    cloneValue: value => Object.assign({}, value, { position: value.position.slice() }),
    cloneValues: values => values.map(x => EcofigCloneService.cloneValue(x)),
}

class EcofigValue {

    constructor(ecofig, id, scale=1.0, position=[0,0]) {
        this.ecofig = ecofig;
        this.id = id;
        this.position = position;
        this.scale = scale;
        this.ecoCode = ecofigConfig.getEcoCode(id);
        this.options = ecofigConfig.getEcoCodeSetup(id);
    }

    computeScale(options=this.options) {
        return (options.scale ? this.scale : 1.0) * (parseFloat(options.factor) || 1.0) * this.ecofig.scale;
    }

    getModelCount() {
        return Array.isArray(this.options.multiply) ? Math.ceil(this.scale * this.options.multiply[1]) : 1;
    }

    computeCoordinate(magnitude=0.2)
    {
        if (this.options.spread === "random")
            return utility.randomCirclePoint(this.ecofig.position, magnitude)
        return this.position;
    }
}

// FIXME: Radius should be within boundry (and in Cartesian3 instead of degrees)!

class Ecofig {

    constructor(ecofig={}) {
        Object.assign(this, ecofig);
    }

    clone() {
        return EcofigCloneService.clone(this);
    }

    sum() {
        return this.values.reduce((a,b) => a + b.scale, 0);
    }

    normalize() {
        let sum = this.sum();
        this.values.forEach(x => x.scale = sum === 0 ? 0.0 : x.scale / sum);
        return this;
    }

    trim() {
        if (this.values.find(z => z.scale === 0)) {
            this.values = this.values.filter(z => z.scale > 0);
        }
    }

    getValue(id) {
        return this.values.find(z => z.ecoCode.id === id);
    }

    addValues(values) {
        values.forEach(x => this.addValue(x));
        return this;
    }

    addValue(x) {
        x.ecofig = this;
        this.values.push(x);
    }

    wateryScale() {
        return this.values.reduce( (a, x) => a + (x.ecoCode.water ? x.scale : 0.0), 0 ) 
    }

    unhookValues() {
        this.values.forEach(x => { x.ecofig = null; } )
    }
}

export { Json2Ecofig, Ecofig, EcofigCloneService };