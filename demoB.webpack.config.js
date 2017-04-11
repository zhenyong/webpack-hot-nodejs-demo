const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack/hot/poll?1000',
        './src/demoB/main.js'],
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'demoB.js'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
    ],
    devtool: 'sourcemap',
};
