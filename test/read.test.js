const expect = require('chai').expect;
const User = require('../src/user').User;

describe('Read Users', () => {
  let joe, maria, tch, asd;
  beforeEach((done) => {
    joe = new User({
      name: 'Joe'
    });
    maria = new User({
      name: 'Maria'
    });
    tch = new User({
      name: 'tch'
    });
    asd = new User({
      name: 'Asd'
    });

    Promise.all([joe.save(), maria.save(), tch.save(), asd.save()])
      .then((value) => done());
  });

  it('should find all users by name', (done) => {
    User.find({
        name: 'Joe'
      })
      .then((value) => {
        expect(value[0]._id.toString()).to.equal(joe._id.toString());
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
  });

  it('should find the first user by name', (done) => {
    User.findOne({
        _id: joe._id
      })
      .then((value) => {
        expect(value.name).to.equal('Joe');
        done();
      })
      .catch((err) => {
        console.log(err);
      })
  })

  it('should limit and skip results', (done) => {
    User.find({})
      .sort({
        name: 1 // 1 for ascending, -1 for descending
      })
      .skip(1)
      .limit(2)
      .then((users) => {
        expect(users.length).to.equal(2);
        done();
      })
  })
})
