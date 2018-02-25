import webpack from 'webpack';
import Config from 'webpack-config';
import path from 'path';


export default new Config().extend('conf/webpack.base.config.js').merge({
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'react-hot-loader/patch',
    __dirname + '/../client/index.js',
  ],
  //devtool: 'inline-source-map',
  devtool: '#source-map',
  output: {
    pathinfo: true,
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        {loader:'style-loader'},
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: "[hash:base64:5]__[local]",
            minimize: false
          }
        },
        { loader: 'postcss-loader' },
      ]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});