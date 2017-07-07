"use strict";
const expect = require('chai').expect;
const User = require('../src/user').User;


describe('Update Users', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({
      name: 'Joe',
      likes: 0
    });

    joe.save()
      .then((value) => done());
  });

  it('should update a instance - update', (done) => {
    joe.update({
        name: 'abhijit'
      })
      .then((value) => {
        return User.find({});
      })
      .then((users) => {
        expect(users[0].name).to.equal('abhijit');
        done();
      })
  });

  it('should update an instance - set and save', (done) => {
    joe.set('name', 'abhijit');
    joe.save()
      .then((value) => {
        return User.find({});
      })
      .then((users) => {
        expect(users[0].name).to.equal('abhijit');
        done();
      })
  });


  it('should update a user model - update', (done) => {
    User.update({
        name: 'Joe'
      }, {
        name: 'abhijit'
      })
      .then((value) => {
        return User.find({});
      })
      .then((users) => {
        expect(users[0].name).to.equal('abhijit');
        done();
      })
  });

  it('should update a user model - findOneAndUpdate', (done) => {
    User.findOneAndUpdate({
        name: 'Joe'
      }, {
        name: 'abhijit'
      })
      .then((value) => {
        return User.find({});
      })
      .then((users) => {
        expect(users[0].name).to.equal('abhijit');
        done();
      })
  });

  it('should update a user model - findByIdAndUpdate', (done) => {
    User.findByIdAndUpdate(joe._id, {
        name: 'abhijit'
      })
      .then((value) => {
        return User.find({});
      })
      .then((users) => {
        expect(users[0].name).to.equal('abhijit');
        done();
      })
  });

  it('should incremeent postCount by 1', (done) => {
    User.update({
        name: 'Joe'
      }, {
        $inc: {
          likes: 1
        }
      })
      .then((value) => {
        return User.find({
          name: 'Joe'
        });
      })
      .then((users) => {
        expect(users[0].likes).to.equal(1);
        done();
      })
      .catch((err) => {
        console.log(done(err));
      })
  })
});
