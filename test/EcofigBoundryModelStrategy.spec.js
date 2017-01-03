'use strict';
/* eslint-env mocha */
import geoData  from './fixtures/geo2.json';
import { SimpleCircleEcofigBoundryStrategy } from '../src/EcofigBoundryStrategy.js';
import { CircleEcofigBoundryModelStrategy } from '../src/EcofigBoundryModelStrategy.js';
import { Json2Ecofig } from '../src/Ecofig.js';
import { default as utility } from '../src/CesiumUtility.js';

var assert = require('chai').assert;

describe('EcofigBoundryModelStrategy', function() {

    describe('CircleEcofigBoundryModelStrategy', function() {

        let createEcofig = () => Json2Ecofig.create(geoData.features[0]);
        var ecofig = null;
        var boundryStrategy = null;
        var modelStrategy = null;
        var config = { size: 15000.0, bgColor: { rgb: '#FFA500', a: 0.25 } }
        
        beforeEach(function() {
            ecofig = createEcofig();
            boundryStrategy = new SimpleCircleEcofigBoundryStrategy();
            modelStrategy = new CircleEcofigBoundryModelStrategy(boundryStrategy, config);
        });
    
        it('can create a boundry model', function() {

            let coordinates = boundryStrategy.create(ecofig).reduce((a, b) => a.concat(b), []);
            console.log(coordinates);
            assert.isTrue(Array.isArray(coordinates));
            assert.isAbove(coordinates.length, 4);

            assert.isNotNull(modelStrategy, 'strategy is null');
            let model = modelStrategy.create(ecofig);
            assert.isNotNull(model, 'strategy is null');
            let template = {
                name : "Environment",
                description: modelStrategy.createTooltip(ecofig),
                polygon : {
                    hierarchy : {
                        positions: utility.fromDegreesArray(coordinates),
                    },
                    material : utility.fromCssColorString(config.bgColor.rgb, config.bgColor.a)
                }
            }
            assert.deepEqual(model, template);
        });

    });

});

