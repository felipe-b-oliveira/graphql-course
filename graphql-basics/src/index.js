import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

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
  published: true,
  author: '1'
}, {
  id: '102',
  title: 'Christimas comes',
  body: 'I love christmas lights',
  published: true,
  author: '1'
}, {
  id: '103',
  title: 'The summer has come',
  body: 'I love swimming in a hot summer day',
  published: true,
  author: '2'
}, {
  id: '104',
  title: 'I loves holidays',
  body: 'Break up from the rotine',
  published: false,
  author: '3'
}
]

const comments = [
  {
    id: "001",
    text: "Yeah! I'm exciting for...",
    author: "1",
    post: "101"
  },
  {
    id: "002",
    text: "the fireworks in the beach",
    author: "1",
    post: "102"
  },
  {
    id: "003",
    text: "Is the best thing ever",
    author: "2",
    post: "103"
  },
  {
    id: "004",
    text: "And relax...",
    author: "3",
    post: "104"
  },
];

// Type Definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    createPost(data: CreatePostInput!): Post!
    createComment(data: CreateCommentInput!): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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
    comments(parent, args, ctx, info) {
      if(!args.query) {
        return comments
      }
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
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.data.email)

      // Verify if the email of a new user is already in the base
      if(emailTaken) {
        throw new Error('Email taken.')
      }

      const user = {
        // UUID generator
        id: uuidv4(),
        ...args.data
      }

      // Insert the new user in the base
      users.push(user)

      // Return the user for the mutation show up
      return user
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author)

      if(!userExists) {
        throw new Error('User not found')
      }

      const post = {
        id: uuidv4(),
        ...args.data
      }

      posts.push(post)

      return post
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author)
      const postExists = posts.some((post) => post.id === args.data.post && post.published === true)
  
      if(!userExists || !postExists) {
        throw new Error('Unable to find user and post')
      }
  
      const comment = {
        id: uuidv4(),
        ...args.data
      }
  
      comments.push(comment)
  
      return comment
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    }, 
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id
      })
    }
  }, 
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id
      })
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post
      })
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