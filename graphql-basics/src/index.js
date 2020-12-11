import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
let users = [{
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

let posts = [{
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

let comments = [
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
  {
    id: "005",
    text: "Deleted comment test",
    author: "2",
    post: "101"
  }
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
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput!): Post!
    deletePost(id: ID!): Post!
    createComment(data: CreateCommentInput!): Comment!
    deleteComment(id: ID!): Comment!
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
    deleteUser(parent, args, ctx, info) {
      /* *** OBSERVATION! ***
      */

      // FindIndex: Same as Find, but returns the array index instead of value
      const userIndex = users.findIndex((user) => user.id === args.id)

      if (userIndex === -1) {
        throw new Error('User not found')
      }

      // Returns the edleted user
      const deletedUsers = users.splice(userIndex, 1)

      // Filters all the posts and comments that belongs to the deleted user
      posts = posts.filter((post) => {
        const match = post.author === args.id

        if (match) {
          // If a comment doesn't belong to the deleted user id it can stay
          comments = comments.filter((comment) => comment.post !== post.id)
        }

        return !match
      })

      // Actually remove deleted user comment
      // If is not rue, keep the item, the filter will return only comments that
      // is not associated with the deleted user comment
      comments = comments.filter((comment) => comment.author !== args.id)

      return deletedUsers[0]
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
    deletePost(parent, args, ctx, info) {
      const postIndex = posts.findIndex((post) => post.id === args.id)

      if (postIndex === -1){
        throw new Error('Post not found')
      }

      const deletedPosts = posts.splice(postIndex, 1)

      comments = comments.filter((comment) => comment.post !== args.id)

      return deletedPosts[0]

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
    },
    deleteComment(parent, args, ctx, info) {
      const commentIndex = comments.findIndex((comment) => comment.id === args.id)

      if (commentIndex === -1) {
        throw new Error('Comment not found')
      }

      const deletedComments = comments.splice(commentIndex, 1)

      return deletedComments[0]
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