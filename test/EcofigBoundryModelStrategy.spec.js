'use strict';
/* eslint-env mocha */
import geoData  from './fixtures/geo2.json';
import SimpleCircleEcofigBoundryStrategy from '../src/EcofigBoundryStrategy.js';
import CircleEcofigBoundryModelStrategy from '../src/EcofigBoundryModelStrategy.js';
import { Json2Ecofig } from '../src/Ecofig.js';
import { default as utility } from '../src/CesiumUtility.js';

var assert = require('chai').assert;

describe('CircleEcofigBoundryModelStrategy', function() {

    describe('CircleEcofigBoundryModelStrategy', function() {
        
        it('can create a boundry model', function() {
            let config = {
                size: 15000.0,
                bgColor: { rgb: '#FFA500', a: 0.25 }
            }
            let ecofig = Json2Ecofig.create(geoData.features[0]);
            let boundryStrategy = new SimpleCircleEcofigBoundryStrategy();
            let coordinates = boundryStrategy.create(ecofig);
            assert.isTrue(Array.isArray(coordinates));
            assert.isAbove(coordinates.length, 4);
            let modelStrategy = new CircleEcofigBoundryModelStrategy(boundryStrategy, config);
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
                    material : utility.fromCssColorString(this.config.bgColor.rgb, this.config.bgColor.a)
                }
            }
            assert.deepEqual(model, template);
            assert.fail('FIXME: add test ov returned values');
        });

    });

});

