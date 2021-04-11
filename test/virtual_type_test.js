const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
  it('Postcount return number of posts', (done) => {
    const joe = new User({ name: 'Joe', posts: [{ title: 'New post!!' }, { title: 'Second post!' }] });
    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 2);
        done();
      });
  });
});
