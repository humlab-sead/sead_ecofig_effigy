"use strict";

const path = require("path");
const webpack = require("webpack");
const cesiumPath = require('./webpack.utility.js').cesium;
const input = cesiumPath.dev;

const webpackConfig = {
    entry : {
        cesiumDll : [ input.entry ],
    },
    devtool : 'eval-cheap-module-source-map',
    output : {
        path: cesiumPath.output,
        filename : "[name].dll.js",
        library : "[name]_[hash]",
        sourcePrefix: "",
    },
    plugins : [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DllPlugin({
            path : path.resolve(cesiumPath.output, "[name]-manifest.json"),
            name : "[name]_[hash]",
            context : input.source
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