import merge from 'webpack-merge';
import common from './webpack.common.babel';
import path from 'path';
import webpack from 'webpack';

const config = merge(common, {
    mode: 'development',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        'react-hot-loader/patch'
    ],
    devtool: 'inline-source-map',
    //devtool: '#source-map',
    output: {
        pathinfo: true,
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
});

export default config;