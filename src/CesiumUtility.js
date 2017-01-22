'use strict';

// Alt #1: var Cesium = require('cesium/Source/Cesium');
import { default as Cesium } from "cesiumDll/Cesium";

const fromDegrees = Cesium.Cartesian3.fromDegrees;
const toRadians = Cesium.Math.toRadians;
const fromDegreesArray = Cesium.Cartesian3.fromDegreesArray;

const fromCssColorString = (rgb,a) => {
    return Cesium.Color.fromCssColorString(rgb).withAlpha(a);
}

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
    cartesian3: {
        fromDegreesArray: fromDegreesArray,
        fromDegrees: fromDegrees
    },
    toRadians: toRadians,
    fromCssColorString: fromCssColorString,
    blueColor: (a) => Cesium.Color.BLUE.withAlpha(a),

    knockout: () => {
        return Cesium.knockout;
    }

}

export default CesiumUtility;
