import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID

// Type Definitions (schema)
const typeDefs = `
  type Query {
    add(a: Float, b: Float): Float!
    greeting(name: String, position: String): String!
    fetchUser: User!
    fetchPost: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

// RESOLVERS PARAMETERS
// Parent: Used when in a relationship
// Args: Used to pass parameters from frontend to backend
// Ctx: Used to pass info about a context. Example: Logged users
// Info: Contains information about the operations sent to the server

// Resolvers 
const resolvers = {
  Query: {
    add(parent, args, ctx, info) {
      if(args.a && args.b) {
        return args.a + args.b
      }
    },
    greeting(parent, args, ctx, info) {
      if(args.name && args.position) {
        return `Hello ${args.name}! You are my favorite ${args.position}`
      } else {
        return 'Hello!'
      }
    },
    fetchUser() {
      return {
        id: '123098',
        name: 'Mike',
        email: 'mike@example.com',
        age: 28
      }
    },
    fetchPost() {
      return {
        id: 'p12309',
        title: 'Happy New Year',
        body: 'I love December feels',
        published: true
      }
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