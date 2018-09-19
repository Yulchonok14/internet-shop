var webpack = require('webpack');
var helpers = require('./helpers');

console.log('@@@@@@TEST@@@@@');

module.exports = {
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.ts','.js']
    },

    module: {
        rules: [{
                test: /\.ts$/,
                loader: [{
                        loader: 'ts-loader',
                        options: {configFile: helpers.root('tsconfig.json')}
                    },
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'null-loader'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: 'null-loader'
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw-loader'
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            //The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\\/)core(\\\/)@angular/,
            helpers.root('./src'), //location of your src
            {}//a map of your routes
        )
    ]
};