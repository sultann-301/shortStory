const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Story = require("./models/storySchema");
const dbUrl = "mongodb://localhost:27017/botpad";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/shortStories", (req, res) => {
  res.render("shortStories/index");
});

app.get("/shortStories/new", (req, res) => {
  res.render("shortStories/new");
});

app.post("/shortStories", async (req, res) => {
  //console.log(req.body);
  const story = new Story({
    title: req.body.title,
    author: req.body.author,
    story: req.body.story,
  });
  await story.save();
  console.log(story);
  res.render("home", { story });
});

app.listen(3000, () => {
  console.log("oba 3000");
});
