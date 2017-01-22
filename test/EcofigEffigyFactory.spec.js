'use strict';
/* eslint-env mocha */
import geoData  from './fixtures/geo2.json';
import { Json2Ecofig } from '../src/Ecofig.js';
import { ecofigEffigyFactory } from '../src/EcofigEffigyFactory.js';

// var assert = require('chai').assert;

describe('EcofigEffigyFactory', function() {

    describe('DefaultecofigEffigyFactory', function() {

        let ecofigs = null;

        beforeEach(function() {
            ecofigs = Json2Ecofig.createMany(geoData.features)
        });

        it('should call view functions', function() {

            let ecofigEffigies = ecofigEffigyFactory.create(ecofigs);

            console.log(ecofigEffigies);

        });

    });

});

