'use strict';
import promise from 'es6-promise';
import 'isomorphic-fetch';

promise.polyfill();

import { Json2Ecofig } from './Ecofig.js';
import { default as ecofigConfig } from './config.js';

// const ES7EcofigLoader = {
//     load: async function() {
//         await fetch(ecofigConfig.restUrl, {
//             method: 'get',
//             mode: 'no-cors', // cors???
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         }).then(jsonData => {
//             return jsonData;
//         })
//     }
// }

const EcofigLoader = {
    cache: { },
    load: function(url) {
        EcofigLoader.cache[url] = EcofigLoader.cache.hasOwnProperty(url) ? EcofigLoader.cache[url] : fetch(ecofigConfig.restUrl, {
            method: 'get',
            mode: 'no-cors', // cors???
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }
}

class EcofigStore {
    
    constructor(loader=EcofigLoader) {
        this.loader = loader;
        this.values = null;
    }

    getValuePromise() {
        return new Promise(resolve => resolve(this.values));
    }

    findAll() {
        if (this.values != null) {
            return this.getValuePromise();
        }
        return this.loader.load()
            .then(data => {
                this.values = Json2Ecofig.createMany(data.features);
                return this.values;
            });
    }

    find(filter = {}) {
        return this.values;
    }

}

//const __EcofigStore = new EcofigStore();

export default EcofigStore;
