'use strict';
//import { default as ecofigConfig } from './config.js'; 

// Strategy for spatial layout of a sites ecofig elements 

class EcofigLayoutStrategy {
    layout() {
    }
}

class CircularEcofigLayoutStrategy extends EcofigLayoutStrategy {

    // Implements a circular layout strategy
    layout(ecofig) {
        let scale = [ 0.1, 0.075 ];
        var z_rot_step = (ecofig.values.length > 1) ?  (2.0 * Math.PI) / ecofig.values.length.length : 0.0;
        return ecofig.values.forEach((x,i) => {
            x.position[0] = ecofig.position[0] + Math.cos(i * z_rot_step) * scale[0];
            x.position[1] = ecofig.position[1] + Math.sin(i * z_rot_step) * scale[1];
        });
    }
// TODO add random layout
}

export  { CircularEcofigLayoutStrategy };