const assert = require("assert");
const User = require("../src/user");

describe("Delete a user", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  // joe
  it("model instance remove", done => {
    joe
      .remove()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  // User
  it("class method remove", done => {
    // Remove a bunch of records with some given criteria
    User.remove({ name: "Joe" })
      .remove()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("class method findOneAndRemove", done => {
    // Remove the first instance that has a given criteria  (name , ID, etc)
    User.findOneAndRemove({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("class method findByIdAndRemove", done => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
  // Remove the first instance that has a given ID
});
