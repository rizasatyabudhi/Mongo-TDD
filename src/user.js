const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema creation
const UserSchema = new Schema({
  name: {
    type: String,
    // required is for validation, if validation is not met, the string msg (2nd param) will show up
    required: [true, "Name is Required."],
    // validate is also for validation
    // if the validator returns false, the message will show up
    validate: {
      validator: name => name.length > 2,
      message: "Name must be longer than 2 characters"
    }
  },
  postCount: Number
});
// 1st param = name of our model
// 2nd param = the model will follow what schema's structure
const User = mongoose.model("user", UserSchema);
module.exports = User;
