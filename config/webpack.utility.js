
var path = require('path');

const root = path.resolve(__dirname, '..');

function devRoot(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [root].concat(args));
}

function devNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return devRoot.apply(path, ['node_modules'].concat(args));
}

module.exports = {
    root: root,
    application: {
        root: root,
        source: path.resolve(root, 'src'),
        public: path.resolve(root, 'public'),
        excludes: [
            path.resolve(root, "node_modules"),
            path.resolve(root, "api"),
            path.resolve(root, "css"),
            path.resolve(root, "distdll"),
            path.resolve(root, "resources"),
            path.resolve(root, "public"),
            path.resolve(root, "test")
        ],
    },
    devRoot: devRoot,
    devNode: devNode,
    test: {
        root: root,
        source: path.resolve(root, 'test'),
        public: path.resolve(root, 'public/test'),
        excludes: [
            path.resolve(root, "node_modules"),
            path.resolve(root, "api"),
            path.resolve(root, "css"),
            path.resolve(root, "distdll"),
            path.resolve(root, "resources"),
            path.resolve(root, "public")
        ]        
    },
    cesium: {
        root: root,
        output: path.resolve(root, "distdll"),
        dev: {
            source: path.resolve(root, "node_modules/cesium/Source/"),
            entry: "cesium/Source/Cesium.js",
        },
        prod: {
            source: path.resolve(root, "node_modules/cesium/Build/Cesium/"),
            entry: "cesium/Source/Cesium.js"
        }
    }

}
