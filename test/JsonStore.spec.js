'use strict';
/* eslint-env mocha */
import geoData  from './fixtures/geo2.json';
import EcofigStore from '../src/EcofigStore.js';

var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised')
// chai.use(chaiAsPromised);
var assert = chai.assert;

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
    cache: null,
    load: function() {
        return new Promise((resolve/*, reject*/) => window.setTimeout(() => resolve(geoData), Math.random() * 250 + 250)
        )
    }
}
// nock('http://example.com/').get('/todos').reply(200, { todos: ['do something'] })

describe('EcofigStore', function() {

    describe('Test setup', function() {
        it('should be alive', function() {
            assert.isTrue(true);
        });
        it('fixture data is loaded', function() {
            assert.isTrue(geoData.features.length > 0, 'length mismatch');
        });
        it('is an array of data with at least one element', function() {
            return EcofigTestLoader.load().then(
                geoJson => {
                    assert.isNotNull(geoJson, 'features is null');
                    assert.isNotNull(geoJson.features, 'features is null');
                    assert.isTrue(Array.isArray(geoJson.features), 'array expected');
                    assert.isAbove(geoJson.features.length, 0, 'length 0 unexpected');
                });
        });
    });

    describe('EcofigStore', function() {
        it('has a recognizable class', function() {
            assert.isNotNull(EcofigStore, 'class is not defined');
        });
        it('can be created', function() {
            assert.isNotNull(new EcofigStore(), 'create failed');
        });
        // it('can be loaded', function() {
        //     let store = new EcofigStore(EcofigTestLoader);
        //     return assert.eventually.ok(store.findAll());
        // });
        it('can be loaded', function() {
            let store = new EcofigStore(EcofigTestLoader);
            return store.load().then(
                function (ecofigs) {
                    assert.isNotNull(ecofigs);
                    assert.isTrue(Array.isArray(ecofigs));
                    assert.equal(ecofigs.length, 7);
                    assert.equal(ecofigs[0].site, geoData.features[0].properties.name);
                    assert.deepEqual(ecofigs[0].position, geoData.features[0].geometry.coordinates);
                    //done();
                },
                function (err) {
                    //done(err);
                });
        });
    });

});

