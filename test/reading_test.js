const assert = require("assert");
const User = require("../src/user");

describe("Reading User out of the database", () => {
  let joe;

  // we have to create a new instance (joe) first before we test it
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    alex = new User({ name: "Alex" });
    maria = new User({ name: "Maria" });
    zach = new User({ name: "Zach" });

    Promise.all([joe.save(), alex.save(), maria.save(), zach.save()]).then(() =>
      done()
    );
  });

  /////////////////////// MODEL ////////////////////////////
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

  it("can skip and limit the result test", done => {
    User.find({})
      // sort the name in ascending (1), descending (-1)
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users.length === 2);
        assert((users[0].name = "Alex"));
        assert((users[1].name = "Maria"));
        done();
      });
  });
});
