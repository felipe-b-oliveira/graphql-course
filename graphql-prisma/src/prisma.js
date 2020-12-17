import { Prisma } from 'prisma-binding'

// Constructor function
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'localhost:4466'
})