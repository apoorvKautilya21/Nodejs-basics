const fs = require('fs');
const a = 1000;

setImmediate(() => console.log('setImmediate'));

fs.readFile('file.txt', () => {
  console.log('readFile');
});

setTimeout(() => console.log('setTimeout'), 0);

function sayHello() {
  console.log('Hello');
}

sayHello();

console.log('a', a);

// Output
/*
Hello
a 1000
setTimeout
setImmediate
readFile
*/