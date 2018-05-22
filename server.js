import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { sendMail } from './mail/mail';

const PORT = 7700;
const PUBLIC_PATH = __dirname + '/public';

const app = express();
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.dev.babel').default;
    const compiler = webpack(webpackConfig);
    console.log(webpackConfig.entry);
    //console.log(webpackConfig.output.publicPath);
    app.use(
        require('webpack-dev-middleware')(compiler, {
            contentBase: './public',
            host: 'loclahost',
            hot: true,
            stats: {
                colors: true
            },
            publicPath: webpackConfig.output.publicPath
        })
    );
    app.use(
        require('webpack-hot-middleware')(compiler, {
            publicPath: webpackConfig.output.publicPath
        })
    );
} else {
    app.use(express.static(PUBLIC_PATH));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sendmail', async (req, res) => {
    //res.setHeader('Content-Type', 'application/json');
    try {
        console.log('start send');
        console.log({ body: req.body });
        const { name, email, message, response } = req.body;
        console.log({response})
        try{
            await sendMail(email, name, `Сообщение от ${name}`, message, req);
        }catch (err) {
            console.log('Send message error', err);
            res.status(400).json({ status: 'error', message: err })
            return;
        }
        res.status(200).json({ status: 'success' } );
    } catch (err) {
        console.log({ err });
        res
            .status(400)
            .json(
                { status: 'error', message: err } 
            );
    }
});

app.all('*', function(req, res) {
    res.sendFile(path.resolve(PUBLIC_PATH, 'index.html'));
});

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT + '...');
});
