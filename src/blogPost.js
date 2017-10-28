const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,

  // this is to create relation between BlogPost model & Comments model
  comments: [
    {
      type: Schema.Types.ObjectId,
      // ref will be matched with the comment's model name
      ref: "comment"
    }
  ]
});

const BlogPost = mongoose.model("blogPost", BlogPostSchema);
module.exports = BlogPost;
