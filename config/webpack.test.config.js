
const configUtility = require('./webpack.utility.js');

let CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
    debug: true,
    entry: [
        'babel-polyfill',
        './test/complete.test.entry.js'
    ],
    output: {
        path: configUtility.test.public,
        filename: 'testBundle.js',
        sourcePrefix: ""
    },
    resolve: {
        extensions: ['', '.js'],
        root: configUtility.application.source
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
            {
                test: /\.spec\.js$/,
                loader: 'mocha'
            },
            // {
            //     test: /Cesium\.js$/,
            //     loader: "script",
            //     exclude: /node_modules/
            // },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: configUtility.test.excludes
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    // plugins: plugins,

    plugins: [
        new CircularDependencyPlugin({
            exclude: configUtility.test.excludes,
            failOnError: false
        })
    ],
    // FIXME: Use cheap source map instead
    devtool : 'source-map', //"source-map", // '#cheap-module-inline-source-map'
    devServer: {
        contentBase: configUtility.test.public, 
        inline: true,
        // hot: true,
        port: 8090,
        //clientLogLevel: "info",
        quiet: false,
        noinfo: false,
        stats: { colors: true },
        watchOptions: {
            ignored: configUtility.test.excludes
            // aggregateTimeout: 300,
            // poll: 1000
        }
    },
}
