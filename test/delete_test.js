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
  it("class method remove", () => {});

  it("class method findAndRemove", () => {});

  it("class method findByIdAndRemove", () => {});
});
