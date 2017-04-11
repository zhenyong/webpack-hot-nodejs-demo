const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack/hot/poll?1000',
        './src/demoA/main.js'],
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'demoA.js'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'sourcemap',
};
