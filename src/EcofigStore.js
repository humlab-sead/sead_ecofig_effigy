'use strict';
import promise from 'es6-promise';
import 'isomorphic-fetch';

promise.polyfill();

import { Json2Ecofig } from './Ecofig.js';
import { default as ecofigConfig } from './config.js';


const EcofigLoader = {
    cache: null,
    load: function() {
        if (this.cache !== null) {
            return this.cache;
        } else {
            fetch(ecofigConfig.restUrl, {
                method: 'get',
                mode: 'no-cors', // cors???
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(jsonData => {
                this.cache = jsonData;
                // FIXME: This is no return from outer function!
                return jsonData;
            })
        }
    }
}

class EcofigStore {
    
    constructor(loader=EcofigLoader) {
        this.loader = loader;
        this.values = null;
    }

    findAll() {
        return new Promise(
            (resolve/*, reject*/) => {
                if (this.values != null) {
                    resolve(this.values);
                } else {
                    return this.loader.load()
                        .then(data => {
                            this.values = Json2Ecofig.createMany(data.features);
                            return this.values;
                        });
                }
            })
    }

    // find(filter = {}) {
    //     return this.findAll();
    // }

}

//const __EcofigStore = new EcofigStore();

export default EcofigStore;
