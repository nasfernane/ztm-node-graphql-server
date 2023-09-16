const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const expressPlayground = require('graphql-playground-middleware-express').default

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const PORT = 3000;

// charge tous les fichiers graphql contenus dans des (sous)répertoires
const typesArray = loadFilesSync('**/*', {
  extensions: ['graphql'],
});

const resolversArray = loadFilesSync('**/*', {
  extensions: ['resolvers.js'],
});

const schema = makeExecutableSchema({
  typeDefs: typesArray, 
  resolvers: resolversArray
})

const app = express();

// endpoint principal
app.post('/graphql', createHandler({
  schema, 
}));

// endpoint bac à sable pour tester les requêtes
app.get('/graphiql', expressPlayground({ endpoint: '/graphql' }))


app.listen(PORT, () => {
  console.log(`Running GraphQL server http://www.localhost:${PORT}/graphiql`)
})