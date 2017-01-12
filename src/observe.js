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
    scale: ko.observable(ecofigConfig.globalScale)
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
    // Bind the viewModel to the DOM elements of the UI that call for it.
    //var toolbar = document.getElementById('toolbar');

    ko.applyBindings(viewModel, document.getElementById('toolbar'));
}

// // Make the skyAtmosphere's HSB parameters subscribers of the viewModel.
// function subscribeParameter(name) {
//     Cesium.knockout.getObservable(viewModel, name).subscribe(
//         function(newValue) {
//             skyAtmosphere[name] = newValue;
//         }
//     );
// }

// subscribeParameter('hueShift');
// subscribeParameter('saturationShift');
// subscribeParameter('brightnessShift');

// Cesium.knockout.getObservable(viewer, '_selectedEntity').subscribe(function(entity) {
//     if (!Cesium.defined(entity)) {
//         console.log('De-selected entity.');
//     } else {
//         console.log('Selected entity ' + (entity.name || entity.id));
//     }
// });

// Cesium.knockout.getObservable(viewer.infoBox.viewModel, 'showInfo').subscribe(function(newValue) {
  
// });

export default setup;