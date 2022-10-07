const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect('mongodb://localhost:27017/blogDB');

const blogSchema = new mongoose.Schema({
  Title: String,
  body: String

});

const BlogPost = mongoose.model("BlogPost", blogSchema);

app.get("/", function (req, res) {
  BlogPost.find({}, function (err, blogpost) {
    res.render("home", {

      anotherBlog: blogpost

    });
  });

});

app.get("/about", function (req, res) {
  res.render("about");
})


app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {



  const blog = new BlogPost({
    Title: req.body.Title,
    body: req.body.posts
  });
  blog.save(function (err) {
    if (!err) {
      res.redirect("/");
    };
  });

});

app.get("/posts/:name", function (req, res) {
  const route = req.params.name;

  BlogPost.findOne({ Title: route }, function (err, num) {

    res.render("post", {
      getTitle: num.Title,
      getPost: num.body

    });
  });
});
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
