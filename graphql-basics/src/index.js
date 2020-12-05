import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID

// Type Definitions (schema)
const typeDefs = `
  type Query {
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
  }
`

// Resolvers 
const resolvers = {
  Query: {
    title() {
      return 'Caneta Azul'
    },
    price() {
      return 0.70
    },
    releaseYear() {
      return 2019
    },
    rating() {
      return 3.9
    },
    inStock() {
      return true
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('The server is up!')
})
