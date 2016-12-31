'use strict';
import promise from 'es6-promise';
import 'isomorphic-fetch';

promise.polyfill();

import { Json2Ecofig } from './Ecofig.js';
import { default as ecofigConfig } from './config.js';


const EcofigLoader = {
    load: () => 
        fetch(ecofigConfig.restUrl, {
            method: 'get',
            mode: 'no-cors', // cors???
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
}

class EcofigStore {
    
    constructor(loader=EcofigLoader) {
        this.loader = loader;
        this.values = null;
    }

    findAll() {
        this.values = this.values || this.loader.load().then(jsonData => Json2Ecofig.createMany(jsonData.features));
        return this.values;
    }

    // find(filter = {}) {
    //     return this.findAll();
    // }

}

//const __EcofigStore = new EcofigStore();

export default EcofigStore;
