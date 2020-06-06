"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var Post = new Schema({
  source: String,
  city: String,
  tag: String,
  title: String,
  image: String,
  text: String
});
module.exports = mongoose.model('Post', Post);