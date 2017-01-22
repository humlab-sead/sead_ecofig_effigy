'use strict';
/* eslint-env mocha */
// import geoData  from './fixtures/geo2.json';
// import { Json2Ecofig } from '../src/Ecofig.js';
import { GeoMidPointCalculator, SimpleMidPointCalculator } from '../src/MidPointCalculator.js';

var assert = require('chai').assert;

describe('MidPointCalculator', function() {

    let assertCompute = function (calculator, p1, p2, expected, tolerance) {
        let center = calculator.midpoint(p1, p2);
        assert.approximately(center[0], expected[0], tolerance);
        assert.approximately(center[1], expected[1], tolerance);
    }

    describe('GeoMidPointCalculator', function() {

        let calculator = null;

        beforeEach(function() {
            calculator = new GeoMidPointCalculator();
        });

        it('should have [+/-0.5,+/-0.5] as midpoint for unity vector [+/-1,+/-1]', function() {
            assertCompute(calculator, [0, 0], [1, 1], [0.5, 0.5], 0.1);
            assertCompute(calculator, [0, 0], [-1, 1], [-0.5, 0.5], 0.1);
            assertCompute(calculator, [0, 0], [-1, -1], [-0.5, -0.5], 0.1);
            assertCompute(calculator, [0, 0], [1, -1], [0.5, -0.5], 0.1);
        });

        it('should have [+/-1.0,+/-1.0] as midpoint for unity vector [+/-1.5,+/-1.5]', function() {
            assertCompute(calculator, [1, 1], [2, 2], [1.5, 1.5], 0.1);
            assertCompute(calculator, [-1, 1], [-2, 2], [-1.5, 1.5], 0.1);
            assertCompute(calculator, [-1, -1], [-2, -2], [-1.5, -1.5], 0.1);
            assertCompute(calculator, [1, -1], [2, -2], [1.5, -1.5], 0.1);
        });
    });

    describe('SimpleMidPointCalculator', function() {

        let calculator = null;

        beforeEach(function() {
            calculator = new SimpleMidPointCalculator();
        });

        it('should have [+/-0.5,+/-0.5] as midpoint for unity vector [+/-1,+/-1]', function() {
            assertCompute(calculator, [0, 0], [1, 1], [0.5, 0.5], 0.1);
            assertCompute(calculator, [0, 0], [-1, 1], [-0.5, 0.5], 0.1);
            assertCompute(calculator, [0, 0], [-1, -1], [-0.5, -0.5], 0.1);
            assertCompute(calculator, [0, 0], [1, -1], [0.5, -0.5], 0.1);
        });
        
        it('should have [+/-1.0,+/-1.0] as midpoint for unity vector [+/-1.5,+/-1.5]', function() {
            assertCompute(calculator, [1, 1], [2, 2], [1.5, 1.5], 0.1);
            assertCompute(calculator, [-1, 1], [-2, 2], [-1.5, 1.5], 0.1);
            assertCompute(calculator, [-1, -1], [-2, -2], [-1.5, -1.5], 0.1);
            assertCompute(calculator, [1, -1], [2, -2], [1.5, -1.5], 0.1);
        });
    });

});

