const fs = require('fs');

setImmediate(() => {
  console.log('1st setImmediate');
});

setTimeout(() => {
  console.log('1st timer expired');
}, 0);

Promise.resolve("promise").then(console.log);

fs.readFile('file.txt', 'utf-8', (err, data) => {
  console.log('readFile', data);
});

process.nextTick(() => {
  console.log('process.nextTick')
  process.nextTick(() => console.log('2nd process.nextTick'));
});

console.log('End of file');

// Output
/**
 * End of file
 * process.nextTick
 * 2nd process.nextTick
 * promise
 * 1st timer expired
 * 1st setImmediate
 * readFile This is the content of the file.
 */

// process.nextTick callbacks have a higher priority than other asynchronous operations. This means that if you have nested   callbacks, the inner   callback will be executed before the outer one.
