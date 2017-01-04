'use strict';

import { default as ecofigConfig } from './config.js';
import { default as ecofigEffigyFactory } from './EcofigEffigyFactory.js';

class EcofigEffigyController {

    constructor(view, store) {
        this.ecofigEffegies = [];
        this.view = view;
        this.store = store;
    }
 
    display(filter= null)
    {
        let ecofigs = this.store.find(filter);
        let ecofigEffigies = ecofigEffigyFactory.create(ecofigs);
        this.view.reset();
        for (let ecofigEffigy of ecofigEffigies) {
            this.view.display(ecofigEffigy.getModels());
        }
    }

    flyHome() {
        this.view.flyTo(ecofigConfig.ecofigModelSetup.startDestination, ecofigConfig.ecofigModelSetup.startOrientation);
    }
    
    reset() {
        this.view.reset();
    }
    
}

export { EcofigEffigyController };
