'use strict';
const object2map = o => Object.keys(o).reduce((m, k) => m.set(k, o[k]), new Map());

const randomCirclePoint = (origo, radius) => {
    let pt_angle = Math.random() * 2 * Math.PI;
    let pt_radius_sq = Math.random() * radius * radius;
    var pt_x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
    var pt_y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);
    return [origo[0]+pt_x, origo[1]+pt_y];
}

// let contentLoadedResolver = (resolve) => document.addEventListener("DOMContentLoaded", resolve);

const onReadyDocument = () => {
    let readyState = document.readyState;
    if (readyState === "interactive" || readyState === "complete") {
        return Promise.resolve();
    }
    return new Promise((resolve) => document.addEventListener("DOMContentLoaded", resolve));
    //return ["interactive", "complete"].includes(document.readyState) ? Promise.resolve() : new Promise(contentLoadedResolver)
}

var utility = {
    object2map: object2map,
    randomCirclePoint: randomCirclePoint,
    onReadyDocument: onReadyDocument
}

export default utility;
