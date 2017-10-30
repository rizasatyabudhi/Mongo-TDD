const assert = require("assert");
const mongoose = require("mongoose");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");
const Comment = require("../src/comment");

describe("Associations", () => {
  let joe, comment, blogPost;
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({ title: "Js is Great", content: "It really is!" });
    comment = new Comment({ content: "This is a great post!!" });

    ///////////// HAS MANY RELATIONSHIP /////////////
    // joe has a collection of blogPosts (must be the same as in the User schema), and insert new post which is blogPost
    joe.blogPosts.push(blogPost);

    // blogPost has a collection of comments (must be the same as in the blogPost schema), and insert new comment which is comment
    blogPost.comments.push(comment);

    ///////////// HAS ONE RELATIONSHIP /////////////
    // comment has one user, which is joe
    comment.user = joe;

    // we need to save those instances first before running the test
    // we use Promise.all to combine all promise so they only have 1 "done()"
    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it("saves a relation between a user and a blogpost", done => {
    User.findOne({ name: "Joe" })
      .populate("blogPosts")
      .then(user => {
        assert(user.blogPosts[0].title === "Js is Great");
        done();
      });
  });

  it("saves a full relation graph", done => {
    User.findOne({ name: "Joe" })
      // to populate the associated blogPost with User
      // must be the same as the field in User model schema
      // path == associated field
      .populate({
        path: "blogPosts",
        populate: {
          path: "comments",
          model: "comment",
          populate: {
            path: "user",
            model: "user"
          }
        }
      })
      .then(user => {
        assert(user.name === "Joe");
        assert(user.blogPosts[0].title === "Js is Great");
        assert(user.blogPosts[0].comments[0].content === "This is a great post!!");
        assert(user.blogPosts[0].comments[0].user.name === "Joe");
        done();
      });
  });
});
