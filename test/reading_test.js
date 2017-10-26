const assert = require("assert");
const User = require("../src/user");

describe("Reading User out of the database", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  // we will always use "done" param because mongoose is async
  it("finds all users with a name of Joe", done => {
    // find ALL users with name of Joe
    User.find({ name: "Joe" }).then(users => {
      // users param = all returned user with name of Joe
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it("find a user with a particular ID", done => {
    User.findOne({ _id: joe._id }).then(user => {
      assert(user.name === "Joe");
      done();
    });
  });
});
