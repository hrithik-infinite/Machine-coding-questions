// ========== PROMISES COMPLETE CHEAT SHEET & INTERVIEW GUIDE ==========

// ---------------------------------------------------------------------
// 1. BASICS - What is a Promise?
// ---------------------------------------------------------------------
/*
Promise is an object representing the eventual completion (or failure) of an asynchronous operation.

States of Promise:
- Pending
- Fulfilled (Resolved)
- Rejected
*/

// Example 1: Simple Promise
const basicPromise = new Promise((resolve, reject) => {
  let success = true;
  setTimeout(() => {
    if (success) resolve("Task Successful");
    else reject("Task Failed");
  }, 1000);
});

basicPromise.then((res) => console.log("Resolved:", res)).catch((err) => console.log("Rejected:", err));

// ---------------------------------------------------------------------
// 2. PROMISE CHAINING
// ---------------------------------------------------------------------
function asyncAdd(x) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(x + 1), 500);
  });
}

asyncAdd(1)
  .then((res) => {
    console.log(res); // 2
    return asyncAdd(res);
  })
  .then((res) => {
    console.log(res); // 3
  });

// ---------------------------------------------------------------------
// 3. PROMISE METHODS - all, allSettled, race, any
// ---------------------------------------------------------------------

const p1 = new Promise((resolve) => setTimeout(() => resolve("P1 done"), 1000));
const p2 = new Promise((resolve) => setTimeout(() => resolve("P2 done"), 2000));
const p3 = new Promise((_, reject) => setTimeout(() => reject("P3 failed"), 1500));

// Promise.all - all should succeed
Promise.all([p1, p2]).then(console.log).catch(console.error);

// Promise.allSettled - gets result of all (fulfilled/rejected)
Promise.allSettled([p1, p2, p3]).then(console.log);

// Promise.race - first to settle (resolve/reject)
Promise.race([p1, p2, p3]).then(console.log).catch(console.error);

// Promise.any - first to fulfill (ignores rejections until all fail)
Promise.any([p3, p1]).then(console.log).catch(console.error);

// ---------------------------------------------------------------------
// 4. CREATING CUSTOM PROMISE WRAPPERS
// ---------------------------------------------------------------------
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

delay(1000).then(() => console.log("Waited 1 second"));

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ data: "Sample Data" }), 1000);
  });
}

fetchData().then(console.log);

// ---------------------------------------------------------------------
// 5. PROMISE INTERVIEW QUESTIONS (TRICKY CASES)
// ---------------------------------------------------------------------

// Q1. What will be output?
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");

// OUTPUT: Start, End, Promise, Timeout
// Explanation: Microtasks (Promises) run before Macrotasks (setTimeout)

// Q2. Mixing async/await and Promises
async function demo() {
  console.log("Inside function");
  const res = await Promise.resolve("Data");
  console.log("Received:", res);
}

console.log("Before call");
demo();
console.log("After call");

// Output: Before call, Inside function, After call, Received: Data

// ---------------------------------------------------------------------
// 6. CHAINING MULTIPLE PROMISES
// ---------------------------------------------------------------------
function step1() {
  return Promise.resolve("Step 1 complete");
}

function step2(prevResult) {
  return Promise.resolve(prevResult + " -> Step 2 complete");
}

function step3(prevResult) {
  return Promise.resolve(prevResult + " -> Step 3 complete");
}

step1().then(step2).then(step3).then(console.log);

// ---------------------------------------------------------------------
// 7. ERROR HANDLING - Catch & Finally
// ---------------------------------------------------------------------
function riskyTask() {
  return new Promise((resolve, reject) => {
    Math.random() > 0.5 ? resolve("Success") : reject("Error");
  });
}

riskyTask()
  .then(console.log)
  .catch(console.error)
  .finally(() => console.log("Always runs"));

// ---------------------------------------------------------------------
// 8. CONVERT CALLBACK TO PROMISE (PROMISIFICATION)
// ---------------------------------------------------------------------
function legacyCallbackFunction(param, callback) {
  setTimeout(() => {
    if (param > 5) callback(null, "Success");
    else callback("Error", null);
  }, 500);
}

function promisifiedVersion(param) {
  return new Promise((resolve, reject) => {
    legacyCallbackFunction(param, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

promisifiedVersion(10).then(console.log).catch(console.error);

// ---------------------------------------------------------------------
// 9. ASYNC/AWAIT WITH ERROR HANDLING
// ---------------------------------------------------------------------
async function fetchWithRetry() {
  try {
    const data = await fetchData();
    console.log("Data:", data);
  } catch (error) {
    console.log("Failed to fetch:", error);
  }
}

fetchWithRetry();

// ---------------------------------------------------------------------
// 10. INTERVIEW QUESTIONS - IN-DEPTH (COMBOS)
// ---------------------------------------------------------------------

// Example: Sequential Execution using Array.reduce()
const urls = [() => Promise.resolve("Data1"), () => Promise.resolve("Data2"), () => Promise.resolve("Data3")];

urls.reduce((chain, fetcher) => {
  return chain.then(fetcher).then(console.log);
}, Promise.resolve());

// Example: Parallel Fetch with .map() and Promise.all()
const fetchTasks = [1, 2, 3].map((i) => fetchData().then((res) => `${i}: ${res.data}`));

Promise.all(fetchTasks).then(console.log);

// ---------------------------------------------------------------------
// 11. TIMEOUT HANDLING - CANCEL A PROMISE
// ---------------------------------------------------------------------
function fetchWithTimeout(promise, timeout) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject("Timeout"), timeout);
  });

  return Promise.race([promise, timeoutPromise]);
}

fetchWithTimeout(fetchData(), 500).then(console.log).catch(console.error);

// ---------------------------------------------------------------------
// 12. PROMISE POLYFILL (BONUS - INTERVIEW GOLD)
// ---------------------------------------------------------------------
function CustomPromise(executor) {
  let onResolve, onReject;
  let isFulfilled = false,
    isRejected = false,
    value;

  function resolve(val) {
    isFulfilled = true;
    value = val;
    if (onResolve) onResolve(value);
  }

  function reject(reason) {
    isRejected = true;
    value = reason;
    if (onReject) onReject(value);
  }

  this.then = function (callback) {
    onResolve = callback;
    if (isFulfilled) onResolve(value);
    return this;
  };

  this.catch = function (callback) {
    onReject = callback;
    if (isRejected) onReject(value);
    return this;
  };

  executor(resolve, reject);
}

// Example usage
new CustomPromise((resolve, reject) => {
  setTimeout(() => resolve("CustomPromise Worked!"), 1000);
})
  .then(console.log)
  .catch(console.error);
