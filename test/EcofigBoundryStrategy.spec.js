'use strict';
/* eslint-env mocha */
import geoData  from './fixtures/geo2.json';
import { SimpleCircleEcofigBoundryStrategy } from '../src/EcofigBoundryStrategy.js';
import { Json2Ecofig } from '../src/Ecofig.js';

var chai = require('chai');
var assert = chai.assert;

describe('EcofigBoundryStrategy', function() {

    let createEcofig = () => Json2Ecofig.create(geoData.features[0]);
    var ecofig = null;
    var strategy = null;

    beforeEach(function() {
        ecofig = createEcofig();
        strategy = new SimpleCircleEcofigBoundryStrategy();
        assert.isNotNull(strategy, 'strategy is null');
    });

    describe('SimpleCircleEcofigBoundryStrategy', function() {
        
        it('coordinates can be created', function() {
            let coordinates = strategy.create(ecofig);
            assert.isTrue(Array.isArray(coordinates));
            assert.isAbove(coordinates.length, 4);
        });

        it('returns an array with of coordinates on circomface', function() {
            let coordinates = strategy.create(ecofig, [1, 1]);
            assert.isTrue(Array.isArray(coordinates));
            assert.isAbove(coordinates.length, 4);
            let [center_x, center_y] = ecofig.position;
            for (let [x, y] of coordinates) {
                let distanceFromOrigo = Math.sqrt(Math.pow(x - center_x, 2) + Math.pow(y - center_y, 2));
                assert.approximately(distanceFromOrigo, 1.0, 0.01);
            }
        });

    });

});

