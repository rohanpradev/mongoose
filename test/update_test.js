const assert = require('assert');
const User = require('../src/user');

describe('Updating Records', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save().then(() => {
      done();
    });
  });

  function assertName(operation, done, modifiedName = 'Alex') {
    operation
      .then()
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === modifiedName);
        done();
      });
  }

  it('Instance type using set and save', (done) => {
    joe.set({ name: 'Alex' });
    assertName(joe.save(), done);
  });

  it('A Model instance can update', (done) => {
    assertName(joe.updateOne({ name: 'Alex' }), done);
  });

  it('A Model class can update', (done) => {
    assertName(User.updateMany({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('A Model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('A Model class can find one record with an Id and update', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
  });

  it('A user can have a likes incremented by 1', (done) => {
    User.updateOne({ name: 'Joe' }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.likes === 1);
        done();
      });
  });
});
