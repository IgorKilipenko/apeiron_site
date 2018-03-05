const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
import userConfig from './user.config';
import Database from './db';

var config = {
  host: "VH55.spaceweb.ru",
  user: userConfig.db.user,
  password: userConfig.db.pass,
  database: userConfig.db.name
};

let catalog = [];

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book], catalog: [Catalog] }
  type Book { title: String, author: String }
  type Catalog { 
      id: ID!, 
      title: String!,
      description: String,
      metaTitle: String,
      metaDescription: String,
      content: String,
      categoryId: Int,
      languageCode: Language,
      image: String,
      order: Int,
      active: Boolean
    }
   enum Language {
       ru,
       en
   }
`;

// The resolvers
const resolvers = {
  Query: { books: () => books, catalog: () => catalog },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3300, () => {
  const db = new Database(config);
  db.query(`SELECT ItemID as id, SortOrder as 'order', Title as title, 
  Description as description, MetaTitle as metaTitle, MetaDescription as metaDescription, 
  Content as Content, CategoryID as categoryId, LanguageCode as languageCode, Image as image, Active as active FROM catalog`)
    .then(rows => catalog = Object.values(rows));
  console.log('Go to http://localhost:3300/graphiql to run queries!');
});