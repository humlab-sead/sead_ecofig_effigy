
const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require("html-webpack-plugin");

const configUtility = require('./webpack.utility.js');
console.log(path.resolve(configUtility.application.root, "distdll/cesiumDll-manifest.json"));

var commonPlugins = [
    new HtmlPlugin({
        template: "./src/index.template.html",
        inject: "body"
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendor',
    //     minChunks: 2,
    //     chunks: ['application', 'diffux_ci', 'specs', 'activity_map'],
    // }),
];

var devPlugins = [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development')}),
    // Alt #2: Remove if Cesium loaded as script
    new webpack.DllReferencePlugin({
        context: ".",
        scope : "cesiumDll",
        manifest: require(path.resolve(configUtility.application.root, "distdll/cesiumDll-manifest.json")),
    }),
    new webpack.NoErrorsPlugin()
];

var productionPlugins = [
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
    new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.optimize.DedupePlugin(),
    //new webpack.optimize.AggressiveMergingPlugin(),
    //new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false} })
];

var plugins = commonPlugins.concat(
    process.env.NODE_ENV === "production" ? productionPlugins : devPlugins
);

if (process.env.NODE_ENV === "production") {
    console.log("Building release bundle...");
}

module.exports = {
    entry: [
        // FIXME! Commented out for compile performance...
        //'babel-polyfill',
        './src/main.js'
    ],
    output: {
        path: configUtility.application.public,
        filename: 'bundle.js',
        sourcePrefix: ""
    },
    resolve: {
        extensions: ['', '.js'],
    //     fallback: [ path.join(__dirname, './node_modules') ],
        alias: {
            'src': configUtility.application.source,
            //'assets': path.join(__dirname, './src/assets')
        }
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: configUtility.application.source,
                exclude: configUtility.application.excludes 
            }
        ],
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test : /\.(png|gif|jpg|jpeg)$/,
                loader: "file-loader"
            },
            // Alt #1: Remove if cesiumDLL is used
            // { test: /Cesium\.js$/,             loader: "script", exclude: /node_modules/ },
            {
                test: /\.js$/,
                loader: 'babel-loader', // ?cacheDirectory=true
                exclude: configUtility.application.excludes,
                query : {
                    cacheDirectory : true
                }
            }
        ]
    },
    plugins: plugins,
    devtool : 'source-map',
    //process.env.NODE_ENV === "production" ? 'source-map' : 'eval-cheap-module-source-map',
    devServer: {
        contentBase: configUtility.application.public,
        inline: true,
        // hot: true,
        // port: '',
        port: 8080,
        clientLogLevel: "info",
        quiet: false,
        noinfo: false,
        stats: { colors: true },
        watchOptions: {
            ignored: /(node_modules|api|css|distdll|resources|test)/
            // aggregateTimeout: 300,
            // poll: 1000
        }
    },
}
