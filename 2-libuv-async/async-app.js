const fs = require('fs');
const http = require('https');

console.log('Hello world');

var a = 100;
var b = 599;

http.get('https://dummyjson.com/products/1', (res) => {
  console.log('Fetched data successfully');
  
  // Consume the response data to properly close the connection
  res.on('data', (chunk) => {
    // Process the data if needed, or just consume it
  });
  
  res.on('end', () => {
    console.log('HTTP request completed');
  });
});

setTimeout(() => {
  console.log('setTimeout');
}, 2000);

fs.readFile('file.txt', 'utf-8', (err, data) => {
  console.log('File read successfully');
});

function multiply(a, b) {
  return a * b;
}

const c = multiply(a, b);

console.log(c);
