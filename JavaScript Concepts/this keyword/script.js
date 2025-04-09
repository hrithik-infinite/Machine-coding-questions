"use strict";

// Global scope
console.log("Global scope:", this);
// In strict mode, `this` is undefined.
// In non-strict mode, `this` refers to the global object (window in browsers).

// Inside a function
function x() {
  console.log("Inside function x:", this);
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
    console.log("Inside student.printName:", this);
    console.log("Inside student.printName (this.name):", this.name);
  }
};
student.printName();
// Here, `this` refers to the object `student`.
// `this.name` refers to the property `name` of the object `student`, which is "Hrithik".

const student2 = {
  name: "Agarwal"
};

try {
  // This will throw an error because `printName` is not a method of `student2`.
  student2.printName();
} catch (e) {
  console.error(e);
}

// In order to use `printName` with `student2`, use the `call` method:
student.printName.call(student2);
// Here, `this` refers to `student2` inside the `printName` function.
// `this.name` refers to the property `name` of the object `student2`, which is "Agarwal".

// `this` inside arrow functions
// Arrow functions do not have their own `this` value. They inherit `this` from their lexical scope.

const obj = {
  a: 10,
  x: () => {
    console.log("Inside obj.x (arrow function):", this);
    // In an arrow function, `this` does not refer to the object `obj`.
    // Instead, `this` refers to its lexical scope, which is the global scope in this case.
  }
};

obj.x(); // In strict mode, this will log undefined (lexical scope is global scope)

const obj2 = {
  a: 10,
  x: function () {
    console.log("Inside obj2.x (normal function):", this);
    // In a normal function, `this` refers to the object `obj2`.
  }
};
obj2.x();

const obj3 = {
  a: 20,
  x: function () {
    const y = () => {
      console.log("Inside obj3.x > y (arrow function):", this);
      // In the arrow function `y`, `this` inherits from its lexical scope, which is the `x` function.
      // Therefore, `this` refers to `obj3` because `x` is a method of `obj3`.
    };
    y();
  }
};

obj3.x();
// Here, `this` inside `y` refers to `obj3` because arrow functions do not have their own `this`
// and take `this` from their containing (lexical) scope, which is the `x` function.
// `this` in the `x` function refers to `obj3`.
