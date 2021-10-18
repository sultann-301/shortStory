const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema({
  title: String,
  author: String, //userID ba3dein
  story: String,
});
module.exports = mongoose.model("Story", storySchema);
