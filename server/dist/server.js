"use strict";

var express = require("express");

var mongoose = require("mongoose");

var bodyParser = require("body-parser");

var app = express();

var db = require('./config/db');

var port = 8080;
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

var ObjectID = require('mongodb').ObjectID; //* Import Model


var Post = require("./models/postModel"); //* Connect to MongoDB


mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, function () {
  return console.log("MongoDB is connected");
}); //* Enable CORS

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); //* Get all of our posts

app.get("/posts", function (req, res) {
  Post.find({}).then(function (posts) {
    res.send(posts);
  });
}); //* Get One of Our posts

app.get("/posts/:city/:id", function (req, res) {
  var id = req.params.id;
  var city = req.params.city;
  Post.findOne({
    _id: new ObjectID(id),
    city: city
  }).then(function (post) {
    res.json(post);
  });
}); //* Get all posts from one city

app.get("/posts/:city", function (req, res) {
  var city = req.params.city;
  Post.find({
    city: city
  }).then(function (posts) {
    res.send(posts);
  });
}); //* Create or Update post

app.post("/posts", function (req, res) {
  var data = {
    source: req.body.source,
    city: req.body.city,
    tag: req.body.tag,
    title: req.body.title,
    image: req.body.image,
    text: req.body.text
  };
  Post.findOne({
    text: req.body.text
  }, function (err, post) {
    if (post) {
      Post.findByIdAndUpdate(req.body.id, data, {
        upsert: false
      }).then(function (updated) {
        res.json(updated);
      });
    } else {
      Post.create(data).then(function (created) {
        res.json(created);
      });
    }
  });
}); //* Delete selected post

app.post("/posts/:id", function (req, res) {
  Post.findByIdAndDelete(req.params.id).then(function (post) {
    res.json({
      message: "Your post was deleted!"
    });
  });
});
app.listen(port, function () {
  return console.log("Server is running on port " + port);
});