const fs = require('fs');

const a = 1000;

setImmediate(() => console.log('setImmediate'));
setTimeout(() => console.log('1st timer expired'), 0);
Promise.resolve().then(() => console.log('Promise.resolve'));
process.nextTick(() => console.log('process.nextTick'));

fs.readFile('file.txt', 'utf-8', (err, data) => {
  setTimeout(() => console.log('2nd timer expired'), 0);
  process.nextTick(() => console.log('2nd process.nextTick'));
  setImmediate(() => console.log('2nd setImmediate'));
  console.log('2nd readFile', data);
});

console.log('End of file');

/**
 * Output:
 * 
 * End of file
 * process.nextTick
 * Promise.resolve
 * 1st timer expired
 * setImmediate
 * 2nd readFile This is the content of the file.
 * 2nd process.nextTick
 * 2nd setImmediate
 * 2nd timer expired
 * 
 */
