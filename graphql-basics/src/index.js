import { GraphQLServer } from 'graphql-yoga';

// Type Definitions (schema)
const typeDefs = `
  type Query {
    hello: String!
    name: String!
    location: String!
    bio: String!
  }
`

// Resolvers 
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query'
    },
    name() {
      return 'Felipe Oliveira'
    }, 
    location() {
      return 'Duque de Caxias'
    },
    bio() {
      return 'Gotta Go Fast!!!'
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
