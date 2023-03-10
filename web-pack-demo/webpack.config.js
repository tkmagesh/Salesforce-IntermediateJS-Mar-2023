const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const process = require('process')


module.exports = function (env) {
    return {
        entry: './app/index.js',
        module: {
            rules: [
                { test: /\.css$/, use: ['style-loader', 'css-loader'] },
                { test: /\.(js)$/, use: 'babel-loader' }
            ]
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.[contenthash].js'
        },
        plugins: [
            new HtmlWebpackPlugin()/* ,
            new webpack.EnvironmentPlugin({
                "NODE_ENV": "production"
            }) */
        ],
        mode: env.production ? 'production' : 'development'
    }
}