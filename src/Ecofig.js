
import { default as ecofigConfig } from './config.js'; 

'use strict';

let __id = 0;

const Json2Ecofig = {

    create: json => {
        let values = Json2Ecofig.createValues(json.ecofig);
        return new Ecofig({
            id: ++__id,
            country: json.site['Country'],
            siteName: json.site['SiteName'],
            siteCode: json.site['SiteCODE'],
            position: [ json.site['LongDD'], json.site['LatDD'] ],
            sampleCode: json.sample['SampleCODE'],
            ageEarliest: json.sample['CalAgeEarliest'],
            ageLatest: json.sample['CalAgeLatest'],
            totalOfAbundance: json.sample["Total Of Abundance"],
            values: []
        }).addValues(values);
    },

    createMany: features => features.map( x => Json2Ecofig.create(x) ),

    createValues: items =>
    {
        let map = ecofigConfig.ecoCodeConfig.ecoCodeLabelMap;
        return Object.keys(items).filter(x => map.has(x))
            .map(x => {
                let scale = parseFloat(items[x]) / 100.0 || 0.0;
                let ecoCode = map.get(x).id;
                return new EcofigValue(null, ecoCode, scale);
            })
            .filter(x => x.scale > 0);
    }
}

const EcofigCloneService = {
    clone: e => {
        return new Ecofig({
            id: -e.id,
            country: e.country,
            siteName: e.siteName,
            siteCode: e.siteCode,
            position: e.position.slice(),
            ageEarliest: e.ageEarliest,
            ageLatest: e.ageLatest,
            totalOfAbundance: e.totalOfAbundance,
            values: []
        }).addValues(EcofigCloneService.cloneValues(e.values));
    },
    cloneValue: value => new EcofigValue(value.ecofig, value.id, value.scale, value.position.slice()),
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
        return (options.scale ? this.scale : 1.0) * (parseFloat(options.factor) || 1.0) * ecofigConfig.globalScale;
    }

    getModelCount() {
        return Array.isArray(this.options.multiply) ? Math.ceil(this.scale * this.options.multiply[1]) : 1;
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