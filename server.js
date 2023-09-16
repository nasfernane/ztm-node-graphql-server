const express = require('express');
const { ApolloServer } = require('apollo-server-express')

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const PORT = 3000;

// charge tous les fichiers graphql contenus dans des (sous)répertoires
const typesArray = loadFilesSync('**/*', { extensions: ['graphql'] });
const resolversArray = loadFilesSync('**/*', { extensions: ['resolvers.js'] });

async function startApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: typesArray, 
    resolvers: resolversArray
  })

  const server = new ApolloServer({
    schema: schema,
  })

  await server.start();
  server.applyMiddleware({ app, path: '/graphql'})

  app.listen(PORT, () => {
    console.log(`Running GraphQL server http://www.localhost:${PORT}/graphql`)
  });
}

startApolloServer();
