import express from 'express';
import path from 'path';


const PORT = 7700;
const PUBLIC_PATH = __dirname + '/public';

const app = express();
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.babel').default;
  const compiler = webpack(webpackConfig);
  console.log(webpackConfig.entry);
  //console.log(webpackConfig.output.publicPath);
  app.use(require('webpack-dev-middleware')(compiler, {
    contentBase: './public',
    host: 'loclahost',
    hot: true,
    stats: {
      colors: true
    },
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }));
} else {
  app.use(express.static(PUBLIC_PATH));
}

app.all('*', function(req, res) {
    res.sendFile(path.resolve(PUBLIC_PATH, 'index.html'));
});

app.listen(PORT, function() {
  console.log('Listening on port ' + PORT + '...');
});