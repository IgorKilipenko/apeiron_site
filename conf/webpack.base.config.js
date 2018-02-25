import webpack from 'webpack';
import Config from 'webpack-config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import path from 'path';

const host = 'localhost';
const port = 7700;

export default new Config().merge({
    entry: ['./client/index.js'],
    output: {
        path: __dirname + '/../public',
        publicPath: '/'
    },

    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: [/node_modules/]
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    /*limit: 1000000,*/
                    name: '[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.svg$/,
                loader: require.resolve('svg-sprite-loader'),
                options: {
                    extract: false,
                    spriteFilename: "icons.[hash:20].svg"
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: require.resolve('file-loader'),
                options: {
                    name: '[name].[ext]',
                    outputPath: __dirname + 'fonts/'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/index.html',
            //filename: 'index.html',
            inject: 'body'
        }),
        new webpack.LoaderOptionsPlugin({ options: { postcss: [precss, autoprefixer] } }),
        new SpriteLoaderPlugin({ plainSprite: true }),
    ]
});
