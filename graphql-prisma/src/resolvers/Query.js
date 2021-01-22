const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {}

    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query
        }, {
          email_contains: args.query
        }]
      }
    }

    return prisma.query.users(opArgs, info)
    // First args: nothing, string, object
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {}

    if (args.query) {
      opArgs.where = {
        OR: [{
          title_contains: args.query
        }, {
          body_contains: args.query
        }]
      }
    }

    return prisma.query.posts(null, info)
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info)
  },
  me() {
    return {
      id: "123098",
      name: "Mike",
      email: "mike@example.com",
      age: 28,
    };
  },
  post() {
    return {
      id: "p12309",
      title: "Happy New Year",
      body: "I love December feels",
      published: true,
    };
  },
};

export { Query as default }