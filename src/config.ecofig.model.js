"use strict";

// påverkar utbredning av boundry: expand_boundry: x | false 
// scale by area intead of size?

// import { CircleEcofigBoundryModelStrategy } from './EcofigBoundryModelStrategy.js';
// import { SimpleCircleEcofigBoundryStrategy } from './EcofigBoundryStrategy.js';
// import { GltfCesiumModelStrategy } from './CesiumModelStrategy.js';
// import { CircularEcofigLayoutStrategy } from './EcofigLayoutStrategy.js';

const modelScale = 8000.0;
const mergeProximity = 15000.0;

const ecofigBoundryConfig = {
    size: 15000.0,
    bgColor: { rgb: '#FFA500', a: 0.15 /* imageUrl: './assets/someImage.png' */ },
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
        assetPath: '/assets/output/',
        ecoCodeConfig: new Map([
            // bush.gltf cow.gltf dung.gltf fence.gltf flower.gltf flower2.gltf grass.gltf horse.gltf human.gltf
            // marsh.gltf pine.gltf pine2.gltf pond.gltf salt2.gltf stream.gltf tree2.gltf waterdrop.gltf wheat.gltf...
            [ "BEco1",  { type: "default", setup: { asset: "pond-optimized.glb", scale: false, factor: 0.2, multiply: [0,5], spread: "random", bgColor: {r: 0, g: 0, b:0, a:0.25 }}}], // Aquatics
            [ "BEco1a", { type: "default", setup: { asset: "pond-optimized.glb", scale: false, factor: 0.3, multiply: [0,5], spread:  "random", bgColor: {r: 0, g: 0, b:0, a:0.25 }}}], // "Indicators: Standing water"
            [ "BEco1b", { type: "default", setup: { asset: "stream-optimized.glb", scale: false, factor: 1.0, multiply: [1,10], spread: "random", bgColor: {r: 0, g: 0, b:0, a:0.25 }}}], // "Indicators: Running water"
            [ "BEco2",  { type: "default", setup: { asset: "fence-optimized.glb", scale: false, factor: 0.01, multiply: [1,5], spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Pasture/Dung"
            [ "BEco3",  { type: "default", setup: { asset: "flower2-optimized.glb", scale: false, factor: 0.2, multiply: [1,25], spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Meadowland"
            [ "BEco4",  { type: "default", setup: { asset: "tree5-optimized.glb", scale: false, factor: 0.5, multiply: [1,5], spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Wood and trees"
            [ "BEco4a", { type: "default", setup: { asset: "tree5-optimized.glb", scale: false, factor: 0.5, multiply: [1,5], spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Indicators: Deciduous"
            [ "BEco4b", { type: "default", setup: { asset: "pine2-optimized.glb", scale: true, factor: 1.0, multiply: [1,5], spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Indicators: Coniferous"
            [ "BEco5b", { type: "default", setup: { asset: /*water-meadow*/ "human-optimized.glb", scale: true, factor: 1.0, multiply: [1,10], spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Open wet habitats"
            [ "BEco6a", { type: "default", setup: { asset: /* plow */ "human-optimized.glb", scale: false, factor: 0.01, multiply: [1,5], spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Disturbed/arable"
            [ "BEco6b", { type: "default", setup: { asset: /* plow */ "human-optimized.glb", scale: false, factor: 0.01, multiply: [1,5], spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Sandy/dry disturbed/arable"
            [ "BEco7a", { type: "default", setup: { asset: "dung-optimized.glb", scale: true, factor: 1.0, multiply: false, spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Dung/foul habitats" //Double with "Indicators: Dung"!
            [ "BEco7b", { type: "default", setup: { asset: "pond-optimized.glb", scale: true, factor: 1.0, multiply: false, spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Carrion"
            [ "BEco7c", { type: "default", setup: { asset: "dung-optimized.glb", scale: false, factor: 1.0, multiply: [1,10], spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Indicators: Dung"
            [ "BEco8",  { type: "default", setup: { asset: "human-optimized.glb", scale: false, factor: 0.01, multiply: [1,10], spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // 'Mould beetles of all types'
            [ "BEco9a", { type: "default", setup: { asset: "human-optimized.glb", scale: false, factor: 0.01, multiply: [1,10], spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "General synanthropic"
            [ "BEco9b", { type: "default", setup: { asset: "wheat-optimized.glb", scale: true, factor: 1.0, multiply: false, spread: null, bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Stored grain pest"
            [ "BEco10", { type: "default", setup: { asset: "tree5-optimized.glb", scale: false, factor: 0.5, multiply: [1,5], spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Dry dead wood": "",
            [ "BEco12", { type: "default", setup: { asset: "grass-optimized.glb", scale: false, factor: 1.0, multiply: [1,100], spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Heathland & moorland"
            [ "BEco13", { type: "default", setup: { asset: "salt2-optimized.glb", scale: false, factor: 1.0, multiply: [1,5], spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Halotolerant"
            [ "BEco99", { type: "default", setup: { asset: "marsh-optimized.glb", scale: true, factor: 1.0, multiply: false, spread: "random", bgColor: {r: 0, g: 0, b:255, a:0.25 }}}], // "Wetlands/marshes"
        ])
    }
}
export default ecofigDefaultModelSetup;
