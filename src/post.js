const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = PostSchema;
