
var path = require('path');
var __devRoot = path.resolve(__dirname, '..');

function devRoot(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__devRoot].concat(args));
}

function devNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return devRoot.apply(path, ['node_modules'].concat(args));
}

const devPath = {
    devRoot: devRoot,
    devNode: devNode
}

exports.devPath = devPath;
