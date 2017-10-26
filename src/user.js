const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema creation
const UserSchema = new Schema({
  name: String,
  postCount: Number
});
// 1st param = name of our model
// 2nd param = the model will follow what schema's structure
const User = mongoose.model("user", UserSchema);
module.exports = User;
