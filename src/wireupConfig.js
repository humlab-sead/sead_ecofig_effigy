"use strict";

import { CircleEcofigBoundryModelStrategy } from './EcofigBoundryModelStrategy.js';
import { SimpleCircleEcofigBoundryStrategy } from './EcofigBoundryStrategy.js';
import { GltfCesiumModelStrategy } from './CesiumModelStrategy.js';
import { CircularEcofigLayoutStrategy } from './EcofigLayoutStrategy.js';
import { MidPointCalculator } from './MidPointCalculator.js';
import { SimpleEcofigCoalesceStrategy } from './EcofigCoalesceStrategy.js';

const wireupConfig = {
    boundry: {
        geometryStrategy: SimpleCircleEcofigBoundryStrategy,
        modelStrategy: CircleEcofigBoundryModelStrategy
    },
    ecofigLayoutStrategy: CircularEcofigLayoutStrategy,
    cesiumModelStrategy: GltfCesiumModelStrategy,
    midPointCalculator: MidPointCalculator,
    ecofigCoalesceStrategy: SimpleEcofigCoalesceStrategy
}

export default wireupConfig;
