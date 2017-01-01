'use strict';
/* eslint-env mocha */
import geoData  from './fixtures/geo2.json';
import EcofigStore from '../src/EcofigStore.js';

var assert = require('chai').assert;
// var Cesium = require('cesium/Source/Cesium');

// chai-promises
// https://www.sitepoint.com/promises-in-javascript-unit-tests-the-definitive-guide/

// function fetchWrapper(url) {
//     var headers = new Headers();
//     headers.append('Accept', 'application/vnd.github.v3+json');
//     var request = new Request(url, { headers: headers });
//     return fetch(request).then(x => { return x.json(); });
// }

// Simple test loader. Ought to be replaced by a mocker (e.g. fetch-mock)
const EcofigTestLoader = {
    load: function() {
        return new Promise(
            (resolve/*, reject*/) => window.setTimeout(() => resolve(geoData), Math.random() * 1000 + 1000)
        ).then(jsonData => {
            return jsonData.features;
        })
    }
}
// nock('http://example.com/').get('/todos').reply(200, { todos: ['do something'] })

describe('EcofigStore', function() {

    describe('Test setup', function() {
        it('should be alive', function() {
            assert.isTrue(true);
        });
        it('fixture data is loaded', function() {
            assert.isTrue(geoData.features.length > 0);
        });
        it('is an array of data with at least one element', function() {
            EcofigTestLoader.load().then(
                features => {
                    assert.isNotNull(features);
                    assert.isTrue(features.length >= 0);
                });
        });
    });

    describe('EcofigStore', function() {
        it('has a recognizable class', function() {
            assert.isNotNull(EcofigStore);
        });
        it('can be created', function() {
            assert.isNotNull(new EcofigStore());
        });
        it('can be loaded', function() {
            let store = new EcofigStore(EcofigTestLoader);
            store.findAll().then(
                (ecofigs) => {
                    assert.isNotNull(ecofigs);
                    assert.isTrue(ecofigs.length > 0);
                }
            )
        });
    });

    // describe('findAll()', function() {

    //     it('should return a list of Ecofigs', function() {
    //         let ecofigStore = new EcofigStore(EcofigTestLoader);
    //         assert.isTrue(ecofigStore);
    //         // var data = ecofigStore.findAll();
    //         // assert.isTrue(data.length > 0);
    //         // console.log("Hello, world!");
    //     });        
    // });
});

