const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = require("./post_schema");

//////////////// SCHEMA CREATION ////////////////////
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
  // Create Sub-Document of PostSchema (nested inside User Schema)
  posts: [PostSchema],
  likes: Number,
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "blogPost"
    }
  ]
});

// ///////////// VIRTUAL PROPERTY CREATION ////////////
UserSchema.virtual("postCount").get(function() {
  // "this" refers to model INSTANCE that we are working on
  // we have to use function(), don't use ()=>{}
  return this.posts.length;
});

//// MIDDLEWARE /////
// When we delete User, we want to delete all associated blogPost and comment also, so we use middleware
// remove | save | validate
// pre = before the action
// post = after the action
UserSchema.pre("remove", function(next) {
  const BlogPost = mongoose.model("blogPost");

  // go through all the records in BlogPost collection,
  // look at the _id, if the id is $in this.blogPosts,
  // then remove those records
  // next() to ommit the next middleware
  BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => next());
});

///////////////// MODEL CREATION /////////////////////
// 1st param = name of our model
// 2nd param = the model will follow what schema's structure
const User = mongoose.model("user", UserSchema);
module.exports = User;
