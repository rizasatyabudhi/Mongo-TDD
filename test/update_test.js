const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    // find ({}) means return ALL instance , without any criteria
    operation.then(() => User.find({})).then(users => {
      assert(users.length === 1);
      assert(users[0].name === "Alex");
      done();
    });
  }

  /////////////////////// INSTANCE ////////////////////////
  it("INSTANCE type using set and save", done => {
    // set "name" property into "Alex"
    // set is best when we want to update a couple of different properties but in different steps
    // joe.set
    joe.set("name", "Alex");
    assertName(joe.save(), done);
  });

  it("INSTANCE can update", done => {
    // joe.update
    assertName(joe.update({ name: "Alex" }), done);
  });

  /////////////////////// MODEL ////////////////////////////
  it("MODEL class can update", done => {
    // 1st Param = find all record with given criteria (selector)
    // 2nd Param = update all selected record into the criteria
    // rename all Joe into Alex
    assertName(User.update({ name: "Joe" }, { name: "Alex" }), done);
  });

  it("MODEL class can update one record", done => {
    // usually used for unique record (email)
    assertName(User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }), done);
  });

  it("MODEL class can find record with an ID and update", done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
  });

  xit("A user can have their postCount incremented by 1 ", done => {
    User.update({ name: "Joe" }, { $inc: { postCount: 1 } })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.postCount === 1);
        done();
      });
  });
});
