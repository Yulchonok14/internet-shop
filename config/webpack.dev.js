var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var helpers = require('./helpers');

console.log('@@@@@@DEV@@@@@');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),

        new webpack.DefinePlugin({
            'process.env': {
                API_URL: JSON.stringify('http://hocalhost:5000/api/')
            }
        }),

        new webpack.NamedModulesPlugin()
    ]
});