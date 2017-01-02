'use strict';
/* eslint-env mocha */
import geoData  from './fixtures/geo2.json';
import SimpleCircleEcofigBoundryStrategy from '../src/EcofigBoundryStrategy.js';
import { Json2Ecofig } from '../src/Ecofig.js';

var chai = require('chai');
var assert = chai.assert;

describe('EcofigBoundryStrategy', function() {

    describe('SimpleCircleEcofigBoundryStrategy', function() {
        
        it('can create a boundry', function() {
            let strategy = new SimpleCircleEcofigBoundryStrategy();
            assert.isNotNull(strategy, 'strategy is null');
            let ecofig = Json2Ecofig.create(geoData.features[0]);
            let coordinates = strategy.create(ecofig);
            assert.isTrue(Array.isArray(coordinates));
            assert.isAbove(coordinates.length, 4);
            assert.fail('FIXME: add test ov returned values');
        });

    });

});

