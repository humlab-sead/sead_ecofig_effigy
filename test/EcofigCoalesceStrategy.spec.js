'use strict';
/* eslint-env mocha */
import geoData  from './fixtures/geo2.json';
import SimpleEcofigCoalesceStrategy from '../src/EcofigCoalesceStrategy.js';
import { Json2Ecofig } from '../src/Ecofig.js';

var assert = require('chai').assert;

describe('EcofigCoalesceStrategy', function() {

    describe('SimpleEcofigCoalesceStrategy', function() {
        
        it('should merge two clones to a copy', function() {
            let strategy = new SimpleEcofigCoalesceStrategy();
            assert.isNotNull(strategy, 'strategy is null');
            let ecofig1 = Json2Ecofig.create(geoData.features[0]);
            let ecofig2 = ecofig1.clone();
            assert.isDeepEqual(ecofig1, ecofig2);
            let ecofig3 = strategy.merge(ecofig1, ecofig2);
            assert.isDeepEqual(ecofig1, ecofig2);
            assert.isDeepEqual(ecofig2, ecofig3);
        });

        it('should coalesce three clones to a copy', function() {
            let strategy = new SimpleEcofigCoalesceStrategy();
            assert.isNotNull(strategy, 'strategy is null');
            let ecofig1 = Json2Ecofig.create(geoData.features[0]);
            let ecofig2 = ecofig1.clone();
            let ecofig3 = ecofig2.clone();
            assert.isDeepEqual(ecofig1, ecofig2);
            assert.isDeepEqual(ecofig2, ecofig3);
            let ecofig4 = strategy.coalesce([ecofig1, ecofig2, ecofig3]);
            assert.isDeepEqual(ecofig1, ecofig4);
        });
        it('should have more tests', function() {
            assert.fail();
        });
    });

});

