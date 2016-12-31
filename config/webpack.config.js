
const path = require('path')
const webpack = require('webpack')
const env = process.env.NODE_ENV;
const projectRoot = path.resolve(__dirname)
const HtmlPlugin = require("html-webpack-plugin");


var commonPlugins = [
    //new webpack.DllReferencePlugin({
    //    scope : "cesiumDll",
    //    manifest: require(path.join(projectRoot, "distdll/cesiumDll-manifest.json")),
    //})
    new HtmlPlugin({
        template: "./src/index.template.html",
        inject: "body"
    })
];

var devPlugins = [
    //new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.OldWatchingPlugin(),
    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin(),
    //new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development')})
];

var productionPlugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.optimize.DedupePlugin(),
    //new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false} })
];

var plugins = commonPlugins.concat(
    process.env.NODE_ENV === "production" ? productionPlugins : devPlugins
);

module.exports = {
    entry: ['babel-polyfill', './src/main.js'], //[ './src/main.js', './distdll/cesiumDll.dll.js' ],
    output: {
        path: './public',
        filename: 'bundle.js',
        sourcePrefix: ""
    },
    resolve: {
        extensions: ['', '.js'],
    //     fallback: [ path.join(__dirname, './node_modules') ],
        alias: {
            'src': path.join(__dirname, 'src'),
            'assets': path.join(__dirname, './src/assets')
        }
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: projectRoot,
                exclude: /(node_modules|lib|public)/
            }
        ],
        loaders: [
            { test: /\.css$/,                  loader: 'style!css' },
            { test : /\.(png|gif|jpg|jpeg)$/,  loader: "file-loader" },
            { test: /Cesium\.js$/,             loader: "script", exclude: /node_modules/ },
            { test: /\.js$/,                   loader: 'babel-loader', exclude: [/node_modules/] }
        ]
    },
    plugins: plugins,
    devtool : "source-map", // '#cheap-module-inline-source-map'
    devServer: {
        contentBase: './public',
        inline: true,
        // hot: true,
        // port: '',
        port: 8080,
        clientLogLevel: "info",
        quiet: false,
        noinfo: false,
        // proxy: {
        //     '/api': {
        //         target: 'file://' + path.join(__dirname, 'api/geo2.json'),
        //         bypass: function(req, res, proxyOptions) {
        //             return path.join(__dirname, 'api/geo2.json');
        //         }
        //     }
        // },
        stats: { colors: true },
        watchOptions: {
            ignored: /(node_modules|test|public)/
            // aggregateTimeout: 300,
            // poll: 1000
        }
    },
}
