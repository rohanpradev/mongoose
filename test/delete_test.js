const assert = require('assert');
const User = require('../src/user');

describe('Deletes a user', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => {
      done();
    });
  });

  function assertName(operation, done, name = 'Joe') {
    operation
      .then(() => User.findOne({ name }))
      .then((user) => {
        assert(user === null);
        done();
      });
  }

  it('Delete a user by name using findOneAndDelete', (done) => {
    assertName(User.findOneAndDelete({ name: joe.name }), done);
  });

  it('Delete a user by name using findByIdAndRemove', (done) => {
    assertName(User.findByIdAndRemove(joe._id), done);
  });
});
