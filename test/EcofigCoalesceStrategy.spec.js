'use strict';
/* eslint-env mocha */
import geoData  from './fixtures/geo2.json';
import { SimpleEcofigCoalesceStrategy } from '../src/EcofigCoalesceStrategy.js';
import { Json2Ecofig } from '../src/Ecofig.js';
import { GeoMidPointCalculator } from '../src/MidPointCalculator.js';

var assert = require('chai').assert;

describe('EcofigCoalesceStrategy', function() {

    describe('SimpleEcofigCoalesceStrategy', function() {

        let createEcofig = (i) => Json2Ecofig.create(geoData.features[i]);
        var strategy = null;
        let calculator = null;

        beforeEach(function() {
            calculator = new GeoMidPointCalculator();
            strategy = new SimpleEcofigCoalesceStrategy(calculator);
            assert.isNotNull(strategy, 'strategy is null');
        });

        let assertEqualByProperty = (ecofig1, ecofig2) => {
            //assert.equal(ecofig1.id, ecofig2.id, "id");
            assert.equal(ecofig1.site, ecofig2.site, "site");
            assert.equal(ecofig1.epoch, ecofig2.epoch, "epoch");
            assert.deepEqual(ecofig1.position, ecofig2.position, 'ecofig position');
            assert.equal(ecofig1.values.length, ecofig2.values.length, 'value count');
            for (let i = 0; i < ecofig1.values.length; i++) {
                assert.deepEqual(ecofig1.values[i].position, ecofig2.values[i].position, 'value position');
                assert.approximately(ecofig1.values[i].scale, ecofig2.values[i].scale, 0.01, 'scale');
                assert.equal(ecofig1.values[i].id, ecofig2.values[i].id, 'ecocode');
            }
        }

        it('should merge two clones to a new clone', function() {
            console.log(geoData.features[0]);
            assert.isNotNull(strategy, 'strategy is null');
            let ecofig1 = Json2Ecofig.create(geoData.features[0]);
            console.log(ecofig1);
            let ecofig2 = ecofig1.clone();
            assertEqualByProperty(ecofig1, ecofig2);
            let ecofig3 = strategy.merge(ecofig1, ecofig2);
            assertEqualByProperty(ecofig2, ecofig3);
        });

        it('should coalesce three clones to a copy', function() {
            assert.isNotNull(strategy, 'strategy is null');
            let ecofig1 = createEcofig(0);
            let ecofig2 = ecofig1.clone();
            let ecofig3 = ecofig1.clone();
            assertEqualByProperty(ecofig1, ecofig2);
            assertEqualByProperty(ecofig2, ecofig3);
            let ecofig4 = strategy.coalesce([ecofig1, ecofig2, ecofig3]);
            assertEqualByProperty(ecofig1, ecofig4);
        });

        it('should coalesce three clones to a copy', function() {
            assert.isNotNull(strategy, 'strategy is null');
            let ecofig1 = createEcofig(0);
            let ecofig2 = ecofig1.clone();
            assertEqualByProperty(ecofig1, ecofig2);

            
        });

    });

});

