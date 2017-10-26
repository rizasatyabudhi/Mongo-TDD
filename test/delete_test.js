const assert = require("assert");
const User = require("../src/user");

describe("Delete a user", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  /////////////////////// INSTANCE ////////////////////////
  it("model INSTANCE remove", done => {
    joe
      .remove()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  /////////////////////// MODEL ////////////////////////////
  it("CLASS method remove", done => {
    // Remove a bunch of records with some given criteria
    User.remove({ name: "Joe" })
      .remove()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("CLASS method findOneAndRemove", done => {
    // Remove the first instance that has a given criteria  (name , ID, etc)
    User.findOneAndRemove({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("CLASS method findByIdAndRemove", done => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
  // Remove the first instance that has a given ID
});
