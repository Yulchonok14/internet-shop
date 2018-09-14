var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var helpers = require('./helpers');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

console.log('@@@@@@PROD@@@@@');

module.exports=webpackMerge(commonConfig, {
    devtool: 'source',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    optimization: {minimizer: [new UglifyJsPlugin({
        uglifyOptions: {
            warnings: false,
            comments: false
        },
        sourceMap: false
    })]},


    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        new MiniCssExtractPlugin({
            filename: '[name].hash.css'
        }),

        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: false
            }
        })
    ]
});