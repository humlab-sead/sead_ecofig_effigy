'use strict';

var Cesium = require('cesium/Source/Cesium');

const fromDegrees = Cesium.Cartesian3.fromDegrees;
const toRadians = Cesium.Math.toRadians;
const fromDegreesArray = Cesium.Cartesian3.fromDegreesArray;

const distance = (p, q) =>  Cesium.Cartesian3.distance(fromDegrees(p[0], p[1]),fromDegrees(q[0], q[1]));
const loadJson = url => Cesium.loadJson(url);

const CesiumUtility = {

    createMatrix: p => Cesium.Transforms.eastNorthUpToFixedFrame(fromDegrees(p[0], p[1], 0.0)),

    flyTo: (camera, { longitude: longitude, latitude: latitude, height: height }, { heading: heading, pitch: pitch, roll: roll }) => {
        camera.flyTo({
            destination: fromDegrees(longitude, latitude, height),
            orientation: {
                heading: toRadians(heading),
                pitch: toRadians(pitch),
                roll: roll
            }
        });
    },

    distance: distance,
    loadJson: loadJson,
    fromDegreesArray: fromDegreesArray,
    fromDegrees: fromDegrees,
    toRadians: toRadians

}

export default CesiumUtility;
