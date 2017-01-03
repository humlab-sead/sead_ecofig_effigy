'use strict';
/* eslint-env mocha */
import geoData  from './fixtures/geo2.json';
import { Json2Ecofig } from '../src/Ecofig.js';
import { CircularEcofigLayoutStrategy } from '../src/EcofigLayoutStrategy.js';

var assert = require('chai').assert;

describe('EcofigLayoutStrategy', function() {

    describe('CircularEcofigLayoutStrategy', function() {

        let createEcofig = (i) => Json2Ecofig.create(geoData.features[i]);
        let distance = (p1, p2) => Math.sqrt(Math.pow(p1[0]-p2[0],2)+Math.pow(p1[1]-p2[1],2))
        var strategy = null;

        beforeEach(function() {
            strategy = new CircularEcofigLayoutStrategy();
            assert.isNotNull(strategy, 'strategy is null');
        });

        it('should layout values at a predicted distance', function() {
            let ecofig = createEcofig(0);
            let clone = ecofig.clone();
            assert.deepEqual(ecofig, clone);
            strategy.layout(clone, [2.0, 2.0]);
            assert.deepEqual(ecofig.position, clone.position, "center diff unexpected");
            console.log(clone);
            for (let v of clone.values) {
                assert.approximately(distance(clone.position, v.position), 2, 0.1);
            }
        });

    });

});

