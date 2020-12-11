import { GraphQLServer } from 'graphql-yoga';
import db from './db';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment
  },
  // Passing db object for every single resolver in our application, regardless
  // where these resolvers actually live.
  context: {
    db
  }
})

server.start(() => {
  console.log('The server is up!')
})