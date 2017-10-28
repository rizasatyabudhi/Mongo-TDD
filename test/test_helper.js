const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// we tell mocha to run test AFTER mongoose has been successfully connected
before(done => {
  mongoose.connect("mongodb://localhost/users_test");
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", error => console.warn("warning", error));
});

// we clear our list of user BEFORE we run test
// all collections will be lowered case by mongoose
beforeEach(done => {
  const { users, blogposts, comments } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
