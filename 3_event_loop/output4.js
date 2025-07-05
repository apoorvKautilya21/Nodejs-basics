setImmediate(() => {
  console.log('1st setImmediate');
  setImmediate(() => console.log('2nd setImmediate expired'));
});

setTimeout(() => {
  console.log('1st timer expired');
  setTimeout(() => console.log('2nd timer expired'), 0);
}, 0);

// Output
/**
 * 
 * 1st timer expired
 * 1st setImmediate
 * 2nd setImmediate expired
 * 2nd timer expired
 * 
 */

/*
This new timer goes to the next event loop iteration
This new setImmediate goes to the same event loop iteration
*/

/*
Key Takeaways:
1. setTimeout(0) vs setImmediate: setTimeout has priority in the event loop
2. Nested setImmediate: Executes in the same event loop iteration
3. Nested setTimeout: Waits for the next event loop iteration

This behavior demonstrates the intricate timing of Node.js's event-driven architecture!
*/