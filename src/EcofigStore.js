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
    //cache: { },
    load: function() {
        let url = ecofigConfig.restUrl;
        //EcofigLoader.cache[url] = EcofigLoader.cache.hasOwnProperty(url) ? EcofigLoader.cache[url] : fetch(ecofigConfig.restUrl, {
        return fetch(ecofigConfig.restUrl, {
            method: 'get',
            mode: 'no-cors', // cors???
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(data => Promise.resolve(data.json()));
    }
}

class EcofigStore {
    
    constructor(loader=EcofigLoader, data = null) {
        this.loader = loader;
        this.values = (data && data.features) ? Json2Ecofig.createMany(data.features) : null;
    }

    load() {
        return (this.values != null) ? Promise.resolve(this.values) :
            this.loader
                .load()
                .then(data => this.store(data));
    }

    find(filter = null) {

        if (this.values === null)
            throw new Error("Store not initialized, use load()");

        let ecofigs = this.values;
        // FIXME: Implement more advanced filter capabilities

        if (filter && filter.age) {
            return ecofigs.filter(x => x.ageEarliest >= filter.age && filter.age >= x.ageLatest)
        }

        if (filter && filter.siteNames) {
            return ecofigs.filter(x => filter.sites.includes(x.siteName));
        }     
        return ecofigs;
    }

    store(ecofigJsons) {
        this.values = Json2Ecofig.createMany(ecofigJsons);
        return this.values;
    }

}

//const __EcofigStore = new EcofigStore();

export default EcofigStore;
