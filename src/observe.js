// Alt #1: var Cesium = require('cesium/Source/Cesium');
// Alt #2:
import Cesium from "cesiumDll/Cesium"

import { default as ecofigConfig } from './config.js';

const ko = Cesium.knockout;

var ecoCode = (id, label, visible, scale) => ({
    id: id,
    label: label,
    visible: ko.observable(visible),
    scale: ko.observable(scale)
});

var ecoCodes = ecofigConfig.ecoCodeConfig.values.map(x => ecoCode(x.id, x.label, true, 0.0));

var viewModel = {
    currentCode: ko.observable(ecoCodes[0]),
    ecoCodes: ko.observableArray(ecoCodes),
    scale: ko.observable(ecofigConfig.globalScale),
    ageEarliest: ko.observable(-2000),
    ageLatest: ko.observable(0)
};

var setup = (controller) =>  {

    // Convert the viewModel members into knockout observables.
    //ko.track(viewModel);
    // viewModel.currentCode.subscribe(
    //     function(scale) {
    //         alert('scale: ' + scale);
    //     });

    viewModel.ecoCodes().forEach(x => x.visible.subscribe(
        function(value) {
            controller.setEcoCodeVisibility(viewModel.currentCode().id, value);
        })
    );
    let updateAge = () => {
        let [a, b] = [ parseInt(viewModel.ageEarliest()),  parseInt(viewModel.ageLatest()) ];
        if (a > b) [a, b] = [b, a];
        controller.display({ ageEarliest: a, ageLatest: b });
    };
    viewModel.scale.subscribe( value => controller.setGlobalScale(value) );
    viewModel.ageEarliest.subscribe( updateAge );
    viewModel.ageLatest.subscribe( updateAge );
    ko.applyBindings(viewModel, document.getElementById('toolbar'));
}

export default setup;