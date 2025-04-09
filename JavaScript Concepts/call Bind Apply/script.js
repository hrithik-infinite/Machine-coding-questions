// Create an object with a property 'name'
const obj = { name: "hrithik" };

/**
 * Function that uses 'this' and takes an argument 'age'.
 * Note: The 'this' depends on how the function is called.
 */
function sayHello(age) {
  return "Hello " + this.name + " is " + age;
}

// Calling without setting 'this', so 'this.name' is undefined and age is undefined
console.log("Direct call (no binding):", sayHello());
// Output: "Hello undefined is undefined"

// Using `call` to set `this` to `obj` and pass 'age' directly as argument
console.log("Using call():", sayHello.call(obj, 24));
// Output: "Hello hrithik is 24"

// Using `apply` to set `this` to `obj` but pass arguments in an array
console.log("Using apply():", sayHello.apply(obj, [24]));
// Output: "Hello hrithik is 24"

// Using `bind` to permanently bind `this` to `obj`
// Unlike call/apply, bind does NOT invoke the function immediately
const bindFcn = sayHello.bind(obj);
console.log("Result of bind (before calling):", bindFcn);
// Logs the bound function itself

// Calling the bound function later with argument 'age'
console.log("Calling bind function:", bindFcn(24));
// Output: "Hello hrithik is 24"

// Another function for practice
function sayHi(age) {
  return `${this.name} is ${age}`;
}

// Using call - immediate invocation
console.log("sayHi with call():", sayHi.call(obj, 24));
// Output: "hrithik is 24"

// Using bind - returns a bound function (doesn't call immediately)
console.log("sayHi with bind():", sayHi.bind(obj, 24));
// Output: [Function: bound sayHi]
const boundSayHi = sayHi.bind(obj);
console.log("Calling bound sayHi():", boundSayHi(24));
// Output: "hrithik is 24"

// Example showing difference in `this` binding within an object
const person = {
  name: "hrithik",
  age: 20,
  getAge: function () {
    return this.age; // 'this' refers to 'person'
  }
};

// Calling method directly on person object
console.log("person.getAge():", person.getAge());
// Output: 20

const person2 = { age: 23 };

// Using `call` to invoke getAge with `this` pointing to person2
console.log("getAge.call(person2):", person.getAge.call(person2));
// Output: 23

// Another practical example (inside setTimeout)
var status = "a"; // Global status (in browsers it's window.status)

setTimeout(() => {
  const status = "b"; // Local status inside setTimeout

  const data = {
    status: "c", // Object property status
    getStatus() {
      return this.status; // this refers to data when called as data.getStatus()
    }
  };

  // Calling directly - this refers to 'data'
  console.log("data.getStatus():", data.getStatus());
  // Output: "c"

  // Using call - manually setting `this` to outer context (`this` of setTimeout callback)
  // In browsers, it's window; in node, it's {} or undefined
  console.log("data.getStatus.call(this):", data.getStatus.call(this));
  // Output: "a" (outer/global status)
}, 0);

/**
 * Summary Reference:
 * -------------------
 * call()  -> Call the function immediately with `this` set to first argument.
 * apply() -> Same as call but arguments are passed as an array.
 * bind()  -> Returns a new function with permanently bound `this` (doesn't call immediately).
 */

// Quick table recap
console.table([
  { Method: "call", WhenCalled: "Immediately", HowThisIsSet: "First argument", ArgumentsFormat: "Comma-separated" },
  { Method: "apply", WhenCalled: "Immediately", HowThisIsSet: "First argument", ArgumentsFormat: "Array" },
  { Method: "bind", WhenCalled: "Later (when invoked)", HowThisIsSet: "First argument (permanent)", ArgumentsFormat: "Comma-separated (when actually calling)" }
]);
