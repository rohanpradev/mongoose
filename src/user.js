const mongoose = require('mongoose');
const PostSchema = require('./post');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters',
    },
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  posts: [PostSchema],
  likes: {
    type: Number,
    default: 0,
  },
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blogPost',
    },
  ],
});

UserSchema.virtual('postCount').get(function () {
  return this.posts.length;
});

UserSchema.pre('remove', function (next) {
  const BlogPost = mongoose.model('blogPost');
  BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
