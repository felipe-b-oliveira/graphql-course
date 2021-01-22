import uuidv4 from "uuid/v4";

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email })

    if (emailTaken) {
        throw new Error("Email taken.");
    }

    return prisma.mutation.createUser({ data: args.data }, info)
  },
  async deleteUser(parent, args, { prisma }, info) {
    const userExists = await prisma.exists.User({ id: args.id })

    if (!userExists) {
      throw new Error("User not found");
    }

    return prisma.mutation.deleteUser({
      where: {
        id: args.id
      }
    }, info)
  },
  updateUser(parent, args, { db }, info) {
    //Example of use of desctructuring the args parameter
    const { id, data } = args;
    const user = db.users.find((user) => user.id === id)

    if (!user) {
      throw new Error("User not found");
    }

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some((user) => user.email === data.email)

      if (emailTaken) {
        throw new Error("Email taken")
      }
      user.email = data.email
    }

    if (typeof data.name === 'string') {
      user.name = data.name
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age
    }

    return user
  },
  createPost(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some((user) => user.id === args.data.author);

    if (!userExists) {
      throw new Error("User not found");
    }

    const post = {
      id: uuidv4(),
      ...args.data,
    };

    db.posts.push(post);

    if(args.data.published){
      pubsub.publish('post', { 
        post: {
          mutation: 'CREATED',
          data: post
        }
      })
    }

    return post;
  },
  deletePost(parent, args, { db, pubsub }, info) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id);

    if (postIndex === -1) {
      throw new Error("Post not found");
    }

    // Array destructuring, grab the first item, so we can do post instead
    // of doing deletedPost[0]
    const { deletedPost } = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter((comment) => comment.post !== args.id);

    if (deletedPost.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'DELETE',
          data: deletedPost
        }
      })
    }

    return deletedPost;
  },
  updatePost(parent, args, { db, pubsub }, info) {
    const { id, data } = args
    const post = db.posts.find((post) => post.id === id)
    const oldPost = { ...post }

    if (!post) {
      throw new Error("Post not found");
    }

    if (typeof data.title === 'string') {
      post.title = data.title
    }

    if (typeof data.body === 'string') {
      post.body = data.body
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published

      if (oldPost.published && !post.published){
        // deleted
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: oldPost
          }
        })

      } else if (!oldPost.published && post.published) {
        // created
        pubsub.publish('post', {
          post: {
            mutation: 'CREATED',
            data: post
          }
        })

      } 

    } else if (post.published) {
      // updated
      pubsub.publish('post', {
        post: {
          mutation: 'UPDATED',
          data: post
        }
      })
    }

    return post
  },
  createComment(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some((user) => user.id === args.data.author);
    const postExists = db.posts.some(
      (post) => post.id === args.data.post && post.published === true
    );

    if (!userExists || !postExists) {
      throw new Error("Unable to find user and post");
    }

    const comment = {
      id: uuidv4(),
      ...args.data,
    };

    db.comments.push(comment);

    //Implements subscription publish
    pubsub.publish(`comment ${args.data.post}`, {
      comment: {
        mutation: 'CREATED',
        data: comment
      }
    })

    return comment;
  },
  deleteComment(parent, args, { db, pubsub }, info) {
    const commentIndex = db.comments.findIndex(
      (comment) => comment.id === args.id
    );

    if (commentIndex === -1) {
      throw new Error("Comment not found");
    }

    // Array destructuring, grab the first item
    const { deletedComment } = db.comments.splice(commentIndex, 1);

    pubsub.publish(`comment ${deletedComment.post}`, {
      comment: {
        mutation: 'DELETED',
        data: deletedComment
      }
    })

    return deletedComment;
  },
  updateComment(parent, args, { db, pubsub }, info) {
    const { id, data } = args;
    const comment = db.comments.find((comment) => comment.id === id)

    if(!comment) {
      throw new Error("Comment not found");
    }

    if (typeof data.text === 'string') {
      comment.text = data.text
    }

    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: 'UPDATED',
        data: comment
      }
    })

    return comment
  }
};

export { Mutation as default };
