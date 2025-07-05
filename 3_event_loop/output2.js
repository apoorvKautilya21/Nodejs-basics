const fs = require('fs');

const a = 1000;

setImmediate(() => console.log('setImmediate'));

Promise.resolve().then(() => console.log('Promise.resolve'));

fs.readFile('file.txt', () => {
  console.log('readFile');
});

setTimeout(() => console.log('setTimeout'), 0);

process.nextTick(() => console.log('process.nextTick'));

function sayHello() {
  console.log('Hello');
}

sayHello();

console.log('a', a);

// Output
/**
 * Hello
 * a 1000
 * process.nextTick
 * Promise.resolve
 * setTimeout
 * setImmediate
 * readFile
 */

/*
Following are synchronous operations:

Hello
a 1000

Rest are asynchronous operations

Followinng will come under microtask queue:

process.nextTick
Promise.resolve

setTimeout will come under Timer phase queue

setImmediate will come under Check phase queue

readFile will come under I/O phase queue

*/