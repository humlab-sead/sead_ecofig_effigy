
//const path = require('path')
process.stdout.write("hello: ");
process.stdout.write("path: " + __dirname);
const webconfigUtility = require('./webpack.utility.js');
process.stdout.write('src: ' + webconfigUtility.devPath.devRoot('src'))

let CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
    debug: true,
    entry: [ 'babel-polyfill', './test/complete.test.entry.js'], //'./test/complete.test.entry.js',
    output: {
        path: './public/test',
        filename: 'testBundle.js',
        sourcePrefix: ""
    },
    resolve: {
        extensions: ['', '.js'],
        root: webconfigUtility.devPath.devRoot('src')
        // modules: [
        //     path.resolve('./src'),
        //     path.resolve('./node_modules')
        // ]
        // alias: {
        //     'src': path.join(__dirname, '../src'),
        //     //'test': path.join(__dirname, 'test'),
        //     'assets': path.join(__dirname, '../src/assets')
        // }
    },

    module: {
        loaders: [
            //{ test: /\.css$/,                  loader: 'style!css' },
            { test: /\.spec\.js$/,   loader: 'mocha' },
            { test: /Cesium\.js$/,   loader: "script", exclude: /node_modules/ },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules)/
            },
            { test: /\.json$/, loader: "json-loader" }
        ]
    },
    // plugins: plugins,

    plugins: [
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp 
            //exclude: /a\.js/,
            // add errors to webpack instead of warnings 
            exclude: /node_modules/,
            failOnError: false
        })
    ],
    // FIXME: Use cheap source map instead
    devtool : 'source-map', //"source-map", // '#cheap-module-inline-source-map'
    devServer: {
        contentBase: '../public/test',
        inline: true,
        // hot: true,
        port: 8090,
        //clientLogLevel: "info",
        quiet: false,
        noinfo: false,
        stats: { colors: true },
        watchOptions: {
            ignored: /(node_modules)/
            // aggregateTimeout: 300,
            // poll: 1000
        }
    },
}
