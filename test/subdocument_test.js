const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const user = new User({ name: 'Joe', posts: [{ title: 'First post!!' }] });
    user
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'First post!!');
        done();
      });
  });

  it('can add subdocuments to an existing record', (done) => {
    const user = new User({ name: 'Joe', posts: [] });
    user
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'New post!!' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New post!!');
        done();
      });
  });

  it('can remove a subdocument', (done) => {
    const user = new User({ name: 'Joe', posts: [{ title: 'New post!!' }] });
    user
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
