let webpack = require('webpack');
let path = require('path');


module.exports = {

    entry: {
        bundle: ['./src/js/polyfill.js', './src/js/main.js'],
        vendor: ['vue', 'whatwg-fetch']
    },

    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: '[name].js',
        publicPath: './public'
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]

    },

    resolve: {

        alias: {
            'vue$': 'vue/dist/vue.common.js'
        },

        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor']
            })
        ]

    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourcemap: true,
            compress: {
                warnings: false
            }
        })
    );

    module.exports.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        })
    )
}