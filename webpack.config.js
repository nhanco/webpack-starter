var webpack = require('webpack');
var path = require('path');
// plugin
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var IconfontWebpackPlugin = require('iconfont-webpack-plugin');

var glob = require("glob");
// distribute folder
var BUILD_DIR = path.resolve(__dirname, 'dist');
var jsFileList = glob.sync("./script/*.js");
var cssFileList = glob.sync("./css/*.css");
cssFileList.forEach(function (element) {
    jsFileList.push(element);
});

var config = {
    entry: jsFileList,
    output: {
        path: BUILD_DIR,
        filename: 'app.js'
    },
    // watch: true,
    plugins: [
        new UglifyJSPlugin({
            exclude: /\/excludes/
        }),
        new ExtractTextPlugin("app.css")
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    new IconfontWebpackPlugin(loader)
                                ]
                            }
                        }
                    ]
                })
            }
        ]
    }
    ,
};

module.exports = config;