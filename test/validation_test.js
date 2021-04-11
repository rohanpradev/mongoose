const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it("Requires a user's to have a name", (done) => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required');
    done();
  });

  it("Requires a user's name to be longer than 2 characters", (done) => {
    const user = new User({ name: 'te' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters');
    done();
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Al' });
    user.save().catch((validationResult) => {
      const { message } = validationResult.errors.name;
      assert(message === 'Name must be longer than 2 characters');
      done();
    });
  });
});
