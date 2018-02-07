import webpack from 'webpack';
import Config from 'webpack-config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import path from 'path';

const host = 'localhost';
const port = 7700;

export default new Config().merge({
  entry: [
    './client/index.js',
  ],
  output: {
    path: path.resolve(__dirname, '/../public'),
    publicPath: '/',
  },
  
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: [
          /node_modules/,
          path.resolve(__dirname, 'client2'),
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: require.resolve('url-loader'),
        options: {
          /*limit: 1000000,*/
          name: '[name].[hash:8].[ext]',
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: "body"
    }),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [precss, autoprefixer] } })
  ]
});