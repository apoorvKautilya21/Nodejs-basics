const express = require('express');

const app = express();

// Method 1: THROWING an error (Express automatically catches it)
app.get('/getUser', (req, res) => {
  throw new Error('This is a test error');
  
  console.log('This won\'t be printed');
});

// Method 2: MANUALLY calling next(err) to trigger error middleware
app.get('/getUser2', (req, res, next) => {
  const error = new Error('Manual error using next()');
  next(error); // Explicitly passing error to error middleware
  
  console.log('This won\'t be printed either');
});

// Method 3: Async errors need to be caught and passed to next()
app.get('/getUser3', async (req, res, next) => {
  try {
    // Simulating an async operation that fails
    await new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('Async error')), 100);
    });
    res.send('Success');
  } catch (error) {
    next(error); // Must manually pass async errors to next()
  }
});

// Method 4: What happens if you DON'T handle async errors properly
app.get('/getUser4', async (req, res, next) => {
  // This will trigger error middleware - it will cause unhandled promise rejection
  await new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Unhandled async error')), 100);
  });
  res.send('Success');
});

// ERROR MIDDLEWARE (must have 4 parameters: err, req, res, next)
app.use((err, req, res, next) => {
  console.log('Error caught by middleware:', err.message);
  console.log('Route that caused error:', req.path);
  res.status(500).send({
    error: 'Something went wrong',
    message: err.message,
    path: req.path
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

// Test routes:
// GET /getUser   - throws error (auto-caught by Express)
// GET /getUser2  - calls next(err) manually
// GET /getUser3  - async error properly handled
// GET /getUser4  - async error NOT handled (will cause unhandled rejection)
// GET /wrong-way - shows what happens when you try to pass multiple params
// GET /correct-way1 - using req object
// GET /correct-way2 - using res.locals
// GET /correct-way3 - using closure
// GET /correct-way4 - using multiple middleware