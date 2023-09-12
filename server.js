const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const expressPlayground = require('graphql-playground-middleware-express').default
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLFloat } = require('graphql');

// using deprecated library express-graphql
// const { graphqlHTTP } = require('express-graphql')

const PORT = 3000;

// using deprecated library express-graphql
// const schema = buildSchema(`
//   type Query {
//     description: String
//     price: Float
//   } 
// `)

const root = {
  description: 'Red shoe',
  price: 42.12,
}

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      description: {
        type: GraphQLString,
      },
      price: {
        type: GraphQLFloat,
      }
    },
  })
})

const app = express();

app.post('/graphql', createHandler({
  schema, 
  rootValue: root,
}));

app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

// using deprecated library express-graphql
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
// }));

app.listen(PORT, () => {
  console.log(`Running GraphQL server on port ${PORT}`)
})