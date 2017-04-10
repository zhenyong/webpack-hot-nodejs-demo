const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack/hot/poll?1000',
        './src/main'],
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'sourcemap',
};
