const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/users_test");
mongoose.connection
  .once("open", () => console.log("Good to Go!"))
  .on("error", error => console.warn("warning", error));

// we clear our list of user BEFORE we run test
beforeEach(done => {
  mongoose.connection.collections.users.drop(() => {
    // Ready to run next test
    done();
  });
});
