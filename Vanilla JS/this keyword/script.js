"use strict";

// Global scope
console.log(this);
// In strict mode, `this` is undefined.
// In non-strict mode, `this` refers to the global object (window in browsers).

// Inside a function
function x() {
  console.log(this);
  // In strict mode, `this` is undefined.
  // In non-strict mode, `this` refers to the global object (window in browsers).
}
x();

// `this` keyword value depends on how the function is called:
x(); // undefined in strict mode, window in non-strict mode
window.x(); // window

// `this` inside an object's method
const student = {
  name: "Hrithik",
  printName: function () {
    console.log(this);
    console.log(this.name);
  },
};
student.printName();
// Here, `this` refers to the object `student`.
// `this.name` refers to the property `name` of the object `student`, which is "Hrithik".

const student2 = {
  name: "Agarwal",
};

// student2.printName();
// This will throw an error because `printName` is not a method of `student2`.

// In order to use `printName` with `student2`, use the `call` method:
student.printName.call(student2);
// Here, `this` refers to `student2` inside the `printName` function.
// `this.name` refers to the property `name` of the object `student2`, which is "Agarwal".

// `this` inside arrow functions
// Arrow functions do not have their own `this` value. They inherit `this` from their lexical scope.

const obj = {
  a: 10,
  x: () => {
    console.log(this);
    // In an arrow function, `this` does not refer to the object `obj`.
    // Instead, `this` refers to its lexical scope, which is the global scope in this case.
  },
};

obj.x(); // In strict mode, this will log undefined (lexical scope is global scope)

const obj2 = {
  a: 10,
  x: function () {
    console.log(this);
  },
};
