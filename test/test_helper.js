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
beforeEach(done => {
  mongoose.connection.collections.users.drop(() => {
    // Ready to run next test
    done();
  });
});
