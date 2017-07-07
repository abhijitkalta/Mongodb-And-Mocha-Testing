const expect = require('chai').expect;
const User = require('../src/user').User;

describe('Creating Records', function() {

  it('saves a user', (done) => {
    const abh = new User({
      name: 'Abhijit'
    });

    abh.save()
      .then((value) => {
        expect(abh.isNew).to.equal(false);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
