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

  it('saves a relationship between user and blogPost', (done) => {
    User.findOne({ name: 'Joe' })
      // Query modifier to  populate blogPosts rather than just their ObjectId
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is great');
        done();
      });
  });

  it('saves a full realtion graph', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user',
          },
        },
      })
      .then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is great');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on a great post');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      });
  });
});
