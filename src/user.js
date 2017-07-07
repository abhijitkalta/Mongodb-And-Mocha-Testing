const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = require('./post');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name should be greater than 2 characters'
    }
  },
  likes: Number,
  posts: [PostSchema],
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost' // model name
  }]
});

UserSchema.virtual('postCount').get(function() { //present in code or mongoose but not in the actual mongo database
  return this.posts.length;
});

UserSchema.pre('remove', function(next) { // no arrow function in order to access this . this represents the model instance. this === joe joe
  const BlogPost = mongoose.model('blogPost'); // to remove cyclic dependency
  BlogPost.remove({
      _id: {
        $in: this.blogPosts // to access array elements
      }
    })
    .then(() => next());
});

const User = mongoose.model('user', UserSchema); // user is the model name . and collection name is models. If camelcase is used, its normalised to simple case by mongo

module.exports = {
  User
};
