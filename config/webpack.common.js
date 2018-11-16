var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var helpers = require('./helpers');

var isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        polyfill: './src/polyfill',
        vendor: './src/vendor',
        app: isProd ? './src/main.aot.ts':'./src/main.ts'
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
                polyfill: {
                    name: 'polyfill'
                },
                vendor: {
                    name: 'vendor'
                },
                app: {
                    name: 'app'
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
                    presets: ['es2015'],
                    compact: false
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                /*loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]*/
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.(css|scss)$/,
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
                        ["css-loader", "file-loader"]
                    ]
            },
            {
                test: /\.(css|scss)$/,
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
            template: 'src/index.html',
            chunksSortMode: 'dependency'
        })
    ]
};