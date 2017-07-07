"use strict";
const expect = require('chai').expect;
const User = require('../src/user').User;
const BlogPost = require('../src/blogPost').BlogPost;
const Comment = require('../src/comment').Comment;

describe('Associations Tests', () => {
  let joe, blogPost, comment;
  beforeEach((done) => {
    joe = new User({
      name: 'Joe'
    });

    blogPost = new BlogPost({
      title: 'New Blog',
      content: 'qwerty'
    });

    comment = new Comment({
      content: 'New comment'
    });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('should  create an association between blogpost', (done) => {
    User.findOne({
        name: 'Joe'
      })
      .populate('blogPosts')
      .then((value) => {
        expect(value.blogPosts[0].title).to.equal('New Blog');
        done();
      })
  });

  it('should test the entire association graph', (done) => {
    User.findOne({
        name: 'Joe'
      })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((value) => {
        expect(value.blogPosts[0].comments[0].user.name).to.equal('Joe');
        done();
      })
  })

})
