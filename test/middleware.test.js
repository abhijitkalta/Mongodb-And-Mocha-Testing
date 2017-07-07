"use strict";
const expect = require('chai').expect;
const User = require('../src/user').User;
const BlogPost = require('../src/blogPost').BlogPost;

describe('Middleware Tests', () => {
  let joe, blogPost;
  beforeEach((done) => {
    joe = new User({
      name: 'Joe'
    });

    blogPost = new BlogPost({
      title: 'New Blog',
      content: 'qwerty'
    });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('should automatically remove blogposts', (done) => {
    joe.remove()
      .then((value) => {
        return BlogPost.count()
      })
      .then((value) => {
        expect(value).to.equal(0);
        done();
      })
  });
})
