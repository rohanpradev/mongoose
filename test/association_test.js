const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comments');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is great', content: 'Yep it really is' });
    comment = new Comment({ content: 'Congrats on a great post' });

    // Relations
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;
    // Save Relations
    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() => done());
  });

  it.only('saves a relationship between user and blogPost', (done) => {
    User.findOne({ name: 'Joe' }).then((user) => {
      console.log(user);
      done();
    });
  });
});
