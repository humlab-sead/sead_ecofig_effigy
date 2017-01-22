'use strict';

import "../css/main.css";
import "../css/map.css";
import "../css/timeline.css";

// Alt#1: var BuildModuleUrl = require('cesium/Source/Core/buildModuleUrl');
// Alt#1: BuildModuleUrl.setBaseUrl('./Cesium/');
window.CESIUM_BASE_URL = "/cesium/";

import { default as CesiumView } from './CesiumView.js';
import { default as EcofigStore } from './EcofigStore.js';
import { EcofigEffigyController } from './EcofigEffigyController.js';
import { default as wireup } from './wireup.js';
import { default as setupObservers } from './observe.js';
import { default as utility } from './utility.js';

utility.onReadyDocument().then(() => {

    wireup();
    
    let store = new EcofigStore();
    let view = new CesiumView('cesiumContainer');
    let controller = new EcofigEffigyController(view, store);

    store.load().then(() => {
        setupObservers(controller);
        controller.flyHome();
        controller.display({ ageEarliest: -2000, ageLatest: 0 });
    });

});
