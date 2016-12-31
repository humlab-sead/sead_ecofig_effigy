'use strict';
/* eslint-env mocha */
import geoData  from './fixtures/geo2.json';
const EcofigStore = require('../src/EcofigStore.js');

var assert = require('chai').assert;
// var Cesium = require('cesium/Source/Cesium');

// chai-promises
// https://www.sitepoint.com/promises-in-javascript-unit-tests-the-definitive-guide/

// Simple test loader. Ought to be replaced by a mocker (e.g. fetch-mock)
const EcofigTestLoader = {
    load: () => geoData
}

describe('EcofigStore', function() {

    describe('Test setup', function() {
        it('should be alive', function() {
            assert.isTrue(true);
        });
        it('fixture data is loaded', function() {
            assert.isTrue(geoData.features.length > 0);
        });
        it('fixture data EcofigTestLoader is working', function() {
            assert.isNotNull(EcofigTestLoader);
            assert.isTrue(EcofigTestLoader.load() === geoData);
        });
    });

    describe('EcofigStore', function() {
        it('fixture data is loaded', function() {
            assert.isTrue(true);
            assert.isNotNull(EcofigStore);
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

