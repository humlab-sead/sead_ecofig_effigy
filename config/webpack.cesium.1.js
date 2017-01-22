"use strict";

const path = require("path");
const webpack = require("webpack");
const configUtility = require('./webpack.utility.js');

// console.log("ROOT: " + configUtility.root);

const webpackConfig = {
    entry : {
        cesiumDll : [ path.resolve(configUtility.cesium.source, "Cesium.js") ],
    },
    devtool : "#source-map",
    output : {
        path : configUtility.cesium.output,
        filename : "[name].dll.js",
        library : "[name]_[hash]",
        sourcePrefix: "",
    },
    plugins : [
        new webpack.DllPlugin({
            path : path.resolve(configUtility.cesium.output, "[name]-manifest.json"),
            name : "[name]_[hash]",
            context : configUtility.cesium.source
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module : {
        unknownContextCritical : false,
        loaders : [
            { test : /\.css$/, loader: "style!css" },
            {
                test : /\.(png|gif|jpg|jpeg)$/,
                loader : "file-loader",
            },
        ],
    },
};

module.exports = webpackConfig;