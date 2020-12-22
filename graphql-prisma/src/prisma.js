import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

// prisma.query, prisma.mutation, prisma.subscription. prisma.exists

// Check if exists example
// prisma.exists.Comment({
//   id: "ckit0eqzy00ab0a286bje10o9",
//   // text: "Felipe Oliveira"
//   author: {
//     id: "ckisykdpo000r0a28hol4suuy"
//   }
// }).then((exists) => {
//   console.log(exists)
// })

// 1. Create a new post
// 2. Fetch all of the info about the user (author)

const createPostForUser = async (authorId, data) => {
  const userExists = await prisma.exists.User({ id: authorId })

  if(!userExists) {
    throw new Error('User not Found')
  }

  const post = await prisma.mutation.createPost({
    data: {
      ...data,
      author: {
        connect: {
          id: authorId
        }
      }
    }
  }, '{ id }')

  const user = await prisma.query.user({
    where: {
      id: authorId
    }
  }, '{ id name email posts { id title published } }')

  return user
}

createPostForUser('ckiszwndy006309283s4vz2p1', {
  title: 'Great books to read',
  body: 'The War of Art',
  published: true
}).then((user) => {
  console.log(JSON.stringify(user, undefined, 2))
}).catch((error) => {
  console.log(error.message)
})

// const updatePostForUser = async (postId, data) => {
//   const post = await prisma.mutation.updatePost({
//     where: {
//       id: postId
//     },
//     data
//   }, '{ author { id } }')
//   const user = await prisma.query.user({
//     where: {
//       id: post.author.id
//     }
//   }, '{ id name email posts { id title published } }')
//   return user
// }

// updatePostForUser("ckiszgscc005o0a28rew06rup", { 
//   published: false 
// }).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2))
// })