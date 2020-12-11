// Resolver Argument
// Context: Is just a object with a set of properties that will be passed to every 
// single resover method. It can be used to pass our database connection, things
// like authentication token, user logged, etc...

const Query = {
  // Context whithout destructuring example
  users(parent, args, context, info) {
    if (!args.query) {
      return context.db.users;
    }

    return context.db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },

  // Context destructuring example
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }

    return db.posts.filter((post) => {
      const isTitle = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase());
      const isBody = post.body.toLowerCase().includes(args.query.toLowerCase());
      return isTitle || isBody;
    });
  },
  comments(parent, args, { db }, info) {
    if (!args.query) {
      return db.comments;
    }
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