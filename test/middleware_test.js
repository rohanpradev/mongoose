const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('MiddleWare', () => {
  let joe, blogPost;
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is great', content: 'This is awesome' });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it('users clean up dangling blogposts on remove', (done) => {
    joe
      .remove()
      .then(() => BlogPost.count())
      .then((blogCnt) => {
        assert(blogCnt === 0);
        done();
      });
  });
});
