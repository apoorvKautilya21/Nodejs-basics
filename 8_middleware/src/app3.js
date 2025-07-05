const express = require('express');
const app = express();

// ❌ WRONG: Trying to pass multiple parameters to next()
app.get('/wrong-way', (req, res, next) => {
  const param1 = 'Hello';
  const param2 = 'World';
  
  // This will be treated as an ERROR, not as parameters!
  next(param1, param2); // Only param1 is passed as an error
}, (req, res) => {
  res.send('This won\'t execute because next() was called with parameters');
});

// ✅ CORRECT: Ways to pass data between middleware

// Method 1: Using req object to store data
app.get('/correct-way1', (req, res, next) => {
  // Store data in req object
  req.customData = {
    user: 'John',
    role: 'admin',
    timestamp: new Date()
  };
  
  next(); // Continue to next middleware
}, (req, res) => {
  // Access data from req object
  console.log('Custom data:', req.customData);
  res.send({
    message: 'Data passed successfully!',
    data: req.customData
  });
});

// Method 2: Using res.locals to store data
app.get('/correct-way2', (req, res, next) => {
  // Store data in res.locals
  res.locals.userInfo = {
    name: 'Alice',
    email: 'alice@example.com'
  };
  
  res.locals.processedAt = new Date();
  
  next(); // Continue to next middleware
}, (req, res) => {
  // Access data from res.locals
  console.log('User info:', res.locals.userInfo);
  res.send({
    message: 'Data from res.locals',
    userInfo: res.locals.userInfo,
    processedAt: res.locals.processedAt
  });
});

// Method 3: Using closures/higher-order functions
const createMiddleware = (param1, param2) => {
  return (req, res, next) => {
    req.params1 = param1;
    req.params2 = param2;
    next();
  };
};

app.get('/correct-way3', 
  createMiddleware('Hello', 'World'), // Create middleware with parameters
  (req, res) => {
    res.send({
      message: 'Parameters passed via closure',
      param1: req.params1,
      param2: req.params2
    });
  }
);

// Method 4: Multiple middleware functions
app.get('/correct-way4', 
  (req, res, next) => {
    req.step1 = 'Authentication passed';
    next();
  },
  (req, res, next) => {
    req.step2 = 'Authorization passed';
    next();
  },
  (req, res, next) => {
    req.step3 = 'Validation passed';
    next();
  },
  (req, res) => {
    res.send({
      message: 'All middleware steps completed',
      steps: {
        step1: req.step1,
        step2: req.step2,
        step3: req.step3
      }
    });
  }
);

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});