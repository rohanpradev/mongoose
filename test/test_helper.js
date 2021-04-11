const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });

beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
