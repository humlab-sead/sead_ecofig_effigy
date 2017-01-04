"use strict";

import { CircleEcofigBoundryModelStrategy } from './EcofigBoundryModelStrategy.js';
import { SimpleCircleEcofigBoundryStrategy } from './EcofigBoundryStrategy.js';
import { GltfCesiumModelStrategy } from './CesiumModelStrategy.js';
import { CircularEcofigLayoutStrategy } from './EcofigLayoutStrategy.js';
import { GeoMidPointCalculator } from './MidPointCalculator.js';
import { SimpleEcofigCoalesceStrategy } from './EcofigCoalesceStrategy.js';

const wireupConfig = {
    boundry: {
        geometryStrategy: SimpleCircleEcofigBoundryStrategy,
        modelStrategy: CircleEcofigBoundryModelStrategy
    },
    ecofigLayoutStrategy: CircularEcofigLayoutStrategy,
    cesiumModelStrategy: GltfCesiumModelStrategy,
    midPointCalculator: GeoMidPointCalculator,
    ecofigCoalesceStrategy: SimpleEcofigCoalesceStrategy
}

export default wireupConfig;
