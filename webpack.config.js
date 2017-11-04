var webpack = require('webpack');
var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var glob = require("glob");
// distribute folder
var BUILD_DIR = path.resolve(__dirname, 'dist');
var config = {
    entry: glob.sync("./script/*.js"),
    entry: glob.sync("./css/*.css"),
    output: {
        path: BUILD_DIR,
        filename: 'app.js'
    },
    watch: true,
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
                loader: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: false,
                                minimize: true
                            }
                        }
                    ]
                })

            }
        ]
    },
};

module.exports = config;