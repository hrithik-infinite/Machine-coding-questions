var name = "Hrithik"; // Global scope variable

function local() {
  // Local scope: Function scope for 'local'
  console.log(name); // Will log the global 'name' variable since there's no local 'name' defined here
  // Closure is not explicitly formed here as 'local' only accesses the global scope.
}

local();

function subscribe() {
  var name = "Agarwal"; // Local scope: Function scope for 'subscribe'

  function displayName() {
    console.log(name); // Closure is created here. 'displayName' forms a closure and remembers the 'name' from 'subscribe'.
  }

  displayName(); // Logs "Agarwal" because 'displayName' uses the 'name' from its closure, not the global scope.
}

subscribe();

function makeFcn() {
  var name = "mozilla"; // Local scope: Function scope for 'makeFcn'

  function displayName() {
    console.log(name); // A closure is created when 'displayName' is returned. It remembers 'name' from 'makeFcn'.
  }

  return displayName; // 'displayName' is returned, maintaining a closure over the 'name' variable.
}

makeFcn()(); // Invokes the returned 'displayName' function, logging "mozilla" using the closure over 'name'.

// Example of closure with multiple scopes: local, outer function, and global
const e = 10; // Global scope variable

function sum(a) {
  // 'sum' creates a closure over 'a'.
  return function (b) {
    // This function creates a closure over 'a' and 'b'.
    return function (c) {
      // This function creates a closure over 'a', 'b', and 'c'.
      return function (d) {
        // This function creates a closure over 'a', 'b', 'c', and 'd'.
        return a + b + c + d + e; // Accesses variables from all scopes via closures
      };
    };
  };
}

console.log(sum(1)(2)(3)(4)); // Outputs 20. Each nested function remembers the values of 'a', 'b', 'c', and 'd' through closures.
console.log("____________");

let count = 0;
(function printCount() {
  if (count == 0) {
    let count = 1; // Shadowing: Local 'count' shadows the global 'count'
    console.log(count); // Logs 1, the locally scoped 'count'
  }
  console.log(count); // Logs 0, the globally scoped 'count'. No closure over the local 'count'.
})();
console.log("____________");

function createBase(baseNum) {
  // 'createBase' forms a closure over 'baseNum'
  return function (numToBeChanged) {
    console.log(baseNum + numToBeChanged); // This function has a closure over 'baseNum' and uses it here.
  };
}

var addSix = createBase(6);
addSix(10); // Returns 16. 'addSix' remembers 'baseNum' (6) through the closure.
addSix(21); // Returns 27. Same closure over 'baseNum' (6) is used here.
console.log("____________");
console.log("Time optimization without closure");

function time(index) {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }
  console.log(a[index]); // Each call to 'time' creates a new array 'a', no closure involved.
}
console.time("6");
time(6); // Measure time for the 6th index
console.timeEnd("6");
console.time("50");
time(50); // Measure time for the 50th index
console.timeEnd("50");

console.log("____________");
console.log("Time optimization with closure");

function time2() {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }
  return function (index) {
    console.log(a[index]); // This function forms a closure over the precomputed array 'a', reusing it for multiple calls.
  };
}

const closure = time2(); // 'closure' maintains access to the array 'a' through the closure.
console.time("6");
closure(6); // Faster since 'a' is already computed and accessed via closure.
console.timeEnd("6");
console.time("50");
closure(50); // Faster since 'a' is already computed and accessed via closure.
console.timeEnd("50");

console.log("____________");
// Block scope and setTimeout using 'var'
function q6() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i); // Due to 'var' being function-scoped, this logs 3 three times. No closure effectively used here.
    }, i * 1000);
  }
}
// q6();
console.log("____________");
// Block scope and setTimeout using 'let'
function q7() {
  for (let i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i); // 'let' creates a new block scope for each iteration, so each log correctly prints 0, 1, 2
    }, i * 1000);
  }
}
// q7();

// Using 'var' but printing 0, 1, 2 with closures
function q8() {
  for (var i = 0; i < 3; i++) {
    function inner(i) {
      setTimeout(function log() {
        console.log(i); // 'inner' creates a closure over 'i', preserving its value for each iteration.
      }, i * 1000);
    }
    inner(i); // Passes the current value of 'i' to 'inner', creating a closure around it.
  }
}
// q8();

// Use closure to create a private counter
console.log("____________");
function counter() {
  var _counter = 0; // Private variable within 'counter', closure will be formed over it.

  function add(num) {
    _counter += num; // 'add' forms a closure over '_counter', allowing it to modify the private variable.
  }

  function getVal() {
    return "Counter Value: " + _counter; // 'getVal' forms a closure over '_counter', allowing it to access the private variable.
  }

  return {
    add,
    getVal,
  }; // Returns an object exposing 'add' and 'getVal', but not '_counter'.
}

const ctr1 = counter();
console.log(ctr1.getVal()); // Logs "Counter Value: 0", accessing '_counter' via closure.
ctr1.add(20); // Modifies '_counter' to 20 through the closure.
console.log(ctr1.getVal()); // Logs "Counter Value: 20", showing the updated value of '_counter'.

console.log("____________");
// Module pattern using closures for private methods

var Module = (function () {
  function privateMethod() {
    console.log("Private"); // 'privateMethod' is private within the IIFE and is not exposed, closure formed here.
  }

  return {
    publicMethod: function () {
      // Here we can call the private method
      console.log("Public");
    },
  }; // Only 'publicMethod' is exposed, 'privateMethod' is kept private.
})();
Module.publicMethod(); // Logs "Public"
try {
  Module.privateMethod(); // Error, 'privateMethod' is not accessible, showcasing closure's role in encapsulation.
} catch (e) {
  console.error(e);
}

console.log("____________");
console.log("____________");
console.log("____________");
// Once Polyfill using closure
function once(func, context) {
  let ran; // Variable to keep track if the function has run, closure will be formed over it.
  return function () {
    if (func) {
      ran = func.apply(context || this, arguments); // Executes the function once and stores the result in 'ran'.
      func = null; // Nullifies 'func' to ensure it runs only once.
    }
    return ran; // Returns the stored result from the first execution.
  };
}

const hello = () => {
  console.log("hello");
};
hello();
hello();
hello();
// The 'hello' function runs multiple times without restriction.

const helloOnce = once(hello); // Creates a closure over 'ran' and 'func', ensuring 'hello' runs only once.
helloOnce(); // Logs "hello"
helloOnce(); // Does nothing since the function is already nullified.
helloOnce(); // Does nothing since the function is already nullified.

console.log("____________");
console.log("____________");
// Memoize Polyfill using closure

const clumsyCalc = (num1, num2) => {
  for (let i = 0; i <= 100000000; i++) {} // Simulate a time-consuming calculation.
  return num1 * num2;
};
console.time("Clumsy");
clumsyCalc(100, 2); // Runs the calculation normally.
console.timeEnd("Clumsy");
console.time("Clumsy2");
clumsyCalc(100, 2); // Runs the calculation again, taking the same time.
console.timeEnd("Clumsy2");
console.log("Memoizing it");

function mymemo(fn, context) {
  const res = {}; // Object to cache results, closure will be formed over it.
  return function (...args) {
    var argsCache = JSON.stringify(args); // Serialize arguments to use as a key in the cache.
    if (!res[argsCache]) {
      res[argsCache] = fn.call(context || this, ...args); // Calculate and cache the result if not cached yet.
    }
    return res[argsCache]; // Return the cached result.
  };
}

const memizeClumsyFcn = mymemo(clumsyCalc); // Create a memoized version of 'clumsyCalc' with closure over the cache.
console.time("Clumsy3");
memizeClumsyFcn(100, 2); // Runs the calculation and caches the result.
console.timeEnd("Clumsy3");
console.time("Clumsy4");
memizeClumsyFcn(100, 2); // Returns the cached result, running much faster.
console.timeEnd("Clumsy4");
