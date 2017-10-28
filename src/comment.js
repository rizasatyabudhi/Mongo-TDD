const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,

    // must be the same as the name of the "user" model
    ref: "user"
  }
});

const Comment = mongoose.model("comment", CommentsSchema);
module.exports = Comment;
