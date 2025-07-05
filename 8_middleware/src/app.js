const express = require('express');

const app = express();

// Infinte loop
app.use('/user1', (req, res) => {
  console.log("User 1 call");
});

/**
 * Output:
 * Middleware 1
 * RESPONSE: Hello from middleware 1
 * Middleware 2
 * Error: Can't set headers after they are sent to the client
 */
app.use('/user2', (req, res, next) => {
  console.log('Middleware 1');
  res.send({greeting: 'Hello from middleware 1'});
  next();
}, (req, res) => {
  console.log('Middleware 2');
  res.send({greeting: 'Hello from middleware 2'});
});

// infinite loop
app.use('/user3', (req, res, next) => {
  console.log('Middleware 1');
}, (req, res) => {
  console.log('Middleware 2');
  res.send({greeting: 'Hello from middleware 2'});
});

/**
 * Output:
 * Middleware 1
 * Middleware 2
 * RESPONSE: Hello from middleware 2
 * Error: Can't set headers after they are sent to the client
 */
app.use('/user4', (req, res, next) => {
  console.log('Middleware 1');
  next();
  res.send({greeting: 'Hello from middleware 1'});
}, (req, res) => {
  console.log('Middleware 2');
  res.send({greeting: 'Hello from middleware 2'});
});

/**
 * Output:
 * Middleware 1
 * Middleware 2
 * Middleware 3
 * RESPONSE: Hello from middleware 3
 */
app.use('/user5', [
    (req, res, next) => {
      console.log('Middleware 1');
      next();
    }, (req, res, next) => {
      console.log('Middleware 2');
      next();
    }
  ], (req, res) => {
  console.log('Middleware 3');
  res.send({greeting: 'Hello from middleware 3'});
});

// If we separate the middleware, it will work
app.use('/user6', (req, res, next) => {
  console.log('Middleware 1');
  next();
});
app.use('/user6', (req, res, next) => {
  console.log('Middleware 2');
  res.send({greeting: 'Hello from middleware 2'});
});

// Lets say we will hit /user7/hello
// Output: Middleware 1, Middleware 2, RESPONSE: Hello from middleware 2
app.use('/user7/hello', (req, res, next) => {
  console.log('Middleware 1');
  next();
});

app.use('/user7', (req, res, next) => {
  console.log('Middleware 2');
  res.send({greeting: 'Hello from middleware 2'});
});

////////////////////////////////////////////////////////////
// Admin Auth middleware
app.use('/admin', (req, res, next) => {
  const token = 'xyz';
  const isAuthenticated = token === 'xyz';
  console.log('isAuthenticated', isAuthenticated);
  if (isAuthenticated) {
    next();
  } else {
    res.status(401).send({error: 'Unauthorized'});
  }
});

app.get('/admin/getData', (req, res) => {
  console.log('get data');
  res.send({greeting: 'Hello from admin get data'});
});

app.delete('/admin/deleteData', (req, res) => {
  res.send({greeting: 'Hello from admin delete data'});
});
////////////////////////////////////////////////////////////

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});