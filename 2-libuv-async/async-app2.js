const fs = require('fs');
const https = require('https');

console.log('Start of async app');

setTimeout(() => {
  console.log('call me right now');
}, 0);

fs.readFile('file.txt', 'utf-8', (err, data) => {
  console.log('File read successfully', data);
});

https.get('https://dummyjson.com/products/1', (res) => {
  console.log('Response received');
  res.on('data', (chunk) => {
  });

  res.on('end', () => {
  });
});

function multiply(a, b) {
  return a * b;
}

console.log(multiply(2, 3));

// Output
/*
Start of async app
6
call me right now
File read successfully This is the content of the file.
Response received
*/

//  setTimeout is an asynchronous function, meaning it doesn't block the execution of the code. When you call setTimeout , the callback function is passed to Libuv Node.js's underlying library), which manages asynchronous operations.
// The callback function from setTimeout(0) is added to the event queue. However, it won't be executed until the current call stack is empty. This means that even if you specify a 0-millisecond delay, the callback will only execute after the global execution context is done.
