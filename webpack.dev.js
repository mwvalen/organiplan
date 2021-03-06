const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common.js')


module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        port: 8080
    },
    watch: true,
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            title: 'OrganiPlan',
            inject: true
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    "sass-loader"
                ]
            }
        ]
    }
})