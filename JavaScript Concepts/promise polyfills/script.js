// Creating a resolved Promise with a function as a value
const a = Promise.resolve(() => console.log("resolve1"));
console.log(a); // Logs: Promise {<fulfilled>: ƒ} (contains a function)

a.then((x) => {
  x(); // Executes the function inside the resolved Promise, logging "resolve1"
});

// ============================
// Polyfill for Promise
// ============================

// Creating standard Promises
let pa = new Promise((resolve, reject) => resolve("This promise resolves"));
let p2 = new Promise((resolve, reject) => reject("This promise rejects"));

pa.then((data) => console.log(data)); // Output - This promise resolves

p2.catch((err) => console.log(err)); // Output - This promise rejects

// ============================
// Custom Promise Implementation (Basic)
// ============================
function customPromise(cb) {
  let onResolve, onReject;

  // Define the `then` method to handle resolved promises
  this.then = function (callback) {
    onResolve = callback;
    return this; // Return `this` to allow method chaining
  };

  // Define the `catch` method to handle rejected promises
  this.catch = function (callback) {
    onReject = callback;
    return this; // Return `this` to allow method chaining
  };

  // Define the `resolve` function to be called when the promise is resolved
  function resolve(data) {
    onResolve(data); // Call the resolve callback with the resolved data
  }

  // Define the `reject` function to be called when the promise is rejected
  function reject(err) {
    onReject(err); // Call the reject callback with the rejection error
  }

  // Execute the callback function passed to the customPromise constructor
  cb(resolve, reject);
}

// Testing customPromise
try {
  // Create a customPromise that resolves after 1 second
  let p3 = new customPromise((resolve, reject) => setTimeout(() => resolve("Resolved"), 1000));
  p3.then((data) => console.log(data)); // Logs "Resolved" after 1 sec

  // Create a customPromise that resolves immediately
  let p4 = new customPromise((resolve, reject) => resolve("New Res"));
  p4.then((data) => console.log(data)); // Logs "New Res" immediately
} catch (e) {
  console.warn(e); // Catch and log any errors that occur during execution
}

// ============================
// Improved Custom Promise Implementation (Handles Multiple Calls)
// ============================
function customPromise2(cb) {
  let onResolve, onReject;
  let fulfilled = false, // Keeps track of whether the promise is fulfilled
    called = false, // Ensures the callback is called only once
    rejected = false, // Keeps track of whether the promise is rejected
    value; // Stores the resolved/rejected value

  // Define the `then` method to handle resolved promises
  this.then = function (callback) {
    onResolve = callback;
    if (fulfilled && !called) {
      called = true;
      onResolve(value); // If already resolved, call the callback immediately
    }
    return this; // Return `this` to allow method chaining
  };

  // Define the `catch` method to handle rejected promises
  this.catch = function (callback) {
    onReject = callback;
    if (rejected && !called) {
      called = true;
      onReject(value); // If already rejected, call the callback immediately
    }
    return this; // Return `this` to allow method chaining
  };

  // Define the `resolve` function to be called when the promise is resolved
  function resolve(data) {
    fulfilled = true;
    value = data;
    if (typeof onResolve === "function") {
      onResolve(data); // Call the resolve callback with the resolved data
      called = true; // Mark the callback as called
    }
  }

  // Define the `reject` function to be called when the promise is rejected
  function reject(err) {
    rejected = true;
    value = err;
    if (typeof onReject === "function") {
      onReject(err); // Call the reject callback with the rejection error
      called = true; // Mark the callback as called
    }
  }

  try {
    cb(resolve, reject); // Execute the callback function passed to the customPromise2 constructor
  } catch (e) {
    reject(e); // Handle synchronous errors by rejecting the promise
  }
}

// Testing customPromise2
let p5 = new customPromise2((resolve, reject) => setTimeout(() => resolve("Resolved 3"), 1000));
p5.then((data) => console.log(data)); // Logs "Resolved 3" after 1 sec

let p6 = new customPromise2((resolve, reject) => resolve("New Resaaaa"));
p6.then((data) => console.log(data)); // Logs "New Resaaaa" immediately

// ============================
// Understanding Execution Order
// ============================

const promise1 = new customPromise2((resolve, reject) => {
  console.log(1); // Logs 1 immediately
  setTimeout(() => {
    resolve(2); // Resolves after 1 second
  }, 1000);
  console.log(3); // Logs 3 immediately
});

// Logs order: 1 -> 3 -> (after 1 sec) 2
promise1.then((res) => {
  console.log(res); // Logs 2 after 1 second
});
