// Closures, Scope, Shadowing & Patterns Master File
// ==================================================

// 🌐 Global Scope Example
var name = "Hrithik"; // Global scope

function local() {
  // No local 'name', so it accesses the global 'name'
  console.log(name); // Hrithik
}
local();

// Q1: What if we add `var name = "Local"` inside `local()`? (Shadowing)

// ==================================================
// 🔗 Closure Formation Example 1

function subscribe() {
  var name = "Agarwal"; // Local scope in subscribe()

  function displayName() {
    // Closure: remembers 'name' from its outer 'subscribe'
    console.log(name);
  }
  displayName(); // "Agarwal"
}
subscribe();

// Q2: What does 'displayName()' close over?
// Ans: It closes over 'name' from 'subscribe' scope.

// ==================================================
// 🔗 Closure Returning Function

function makeFcn() {
  var name = "Mozilla"; // Closure formed here
  return function displayName() {
    console.log(name); // Mozilla
  };
}
makeFcn()(); // Immediately invokes the returned function

// ==================================================
// 🧮 Multi-level Closure Example

const e = 10; // Global scope
function sum(a) {
  return function (b) {
    return function (c) {
      return function (d) {
        return a + b + c + d + e; // Closures over a, b, c, d, e
      };
    };
  };
}
console.log(sum(1)(2)(3)(4)); // 20

// Q3: What makes this a closure chain?
// Ans: Each function forms a closure over its parent’s scope.

// ==================================================
// 🧑‍💻 Shadowing Example

let count = 0;
(function printCount() {
  if (count === 0) {
    let count = 1; // Block scope shadowing
    console.log(count); // 1 (inner count)
  }
  console.log(count); // 0 (outer count)
})();

// ==================================================
// 🏗️ Closure as Function Factory

function createBase(baseNum) {
  return function (numToBeAdded) {
    console.log(baseNum + numToBeAdded); // Closure over 'baseNum'
  };
}
const addSix = createBase(6);
addSix(10); // 16
addSix(21); // 27

// ==================================================
// ⚡ Time Optimization Without Closure

function time(index) {
  let arr = [];
  for (let i = 0; i < 10_000_000; i++) {
    arr[i] = i * i;
  }
  console.log(arr[index]);
}
console.time("fcn1");
time(6);
time(50);
console.timeEnd("fcn1");

// ==================================================
// ⚡ Time Optimization With Closure (Memoization)

function time2() {
  let arr = [];
  for (let i = 0; i < 10_000_000; i++) {
    arr[i] = i * i;
  }
  return function (index) {
    console.log(arr[index]);
  };
}
console.time("fcn2");
const closure = time2();
closure(6);
closure(50);
console.timeEnd("fcn2");

// ==================================================
// ⏲️ Closures in Loop - var vs let

function q6() {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), i * 1000);
  }
} // Prints 3 3 3 due to 'var' function scope

function q7() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), i * 1000);
  }
} // Prints 0 1 2 because 'let' creates block scope

// q6();
// q7();

// Fixing 'var' using Closure
function q8() {
  for (var i = 0; i < 3; i++) {
    (function (i) {
      setTimeout(() => console.log(i), i * 1000);
    })(i);
  }
}
// q8();

// ==================================================
// 🔒 Private Counter using Closure

function counter() {
  let _counter = 0;
  return {
    add: function (num) {
      _counter += num;
    },
    get: function () {
      return _counter;
    }
  };
}
const ctr = counter();
ctr.add(10);
console.log("Counter get: ", ctr.get()); // 10

// ==================================================
// 📦 Module Pattern using Closure

var Module = (function () {
  function privateMethod() {
    console.log("I am private");
  }
  return {
    publicMethod: function () {
      console.log("I am public");
      privateMethod(); // Accessible
    }
  };
})();
Module.publicMethod();
// Module.privateMethod(); // Error

// ==================================================
// 🔁 Once Polyfill using Closure

function once(fn) {
  let result;
  return function (...args) {
    if (fn) {
      result = fn.apply(this, args);
      fn = null;
    }
    return result;
  };
}
const helloOnce = once(() => console.log("Hello"));
helloOnce();
helloOnce(); // Won't run

// ==================================================
// 🔗 Advanced: Memoize Polyfill using Closure

function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (!(key in cache)) {
      cache[key] = fn(...args);
    }
    return cache[key];
  };
}
const slowMultiply = (a, b) => {
  for (let i = 0; i < 10000000; i++); // Simulate heavy work
  return a * b;
};
const fastMultiply = memoize(slowMultiply);
console.time("First");
console.log(fastMultiply(5, 5)); // Slow
console.timeEnd("First");
console.time("Second");
console.log(fastMultiply(5, 5)); // Fast
console.timeEnd("Second");

// ==================================================
// 🌊 Closure Pitfall (Reference vs Value)

function outer() {
  const arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push(() => console.log(i)); // Closure over i (reference)
  }
  return arr;
}
const funcs = outer();
funcs[0](); // 3
funcs[1](); // 3
funcs[2](); // 3

// Q4: How to fix it using closure?
// Ans: Capture 'i' value directly
function outerFixed() {
  const arr = [];
  for (var i = 0; i < 3; i++) {
    (function (x) {
      arr.push(() => console.log(x));
    })(i);
  }
  return arr;
}
const fixedFuncs = outerFixed();
fixedFuncs[0](); // 0
fixedFuncs[1](); // 1
fixedFuncs[2](); // 2

// ==================================================
// 📜 Interview Quick Quiz (All closures)

console.log(`
Interview Questions:
1. What is a closure? Give real-life example.
2. Difference between lexical scope and closure?
3. How to create private variables in JS?
4. When can closures cause memory leaks?
5. Real-world example: Implement rate limiter using closure.
6. Write a polyfill for 'once' and 'memoize'.
7. How does closure help in currying?
8. Explain closure pitfall in loops and its fix.
`);
