const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  let joe;
  it('Saves a User', (done) => {
    try {
      joe = new User({ name: 'Joe' });
    } catch (err) {
      console.log('Failed to create instance', err);
    }

    joe.save().then(() => {
      assert(!joe.isNew);
      done();
    });
  });
});
