var Cesium = require('cesium/Source/Cesium');
import { default as ecofigConfig } from './config.js';

const ko = Cesium.knockout;

var ecoCode = (id, label, visible, scale) => ({
    id: id,
    label: label,
    visible: ko.observable(visible)
});

var ecoCodes = ecofigConfig.ecoCodeConfig.values.map(x => ecoCode(x.id, x.label, true, 0.0));

var viewModel = {
    currentCode: ko.observable(ecoCodes[0]),
    ecoCodes: ko.observableArray(ecoCodes),
    scale: ko.observable(ecofigConfig.globalScale),
    age: ko.observable(0)
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
    viewModel.scale.subscribe( value => controller.setGlobalScale(value) );
    viewModel.age.subscribe( value => controller.display({ age: -value }) );

    ko.applyBindings(viewModel, document.getElementById('toolbar'));
}

export default setup;