const expect = require('chai').expect;
const User = require('../src/user').User;

describe('Subdocument tests', () => {

  it('should have a nested post', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{
        title: 'Posts title'
      }]
    });

    joe.save()
      .then((value) => {
        return User.findOne({
          name: 'Joe'
        })
      })
      .then((users) => {
        expect(users.posts[0].title).to.equal('Posts title');
        done();
      })
  });

  it('should add a new post', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe.save()
      .then((value) => {
        return User.findOne({
          name: 'Joe'
        });
      })
      .then((user) => {
        user.posts.push({
          title: 'New Post'
        });
        return user.save();
      })
      .then((value) => {
        return User.findOne({
          name: 'Joe'
        });
      })
      .then((value) => {
        expect(value.posts[0].title).to.equal('New Post');
        done();
      })
      .catch((err) => {
        console.log(done(err));
      })
  });

  it('should remove a post', (done) => {
    const user = new User({
      name: 'Joe',
      posts: [{
        title: 'New Post'
      }]
    });

    user.save()
      .then((value) => {
        return User.findOne({
          name: 'Joe'
        });
      })
      .then((user) => {
        user.posts[0].remove();
        return user.save();
      })
      .then((value) => {
        return User.findOne({name: 'Joe'});
      })
      .then((user) => {
        expect(user.posts).to.have.length(0);
        done();
      })
      .catch((err) => {
        done(err);
      })
  })
})
