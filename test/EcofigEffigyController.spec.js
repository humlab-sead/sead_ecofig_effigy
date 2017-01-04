'use strict';
/* eslint-env mocha */
import geoData  from './fixtures/geo2.json';
import { Json2Ecofig } from '../src/Ecofig.js';
import { EcofigStore } from '../src/EcofigStore.js';
import { EcofigEffigyController } from '../src/EcofigEffigyController.js';

var assert = require('chai').assert;

describe('EcofigEffigyController', function() {

    describe('DefaultEcofigEffigyController', function() {

        let storeMock = null;
        let controller = null;
        let viewMock = null;

        beforeEach(function() {

            // store = new EcofigStore();
            // store.store(geoData.features);

            storeMock = {
                getValuePromiseCount: 0,
                loadCount: 0,
                findCount: 0,                
                values: Json2Ecofig.createMany(geoData.features),
                getValuePromise: function() {
                    this.getValuePromiseCount++;
                    return new Promise(resolve => resolve(this.values))
                },
                load: function() {
                    this.loadCount++;
                    return this.getValuePromise();
                },
                find: function() {
                    this.findCount++;
                    return this.values;
                },
            }

            viewMock = {
                displayCalled: false,
                flyToCalled: false,
                resetCalled: false,
                flyTo: function() {
                    this.flyToCalled = true;
                },
                display: function() {
                    this.displayCalled = true;
                },
                reset: function() {
                    this.resetCalled = true;
                },
            }

            controller = new EcofigEffigyController(viewMock, storeMock);
        });

        it('should call view functions', function() {
            controller.reset();
            controller.display();
            controller.flyHome();
            assert.isTrue(viewMock.displayCalled);
            assert.isTrue(viewMock.flyToCalled);
            assert.isTrue(viewMock.resetCalled);
            assert.isAbove(storeMock.getValuePromiseCount, 0);
            assert.equal(storeMock.loadCount, 0);
            assert.isAbove(storeMock.find, 1);
        });

    });

});

