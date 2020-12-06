import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID

// Type Definitions (schema)
const typeDefs = `
  type Query {
    fetchUser: User!
    fetchPost: Post!
    greeting(name: String, position: String): String!
    add(numbers: [Float!]!): Float!
    grades: [Int!]!
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

// Resolvers 
const resolvers = {
  Query: {
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
    },
    greeting(parent, args, ctx, info) {
      if(args.name && args.position) {
        return `Hello ${args.name}! You are my favorite ${args.position}`
      } else {
        return 'Hello!'
      }
    },
    add(parent, args, ctx, info) {
      if(args.numbers.length === 0) {
        return 0
      }

      return args.numbers.reduce((acc, currValue) => {
        return acc + currValue
      })
    },
    grades(parent, args, ctx, info) {
      return [99, 85, 75]
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