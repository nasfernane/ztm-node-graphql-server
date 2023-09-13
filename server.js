const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const expressPlayground = require('graphql-playground-middleware-express').default
const { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList, GraphQLNonNull } = require('graphql');

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
  products: [
    {
      id: 'redshoe',
      description: 'Red Shoe',
      reviews: [
        { 
          rating: 4,
          comment: 'blabla'
        }
      ],
      price: 14.7,
    },
    {
      id: 'bluejean',
      description: 'Blue Jeans',
      price: 58.50,
    }
  ],
  orders: [
    {
      date: '2005-05-05',
      subtotal: 90.22,
      items: [
        {
          product: {
            id: 'redshoe',
            description: 'Old Red Shoe',
            price: 45.11
          },
          quantitu: 2
        }
      ]
    }
  ]
}

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: {
    rating: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    comment: {
      type: GraphQLString
    },
  }
})

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    reviews: {
      type: new GraphQLList(ReviewType)
    },
    price: {
      type: new GraphQLNonNull(GraphQLFloat),
    }
  }
})


const OrderItemType  = new GraphQLObjectType({
  name: 'OrderType',
  fields: {
    product: {
      type: new GraphQLNonNull(ProductType),
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt),
    },
   
  }
})

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: {
    date: {
      type: new GraphQLNonNull(GraphQLString),
    },
    subtotal: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    items: {
      type: new GraphQLList(OrderItemType)
    }
  }
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      products: {
        type: new GraphQLList(ProductType)
      },
      orders: {
        type: new GraphQLList(OrderType)
      }
    }
  }),
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