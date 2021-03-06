const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
  it("can create a subdocument", done => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "first post" }, { title: "second post" }]
    });
    joe.save().then(() => {
      User.findOne({ name: "Joe" }).then(user => {
        assert(user.posts[0].title === "first post");
        done();
      });
    });
  });

  it("Can add subdocument to an existing record", done => {
    const joe = new User({
      name: "Joe",
      posts: []
    });

    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        user.posts.push({ title: "New Post" });
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.posts[0].title === "New Post");
        done();
      });
  });

  it("Can remove an existing subdocument", done => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "First post" }]
    });

    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
