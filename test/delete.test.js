"use strict";
const expect = require('chai').expect;
const User = require('../src/user').User;

describe('Delete Users', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({
      name: 'Joe'
    });

    joe.save()
      .then((value) => done());
  });

  it('model instance remove - remove', (done) => {
    joe.remove()
      .then((value) => {
        return User.findOne({
          name: 'Joe'
        });
      })
      .then((user) => {
        expect(user).to.equal(null);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
  });

  it('class remove - remove', (done) => {
    User.remove({ name: 'Joe'})
      .then((value) => {
        return User.findOne({
          name: 'Joe'
        });
      })
      .then((user) => {
        expect(user).to.equal(null);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
  });

  it('class find one and remove - findAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Joe'})
      .then((value) => {
        return User.findOne({
          name: 'Joe'
        });
      })
      .then((user) => {
        expect(user).to.equal(null);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
  });

  it('class find by id and remove - findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then((value) => {
        return User.findOne({
          name: 'Joe'
        });
      })
      .then((user) => {
        expect(user).to.equal(null);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
  });
})
