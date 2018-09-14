var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        polyfill: './src/polyfill',
        vendor: './src/vendor',
        app: './src/main'
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            maxAsyncRequests: Infinity,
            maxInitialRequests: Infinity,
            name: true,
            cacheGroups: {
                default: {
                    chunks: 'async',
                    minSize: 30000,
                    minChunks: 2,
                    maxAsyncRequests: 5,
                    maxInitialRequests: 3,
                    priority: -20,
                    reuseExistingChunk: true
                },
                vendor: {
                    name: 'vendor'
                },
                app: {
                    name: 'app'
                },
                polyfill: {
                    name: 'polyfill'
                }
            }
        }
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {configFile: helpers.root('tsconfig.json')}
                    },
                    'angular2-template-loader'
                ],
                exclude: [/node-modules/]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node-modules/],
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader:
                    [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // you can specify a publicPath here
                                // by default it use publicPath in webpackOptions.output
                                publicPath: '../'
                            }
                        },
                        "css-loader"
                    ]
                    /*ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader?sourceMap'
                })*/
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw-loader'
            }
        ]
    },

    plugins: [
        //Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            //The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src'), //location of your src
            {}//a map of your routes
        ),



        /*new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfill']
        }),
*/
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};