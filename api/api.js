const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
import userConfig from '../user.config';
//import Database from './db';
import Database from './database/database';
import { typeDefs } from './schema';
import cors from 'cors';

const isDevelopment = process.env.NODE_ENV === 'development';

const PORT = 3300;



const mdb = new Database();
mdb.connect()
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', () => error => console.log('Error connecting to MongoLab:', error));

const getCatalog = async (mdb) => {
    let res = null; 
    
    const query = mdb.Products.find({})
        .populate('category')
        .populate({
            path:'group',
            populate: {path: 'category'}
        })
        .populate('details');
    query.exec((err, products) => {
        res = products;
    })
    await query;
    return res;
}

const resolvers = {
    Query: {
        catalog: () => {
            return getCatalog(mdb);
        }
    }
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors()); // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *

app.use('/graphql', bodyParser.json(), graphqlExpress({ 
    schema,
    tracing: true,
    cacheControl: true, 
}));

if (true/*isDevelopment*/) {
    app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

app.listen(PORT, () => {
    //catalog =
    console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
});
