"use strict";

// påverkar utbredning av boundry: expand_boundry: x | false 
// scale by area intead of size?

// import { CircleEcofigBoundryModelStrategy } from './EcofigBoundryModelStrategy.js';
// import { SimpleCircleEcofigBoundryStrategy } from './EcofigBoundryStrategy.js';
// import { GltfCesiumModelStrategy } from './CesiumModelStrategy.js';
// import { CircularEcofigLayoutStrategy } from './EcofigLayoutStrategy.js';

const modelScale = 15000.0;
const mergeProximity = 15000.0;

const ecofigBoundryConfig = {
    size: 15000.0,
    bgColor: { rgb: '#FFA500', a: 0.25 },
    geometryStrategy: null /*SimpleCircleEcofigBoundryStrategy*/,
    modelStrategy: null /*CircleEcofigBoundryModelStrategy*/
}

const ecofigDefaultModelSetup = {

    startDestination: { longitude: -1.257677, latitude: 48.752022, height: 600000.0 },
    startOrientation: { heading: 180.0, pitch: -120.0, roll: Math.PI },

    modelScale: modelScale,
    midPointCalculator: null,
    ecofigCoalesceStrategy: null,
    ecofigCoalesceConfig: { merge: true, proximity: mergeProximity, strategy: null, ignoreSite: false, ignoreEpoch: false },

    boundry: {
        modelStrategy: null, 
        config: ecofigBoundryConfig
    },
    ecofigLayoutStrategy: null /*new CircularEcofigLayoutStrategy()*/,
    cesiumModelStrategy: null /*new GltfCesiumModelStrategy()*/,
    cesiumModelConfig: {
        modelScale: modelScale,
        assetPath: '/assets/',
        ecoCodeConfig: new Map([
            // var environmentalIndicators2ModelsTranslation = {
            //   "Aquatics":                     "waterdrop.gltf",
            //   "Carrion":                      "carcass.gltf",
            //   "Disturbed/arable":             "plow.gltf",
            //   "Dung/foul habitats":           "dung.gltf", //Double with "Indicators: Dung"!
            //   "General synanthropic":         "human.gltf",
            //   "Halotolerant":                 "salt2.gltf",
            //   "Heathland & moorland":         "grass.gltf",
            //   "Indicators: Coniferous":       "pine2.gltf",
            //   "Indicators: Deciduous":        "tree-deciduous.gltf",
            //   "Indicators: Dung":             "dung.gltf",
            //   "Indicators: Running water":    "stream.gltf",
            //   "Indicators: Standing water":   "pond.gltf",
            //   "Meadowland":                   "flower2.gltf",
            //   "Open wet habitats":            "water-meadow.gltf",
            //   "Pasture/Dung":                 "fence.gltf",
            //   "Sandy/dry disturbed/arable":   "",
            //   "Stored grain pest":            "wheat.gltf",
            //   "Wetlands/marshes":             "marsh.gltf",
            //   "Wood and trees":               "tree5.gltf"
            // };
            [ "BEco1",  { type: "default", setup: { asset: "waterdrop.gltf", scale: false, multiply: [0,5], spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // Aquatics
            [ "BEco1a", { type: "default", setup: { asset: "pond.gltf", scale: "size", multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Indicators: Standing water"
            [ "BEco1b", { type: "default", setup: { asset: "stream.gltf", scale: "size", multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Indicators: Running water"
            [ "BEco2",  { type: "default", setup: { asset: "fence.gltf", scale: "area", multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Pasture/Dung"
            [ "BEco3",  { type: "default", setup: { asset: "flower2.gltf", scale: false, multiply: [1,5], spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Meadowland"
            [ "BEco4",  { type: "default", setup: { asset: "tree5.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Wood and trees"
            [ "BEco4a", { type: "default", setup: { asset: "tree5.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Indicators: Deciduous"
            [ "BEco4b", { type: "default", setup: { asset: "pine2.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Indicators: Coniferous"
            [ "BEco5b", { type: "default", setup: { asset: "water-meadow.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Open wet habitats"
            [ "BEco6a", { type: "default", setup: { asset: "plow.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Disturbed/arable"
            [ "BEco6b", { type: "default", setup: { asset: "plow.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Sandy/dry disturbed/arable"
            [ "BEco7a", { type: "default", setup: { asset: "dung.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Dung/foul habitats" //Double with "Indicators: Dung"!
            [ "BEco7b", { type: "default", setup: { asset: "waterdrop.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Carrion"
            [ "BEco7c", { type: "default", setup: { asset: "dung.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Indicators: Dung"
            [ "BEco8",  { type: "default", setup: { asset: "human.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // 'Mould beetles of all types'
            [ "BEco9a", { type: "default", setup: { asset: "human.gltf", scale: false, multiply: true, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "General synanthropic"
            [ "BEco9b", { type: "default", setup: { asset: "wheat.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Stored grain pest"
            [ "BEco10", { type: "default", setup: { asset: "tree5.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Dry dead wood": "",
            [ "BEco12", { type: "default", setup: { asset: "grass.gltf", scale: false, multiply: true, spread: [1,5], bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Heathland & moorland"
            [ "BEco13", { type: "default", setup: { asset: "salt2.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Halotolerant"
            [ "BEco99", { type: "default", setup: { asset: "marsh.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Wetlands/marshes"


            // [ "BEco1",  { type: "default", setup: { asset: "waterdrop.gltf", scale: false, multiply: [0,10], spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // Aquatics
            // [ "BEco1a", { type: "default", setup: { asset: "pond.gltf", scale: "size", multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Indicators: Standing water"
            // [ "BEco1b", { type: "default", setup: { asset: "stream.gltf", scale: "size", multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Indicators: Running water"
            // [ "BEco2",  { type: "default", setup: { asset: "fence.gltf", scale: "area", multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Pasture/Dung"
            // [ "BEco3",  { type: "default", setup: { asset: "flower2.gltf", scale: false, multiply: [1,5], spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Meadowland"
            // [ "BEco4",  { type: "default", setup: { asset: "tree2.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Wood and trees"
            // [ "BEco4a", { type: "default", setup: { asset: "tree2.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Indicators: Deciduous"
            // [ "BEco4b", { type: "default", setup: { asset: "tree2.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Indicators: Coniferous"
            // [ "BEco5b", { type: "default", setup: { asset: "water-meadow.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Open wet habitats"
            // [ "BEco6a", { type: "default", setup: { asset: "plow.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Disturbed/arable"
            // [ "BEco6b", { type: "default", setup: { asset: "plow.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Sandy/dry disturbed/arable"
            // [ "BEco7a", { type: "default", setup: { asset: "dung.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Dung/foul habitats" //Double with "Indicators: Dung"!
            // [ "BEco7b", { type: "default", setup: { asset: "carcass.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Carrion"
            // [ "BEco7c", { type: "default", setup: { asset: "dung.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Indicators: Dung"
            // [ "BEco8",  { type: "default", setup: { asset: "human.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // 'Mould beetles of all types'
            // [ "BEco9a", { type: "default", setup: { asset: "human.gltf", scale: false, multiply: true, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "General synanthropic"
            // [ "BEco9b", { type: "default", setup: { asset: "wheat.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Stored grain pest"
            // [ "BEco10", { type: "default", setup: { asset: "tree2.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Dry dead wood": "",
            // [ "BEco12", { type: "default", setup: { asset: "grass.gltf", scale: false, multiply: true, spread: [1,5], bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Heathland & moorland"
            // [ "BEco13", { type: "default", setup: { asset: "salt2.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Halotolerant"
            // [ "BEco99", { type: "default", setup: { asset: "marsh.gltf", scale: true, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Wetlands/marshes"
        ])
    }
}
export default ecofigDefaultModelSetup;
