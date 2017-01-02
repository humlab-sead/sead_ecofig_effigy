'use strict';
/* eslint-env mocha */
import geoData  from './fixtures/geo2.json';
import { Json2Ecofig, Ecofig } from '../src/Ecofig.js';
import { default as ecofigConfig } from '../src/config.js'; 

var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised')
// chai.use(chaiAsPromised);
var assert = chai.assert;

describe('Ecofig', function() {

    describe('create new instance', function() {

        it('should have correctly initialized members', function() {
            let template = { id: 1, site: 'Sundmo', position: [123, 456], epoch:'PG', values: [] };
            let ecofig = new Ecofig(template);
            assert.equal(ecofig.id, template.id);
            assert.equal(ecofig.site, template.site);
            assert.equal(ecofig.epoch, template.epoch);
            assert.deepEqual(ecofig.position, template.position);
            assert.equal(ecofig.values, template.values);
        });

        it('can create from feature', function() {
            let feature = geoData.features[0];
            let ecofig = Json2Ecofig.create(feature);
            assert.isNotNull(ecofig, 'ecofig is null');
            assert.isTrue(Array.isArray(ecofig.values), 'values is not an array');

            assert.isAbove(ecofig.values.length, 0, 'values array length is 0');
            assert.equal(ecofig.site, feature.properties.name, 'site name mismatch');
            assert.deepEqual(ecofig.position, feature.geometry.coordinates, 'position mismatch');
            let emap = ecofigConfig.ecoCodeConfig.ecoCodeMap;
            let lmap = ecofigConfig.ecoCodeConfig.ecoCodeLabelMap;
            for (let key in ecofig.values) {
                let value = ecofig.values[key];
                assert.isTrue(emap.has(value.id), 'ecoCode not found: [' + value.id + ']');
                assert.deepEqual(value.ecoCode, emap.get(value.id));
                assert.isTrue(lmap.has(value.ecoCode.label), 'ecoCode Label not found: [' + value.ecoCode.label + ']');
                assert.equal(value.scale, parseFloat(feature.properties.environmentalIndicators[value.ecoCode.label]) / 100.0);
            }

            for (let key in feature.properties.environmentalIndicators) {
                assert.isTrue(lmap.has(key));
                let ecoCode = lmap.get(key);
                //console.log(ecoCode);
                let value = parseFloat(feature.properties.environmentalIndicators[key]) / 100.0;
                //console.log(`Label ${key}, id=${ecoCode.id} value=${value} `);
                if (value === 0.0) {
                    assert.isUndefined(ecofig.getValue(ecoCode.id));
                } else {
                    assert.isDefined(ecofig.getValue(ecoCode.id));
                }
            }
            
        });

        it('has sum close to 1', function() {
            let ecofigs = Json2Ecofig.createMany(geoData.features);
            assert.equal(ecofigs.length, geoData.features.length)
            ecofigs.forEach(function(ecofig) {
                assert.approximately(ecofig.sum(), 1.0, 0.2, 'Value out of bound');
                //assert.equal(ecofig.normalize().sum(), 1.0);
                //ecofig.trim();
            }, this);
        });

        it('can be normalized to very close to 1', function() {
            let ecofigs = Json2Ecofig.createMany(geoData.features);
            ecofigs.forEach(function(ecofig) {
                assert.approximately(ecofig.normalize().sum(), 1.0, 0.01);
            }, this);
        });

        it('can be trimmed', function() {
            let ecofig = Json2Ecofig.create(geoData.features[0]);
            assert.equal(ecofig.values.length, geoData.features.length);
            ecofig.addValue( {id: 'dummy', ecoCode: 'dummy', scale: 0.0, position: [0, 0] });

        });

    });

})
