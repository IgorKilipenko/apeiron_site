const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
import userConfig from './user.config';
import Database from './db';
import { typeDefs } from './schema';
import cors from 'cors';

const isDevelopment = process.env.NODE_ENV === 'development';

const PORT = 3300;

var config = {
    host: 'VH55.spaceweb.ru',
    user: userConfig.db.user,
    password: userConfig.db.pass,
    database: userConfig.db.name,
    charset: 'UTF8_GENERAL_CI',
    bigNumberStrings: true
};
const db = new Database(config);
const queryText = `
SELECT cat.ItemID as id, cat.SortOrder as 'order', cat.Title as title, 
cat.Description as description, cat.MetaTitle as metaTitle, cat.MetaDescription as metaDescription, 
cat.Content as content, cat.CategoryID as categoryId, cat.LanguageCode as languageCode, cat.Image as image, cat.Active as active
, c.CategoryID as parentId, c.Title as parentTitle
FROM catalog_category c
RIGHT JOIN catalog_category ch
ON c.CategoryID = ch.ParentID
LEFT JOIN catalog cat
on cat.CategoryID = ch.CategoryID
WHERE c.ParentID = 0 AND cat.LanguageCode = "ru"
ORDER BY cat.ItemID ASC
`;
let catalog = [];

const resolvers = {
    Query: {
        catalog: () => {
            return db.fetchQuery(queryText, [], rows => {
                const reg = /<[^>]*>/gi;
                return rows.map(r => ({
                    ...r,
                    title: r.title.replace(reg, ''),
                    content: r.content.replace(reg, ''),
                    description: r.description.replace(reg, '')
                }));
            });
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

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

if (isDevelopment) {
    app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

app.listen(PORT, () => {
    //catalog =
    console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
});
