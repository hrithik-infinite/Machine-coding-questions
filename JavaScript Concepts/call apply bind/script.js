// ============================================================================
// ADVANCED CALL, APPLY, BIND - INTERVIEW NOTES
// ============================================================================

// Basic Setup
const obj = { firstName: "hrithik" };

function sayHello(age, location) {
  return `Hello ${this.firstName} is ${age} from ${location}`;
}

// ============================================================================
// 1. BASIC USAGE & DIFFERENCES
// ============================================================================

console.log("=== BASIC USAGE ===");

// Direct call - 'this' is undefined in strict mode, global object in non-strict
console.log("Direct call:", sayHello(24, "Mumbai"));
// Output: "Hello undefined is 24 from Mumbai"

// call() - invoke immediately with specific 'this'
console.log("call():", sayHello.call(obj, 24, "Mumbai"));
// Output: "Hello hrithik is 24 from Mumbai"

// apply() - invoke immediately with 'this' and arguments array
console.log("apply():", sayHello.apply(obj, [24, "Mumbai"]));
// Output: "Hello hrithik is 24 from Mumbai"

// bind() - returns new function with bound 'this'
const boundSayHello = sayHello.bind(obj);
console.log("bind():", boundSayHello(24, "Mumbai"));
// Output: "Hello hrithik is 24 from Mumbai"

// ============================================================================
// 2. ADVANCED BIND PATTERNS - PARTIAL APPLICATION & CURRYING
// ============================================================================

console.log("\n=== ADVANCED BIND PATTERNS ===");

// Partial application with bind
const sayHelloTo24YearOld = sayHello.bind(obj, 24);
console.log("Partial application:", sayHelloTo24YearOld("Delhi"));
// Output: "Hello hrithik is 24 from Delhi"

// Full binding (all parameters pre-filled)
const specificGreeting = sayHello.bind(obj, 25, "Bangalore");
console.log("Full binding:", specificGreeting());
// Output: "Hello hrithik is 25 from Bangalore"

// Chaining bind calls (only first 'this' binding matters)
const chainedBind = sayHello.bind(obj).bind({ firstName: "john" });
console.log("Chained bind:", chainedBind(26, "Chennai"));
// Output: "Hello hrithik is 26 from Chennai" (still uses obj, not john)

// ============================================================================
// 3. ARROW FUNCTIONS & LEXICAL 'THIS'
// ============================================================================

console.log("\n=== ARROW FUNCTIONS & LEXICAL THIS ===");

const arrowObj = {
  firstName: "Arrow",
  regularMethod: function () {
    console.log("Regular method this:", this.firstName);

    // Arrow function inherits 'this' from enclosing scope
    const arrowFunction = () => {
      console.log("Arrow function this:", this.firstName);
    };
    arrowFunction();

    // call/apply/bind have NO effect on arrow functions
    arrowFunction.call({ firstName: "Different" }); // Still uses 'this' from regularMethod
  },

  arrowMethod: () => {
    // Arrow function as method - 'this' is NOT the object!
    console.log("Arrow method this:", this?.firstName || "undefined/global");
  }
};

arrowObj.regularMethod();
arrowObj.arrowMethod();

// ============================================================================
// 4. CONSTRUCTOR FUNCTIONS & 'NEW' BINDING
// ============================================================================

console.log("\n=== CONSTRUCTOR FUNCTIONS ===");

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    return `Hi, I'm ${this.name}`;
  };
}

const person1 = new Person("Alice", 30);
console.log("Constructor binding:", person1.greet());

// Extracting method loses 'this' context
const extractedGreet = person1.greet;
console.log("Extracted method:", extractedGreet()); // undefined

// Fix with bind
const boundGreet = person1.greet.bind(person1);
console.log("Bound extracted method:", boundGreet());

// ============================================================================
// 5. EVENT HANDLERS & CALLBACK CONTEXT
// ============================================================================

console.log("\n=== EVENT HANDLERS & CALLBACKS ===");

class EventHandler {
  constructor(name) {
    this.name = name;
    this.count = 0;
  }

  // Problem: 'this' will be the DOM element in event handler
  handleClick() {
    this.count++;
    console.log(`${this.name} clicked ${this.count} times`);
  }

  // Solution 1: Arrow function (lexical this)
  handleClickArrow = () => {
    this.count++;
    console.log(`${this.name} clicked ${this.count} times`);
  };

  // Solution 2: Bind in constructor
  constructor2(name) {
    this.name = name;
    this.count = 0;
    this.handleClick = this.handleClick.bind(this);
  }
}

const handler = new EventHandler("Button");

// Simulating callback context loss
setTimeout(handler.handleClick, 100); // 'this' will be global/undefined
setTimeout(handler.handleClickArrow, 200); // 'this' preserved

// ============================================================================
// 6. FUNCTION BORROWING & METHOD DELEGATION
// ============================================================================

console.log("\n=== FUNCTION BORROWING ===");

const arrayLike = {
  0: "a",
  1: "b",
  2: "c",
  length: 3
};

// Borrow Array methods for array-like objects
const realArray = Array.prototype.slice.call(arrayLike);
console.log("Borrowed slice:", realArray); // ["a", "b", "c"]

// Modern alternative
const modernArray = Array.from(arrayLike);
console.log("Array.from:", modernArray);

// Borrowing other methods
const numbers = [1, 2, 3, 4, 5];
const max = Math.max.apply(null, numbers);
console.log("Math.max with apply:", max);

// Modern spread operator alternative
const modernMax = Math.max(...numbers);
console.log("Math.max with spread:", modernMax);

// ============================================================================
// 7. POLYFILLS & IMPLEMENTATION UNDERSTANDING
// ============================================================================

console.log("\n=== CUSTOM IMPLEMENTATIONS ===");

// Custom bind polyfill (simplified)
Function.prototype.customBind = function (context, ...args) {
  const fn = this;
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

const customBound = sayHello.customBind(obj, 27);
console.log("Custom bind:", customBound("Kolkata"));

// Custom call polyfill (simplified)
Function.prototype.customCall = function (context, ...args) {
  context = context || globalThis;
  const fnKey = Symbol("fn");
  context[fnKey] = this;
  const result = context[fnKey](...args);
  delete context[fnKey];
  return result;
};

console.log("Custom call:", sayHello.customCall(obj, 28, "Hyderabad"));

// ============================================================================
// 8. PERFORMANCE CONSIDERATIONS
// ============================================================================

console.log("\n=== PERFORMANCE CONSIDERATIONS ===");

const testObj = { value: 42 };
function testFn() {
  return this.value;
}

// Pre-bind for repeated use (better performance)
const preBound = testFn.bind(testObj);

// Performance test simulation
console.time("Direct calls");
for (let i = 0; i < 10000; i++) {
  testObj.method = testFn;
  testObj.method();
}
console.timeEnd("Direct calls");

console.time("Call method");
for (let i = 0; i < 10000; i++) {
  testFn.call(testObj);
}
console.timeEnd("Call method");

console.time("Pre-bound function");
for (let i = 0; i < 10000; i++) {
  preBound();
}
console.timeEnd("Pre-bound function");

// ============================================================================
// 9. COMMON PITFALLS & EDGE CASES
// ============================================================================

console.log("\n=== COMMON PITFALLS ===");

// Pitfall 1: Lost context in object methods
const counter = {
  count: 0,
  increment() {
    this.count++;
    return this.count;
  }
};

const inc = counter.increment;
// console.log(inc()); // Error in strict mode, NaN in non-strict

// Pitfall 2: Callback context loss
const timer = {
  seconds: 0,
  start() {
    // Wrong: this will be global/undefined in callback
    // setInterval(this.tick, 1000);

    // Right: bind the context
    setInterval(this.tick.bind(this), 1000);
  },
  tick() {
    console.log(++this.seconds);
  }
};

// Pitfall 3: Constructor function called without 'new'
function SafeConstructor(name) {
  // Guard against missing 'new'
  if (!(this instanceof SafeConstructor)) {
    return new SafeConstructor(name);
  }
  this.name = name;
}

// ============================================================================
// 10. MODERN ALTERNATIVES & BEST PRACTICES
// ============================================================================

console.log("\n=== MODERN ALTERNATIVES ===");

// Class with arrow functions (auto-bound)
class ModernComponent {
  constructor(name) {
    this.name = name;
    this.clickCount = 0;
  }

  // Auto-bound method
  handleClick = () => {
    this.clickCount++;
    console.log(`${this.name} clicked ${this.clickCount} times`);
  };

  // Regular method when 'this' context is guaranteed
  render() {
    return `Component: ${this.name}`;
  }
}

// Optional chaining with method calls
const obj2 = {
  nested: {
    method() {
      return "success";
    }
  }
};

console.log("Optional chaining:", obj2.nested?.method?.()); // "success"
console.log("Safe call:", obj2.missing?.method?.()); // undefined

// ============================================================================
// QUICK REFERENCE SUMMARY FOR INTERVIEWS
// ============================================================================

console.log("\n=== INTERVIEW SUMMARY ===");

const summary = {
  call: {
    purpose: "Invoke function immediately with specific 'this'",
    syntax: "fn.call(thisArg, arg1, arg2, ...)",
    useCase: "One-time invocation with known arguments"
  },
  apply: {
    purpose: "Invoke function immediately with specific 'this' and array args",
    syntax: "fn.apply(thisArg, [arg1, arg2, ...])",
    useCase: "When arguments are in array form"
  },
  bind: {
    purpose: "Create new function with permanently bound 'this'",
    syntax: "fn.bind(thisArg, arg1, arg2, ...)",
    useCase: "Event handlers, callbacks, partial application"
  }
};

console.table(summary);

// Key Interview Points:
console.log(`
KEY INTERVIEW POINTS:
1. Arrow functions cannot be rebound - they use lexical 'this'
2. bind() creates a new function, call/apply invoke immediately
3. Multiple bind() calls only use the first 'this' binding
4. Constructor functions create new 'this' context with 'new'
5. Event handlers lose 'this' context - use bind() or arrow functions
6. Method borrowing allows using methods on different objects
7. Performance: pre-bind for repeated use, avoid call/apply in loops
8. Modern alternatives: arrow functions, optional chaining, spread operator
9. Common pitfall: extracting methods loses 'this' context
10. Polyfills help understand internal implementation
`);

// ============================================================================
// PRACTICAL INTERVIEW QUESTIONS TO EXPECT
// ============================================================================

console.log("\n=== SAMPLE INTERVIEW QUESTIONS ===");

// Q1: What will this output?
const quiz1 = {
  name: "Quiz",
  ask: function () {
    console.log("Q1:", this.name);
  }
};
const askFn = quiz1.ask;
// askFn(); // undefined

// Q2: Fix the callback context
const quiz2 = {
  name: "Quiz2",
  delayedAsk: function () {
    setTimeout(function () {
      console.log("Q2 (broken):", this?.name || "undefined");
    }, 0);

    // Fixed versions:
    setTimeout(() => {
      console.log("Q2 (arrow):", this.name);
    }, 0);

    setTimeout(
      function () {
        console.log("Q2 (bind):", this.name);
      }.bind(this),
      0
    );
  }
};
quiz2.delayedAsk();

// Q3: Implement a function that works like bind
function myBind(fn, context, ...args) {
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
}

const testBind = myBind(sayHello, obj, 30);
console.log("Q3 - Custom bind:", testBind("Pune"));
