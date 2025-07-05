const mongoose = require('mongoose');

const URI = 'mongodb+srv://apoorvMongo:1U3zu6TZ6IlfDHuK@nodecluster01.urtbvyx.mongodb.net/HelloWorld'

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
  } catch (error) {
    console.log('Error connecting to MongoDB', error);
  }
}

module.exports = connectDB;