import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [{
  id: '1',
  name: 'Felipe',
  email: 'felipe@exemplo.com',
  age: 27
}, {
  id: '2',
  name: 'Sarah',
  email: 'sarah@exemplo.com',
  age: 32
}, {
  id: '3',
  name: 'Mike',
  email: 'mike@exemplo.com',
  age: 32
}, {
  id: '4',
  name: 'Andrew',
  email: 'andrew@exemplo.com',
  age: 23
}]

const posts = [{
  id: '101',
  title: 'Happy New Year',
  body: 'A great new year awaits for us',
  published: true
}, {
  id: '102',
  title: 'Christimas comes',
  body: 'I love christmas lights',
  published: true
}, {
  id: '103',
  title: 'The summer has come',
  body: 'I love swimming in a hot summer day',
  published: true
}, {
  id: '104',
  title: 'I loves holidays',
  body: 'Break up from the rotine',
  published: false
}
]

// Type Definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
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
    users(parent, args, ctx, info) {
      if(!args.query) {
        return users
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, ctx, info) {
      if(!args.query) {
        return posts
      }

      return posts.filter((post) => {
        const isTitle = post.title.toLowerCase().includes(args.query.toLowerCase())
        const isBody = post.body.toLowerCase().includes(args.query.toLowerCase())

        return isTitle || isBody;
      })
    },
    me() {
      return {
        id: '123098',
        name: 'Mike',
        email: 'mike@example.com',
        age: 28
      }
    },
    post() {
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