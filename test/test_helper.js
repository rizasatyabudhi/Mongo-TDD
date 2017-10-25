const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/users_test");
mongoose.connection
  .once("open", () => console.log("Good to Go!"))
  .on("error", error => console.warn("warning", error));
