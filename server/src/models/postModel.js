// import mongoose from 'mongoose';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
    source: String,
    tag: String,
    title: String,
    image: String,
    text: String
});

module.exports = mongoose.model('Post', Post);
