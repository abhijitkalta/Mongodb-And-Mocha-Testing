const expect = require('chai').expect;
const User = require('../src/user').User;

describe('Validation tests', () => {
  it('vaidate a name', (done) => {
    const user = new User({
      name: undefined
    });
    const validationResult = user.validateSync();
    const message = validationResult.errors.name.message;
    expect(message).to.equal('Name is required');
    done();
  });

  it('sould have a name greater than 2 characters', (done) => {
    const user = new User({
      name: 'ab'
    });
    const validationResult = user.validateSync();
    const message = validationResult.errors.name.message;
    expect(message).to.equal('Name should be greater than 2 characters');
    done();
  });

  it('should disallow an invalid record', (done) => {
    const user = new User({
      name: 'al'
    });
    user.save()
      .then((value) => {
        done();
      })
      .catch((validationResult) => {
        const message = validationResult.errors.name.message;
        expect(message).to.equal('Name should be greater than 2 characters');
        done();
      })
  });
})
