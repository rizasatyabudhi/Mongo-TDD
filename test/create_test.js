const assert = require("assert");
const User = require("../src/user");

describe("Creating Records", () => {
  it("saves a user", done => {
    const joe = new User({ name: "Joe" });
    joe.save().then(() => {
      // isNew will check if joe is already in database or not
      // we have to produce TRUE inside assert
      assert(!joe.isNew);
      done();
    });
  });
});
