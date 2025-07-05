console.log('global', global); // original global object
console.log('this', this); // not a global object for Node
console.log('globalThis', globalThis); // original global object for both browser and Node

console.log(globalThis === global) // true
