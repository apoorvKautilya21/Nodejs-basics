const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  }
});

// const userModel = new mongoose.model('User', userSchema);
// collection name is users
// because of the first letter being capital, mongoose will automatically make the collection name plural
// so the collection name will be users

// if you want to use a different collection name, you can do it like this
const userModel = new mongoose.model('User', userSchema, 'someCollectionName');

module.exports = userModel;
