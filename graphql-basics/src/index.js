import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID

// Type Definitions (schema)
const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }
`

// Resolvers 
const resolvers = {
  Query: {
    id() {
      return 'abc123'
    },
    name() {
      return 'Felipe'
    },
    age() {
      return 27
    },
    employed() {
      return true
    },
    gpa() {
      return 3.01
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
