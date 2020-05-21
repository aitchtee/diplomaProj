const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const db = require('./config/db');
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const ObjectID = require('mongodb').ObjectID;

//* Import Model
const Post = require("./models/postModel");

//* Connect to MongoDB
mongoose.connect(
  db.url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log("MongoDB is connected")
);

//* Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//* Get all of our posts
app.get("/posts", (req, res) => {
  Post.find({}).then(posts => {
    res.send(posts);
  });
});

//* Get One of Our posts
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  Post.findOne({ _id: new ObjectID(id)}).then(post => {
    res.json(post);
  });
});

//* Create and Update post
app.post("/posts", (req, res) => {
  const data = {
    source: req.body.source,
    tag: req.body.tag,
    title: req.body.title,
    image: req.body.image,
    text: req.body.text
  };
  Post.findOne({ _id: req.body.id }, (err, post) => {
    if (post) {
      Post.findByIdAndUpdate(req.body.id, data, { upsert: false }).then(
        updated => {
          res.json(updated);
        }
      );
    } else {
      Post.create(data).then(created => {
        res.json(created);
      });
    }
  });
});

//* Delete selected post
app.post("/posts/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id).then(post => {
    res.json({ message: "Your post was deleted!" });
  });
});

app.listen(port, () => console.log("Server is running on port " + port));