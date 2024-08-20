const obj = { name: "hrithik" }; // Create an object with a property 'name'

// Define a function that uses 'this' to refer to the context object and takes an 'age' argument
function sayHello(age) {
  return "Hello " + this.name + " is " + age;
}

// Invoke the function without setting 'this', so 'this.name' and 'age' are undefined
console.log(sayHello()); // Output: "Hello undefined is undefined"

// Use 'call' to invoke 'sayHello', setting 'this' to 'obj' and passing 24 as the argument
console.log(sayHello.call(obj, 24));
// Output: "Hello hrithik is 24"
// 'call' sets 'this' to 'obj', so 'this.name' is 'hrithik', and 'age' is 24

// Use 'apply' to invoke 'sayHello', setting 'this' to 'obj' and passing arguments as an array
console.log(sayHello.apply(obj, [24]));
// Output: "Hello hrithik is 24"
// 'apply' also sets 'this' to 'obj' and uses the array [24] for arguments

// Use 'bind' to create a new function with 'this' bound to 'obj'
// 'bind' returns a new function that, when called, has 'this' set to 'obj'
const bindFcn = sayHello.bind(obj);
console.log(bindFcn);
// Output: function bound to 'obj', but not yet invoked

// Call the bound function with the argument 24
console.log(bindFcn(24));
// Output: "Hello hrithik is 24"
// 'bind' sets 'this' to 'obj' permanently, so 'bindFcn' always refers to 'obj'

function sayHi(age) {
  return `${this.name} is ${age}`;
}

// Using `call` to invoke the function immediately
console.log(sayHi.call(obj, 24));
// Output: "hrithik is 24"
// Explanation: `call` sets `this` to `obj` and invokes `sayHi` immediately with 24 as the argument.

// Using `bind` to create a new function
console.log(sayHi.bind(obj, 24));
// Output: [Function: bound sayHi]
// Explanation: `bind` returns a new function that has `this` permanently set to `obj`, and 24 as the first argument.
// It doesn't invoke the function immediately; it just returns the bound function.
const age = 10; // Global variable `age`

const person = {
  name: "hrithik",
  age: 20, // `age` property of `person` object
  getAge: function () {
    return this.age; // `this` refers to the `person` object when `getAge` is called as a method of `person`
  },
};

const person2 = { age: 23 }; // Another object with an `age` property

// Calling `getAge` method on `person` object
console.log(person.getAge());
// Output: 20
// Explanation: `this` refers to `person`, so `this.age` is 20.

// Using `call` to change `this` context to `person2`
console.log(person.getAge.call(person2));
// Output: 23
// Explanation: `call` sets `this` to `person2`, so `this.age` becomes 23.

// outpup
var status = "a"; // Global variable `status`

setTimeout(() => {
  const status = "b"; // Local variable `status` within the `setTimeout` callback

  const data = {
    status: "c", // `status` property of `data` object
    getStatus() {
      return this.status; // `this` refers to `data` object when `getStatus` is called as a method of `data`
    },
  };

  console.log(data.getStatus());
  // Output: "c"
  // Explanation: `this` refers to the `data` object, so `this.status` is "c".

  console.log(data.getStatus.call(this));
  // Output: "a"
  // Explanation: `call` sets `this` to the surrounding `this` context of the arrow function,
  // which refers to the global `this` in non-strict mode (where `this.status` is "a").
}, 0);
