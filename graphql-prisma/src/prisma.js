import { Prisma } from 'prisma-binding'

// Constructor function
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

// prisma.query, prisma.mutation, prisma.subscription. prisma.exists

// prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.query.comments(null, '{ id text author { id name } }').then((data) => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.mutation.createPost({
//   data: {
//     title: "My GraphQL post is live",
//     body: "You can find the new course here",
//     published: true,
//     author: {
//       connect: {
//         id: "ckisykdpo000r0a28hol4suuy"
//       }
//     }
//   }
// }, '{ id title body published }').then((data) => {
//   console.log(data)
//   return prisma.query.users(null, '{ id name posts { id title } }')
// }).then((data) => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.mutation.updatePost({
//   where: {
//     id: "ckiz3oov801m50a28uqf6ydli"
//   },
//   data: {
//     body: "This is how to get started with Graphql...",
//     published: true
//   }
// }, '{ id }').then((data) => {
//   console.log(data)
//   return prisma.query.posts(null, '{ id title body published }')
// }).then((data) => {
//   console.log(data)
// })