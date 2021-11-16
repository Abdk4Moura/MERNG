const { AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post"); // formerly const Post
const checkAuth = require("../../util/check-auth");

// function showAllFuncs(subject, displayDepth = 5) {
//   if (displayDepth < 1) {
//     return "[MAX_DEPTH_REACHED] -->" + subject?.toString?.();
//   }

//   let val = "";
//   if (subject === undefined || subject === null) return subject;
//   for (const key of Object.keys(subject)) {
//     val += `    \n ${subject.name}.${key}: ${
//       typeof subject[key] === "object"
//         ? showAllFuncs(subject[key], displayDepth - 1)
//         : subject[key]
//     }`;
//   }
//   return val;
// }
// console.log(showAllFuncs(Post) || null);
// console.log(Object.keys(Post._middleware));

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    sayHi() {
      return "Hello, World!";
    },
    async getPost(_, { postId }) {
      console.log("getPost");
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context /* context is third argument */) {
      const user = checkAuth(context);
      console.log(user);

      if (body.trim() === "") {
        console.log("Error: [EMPTY POST]");
        throw new Error("Post body must not be empty");
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      // context.pubsub.publish(newPost, {
      //     newPost: post
      // })

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
  },
};
