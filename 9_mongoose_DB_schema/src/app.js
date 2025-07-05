const express = require('express');
const connectDB = require('./config/database');
const app = express();
const userModel = require('./models/user');

app.post('/signup', async (req, res) => {
  try {
    const user = new userModel({
      firstName: 'Apoorv',
      lastName: 'Singh',
      emailId: 'apoorv@gmail.com',
      password: '123456',
      age: 20,
    });
    await user.save();
  
    res.send({message: 'User created successfully'});
  } catch (error) {
    res.status(500).send({message: 'Error creating user', error: error});
  }
});

connectDB()
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });