'use strict';

import "../css/main.css";
import "../css/map.css";

var BuildModuleUrl = require('cesium/Source/Core/buildModuleUrl');
BuildModuleUrl.setBaseUrl('./Cesium/');

import { default as CesiumView } from './CesiumView.js';
import { default as EcofigStore } from './EcofigStore.js';
import { EcofigEffigyController } from './EcofigEffigyController.js';
import { default as wireup } from './wireup.js';
import { default as utility } from './utility.js';
//import { default as TimelineSlider } from './TimelineSlider';

utility.onReadyDocument().then(() => {

    wireup();
    
    let store = new EcofigStore();
    let view = new CesiumView('cesiumContainer');
    let controller = new EcofigEffigyController(view, store);

    store.load().then(() => {
        controller.display();
        controller.flyHome();
    });

});
