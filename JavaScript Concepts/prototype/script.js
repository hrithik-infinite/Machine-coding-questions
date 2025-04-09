// ---------------------- Object Creation & Prototypes ----------------------

// Creating a simple object 'obj' with properties 'name' and 'age'
let obj = {
  name: "Hrithik",
  age: 24
};

// Log the object itself
console.log("Object 'obj':", obj);

// Log its prototype (__proto__)
console.log("'obj.__proto__' (should point to Object.prototype):", obj.__proto__);

// Log the actual Object prototype
console.log("Base 'Object.prototype':", Object.prototype);

// ---------------------- Primitive Types & Their Prototypes ----------------------

// Number prototype check
let num = 10;
console.log("Number value:", num);
console.log("Number prototype:", num.__proto__);

// String prototype check
let name = "Hrithik";
console.log("String value:", name);
console.log("String prototype:", name.__proto__);

// Boolean prototype check
let bool = true;
console.log("Boolean value:", bool);
console.log("Boolean prototype:", bool.__proto__);

// ---------------------- Prototype Chaining ----------------------

// Object using base prototype methods
let person = {
  name: "Hrithik",
  age: 24
};

// Using Object.prototype's toString method
console.log("Object person.toString():", person.toString());

// Overriding toString in a different object
let person2 = {
  name: "Hrithik",
  age: 24,
  toString: () => "converted to string override"
};

// Using the overridden toString
console.log("Overridden person2.toString():", person2.toString());

// ---------------------- Prototype Inheritance ----------------------

// Constructor function 'Animal'
function Animal(name) {
  this.name = name;
}

// Adding a method to Animal.prototype
Animal.prototype.sayName = function () {
  console.log(`My name is ${this.name}`);
};

// Creating an Animal instance
let animal1 = new Animal("Tiger");
console.log("Animal instance 'animal1':", animal1);
animal1.sayName(); // Inherited method

// Constructor function 'Dog' inheriting from Animal
function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Inherit Animal's prototype (prototype chaining)
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Adding Dog-specific method
Dog.prototype.bark = function () {
  console.log("Woof!");
};

// Creating Dog instance
let dog1 = new Dog("Max", "Rottie");
console.log("Dog instance 'dog1':", dog1);
dog1.sayName(); // Inherited
dog1.bark(); // Dog's own method

// ---------------------- Extending Built-In Prototypes ----------------------

// Adding a custom method to Array prototype
Array.prototype.myArr = function () {
  console.log("This is my array " + this);
};

// Test array with new method
const arr = [1, 2, 3];
arr.myArr();

console.log("__________________________________");

// ---------------------- Q&A Examples ----------------------

// Q1: Output of this inheritance example
function Vehicle() {}
Vehicle.prototype.drive = function () {
  console.log("Driving a vehicle");
};

function Car() {}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
Car.prototype.drive = function () {
  console.log("Driving a car");
};

var vehicle = new Vehicle();
var car = new Car();

vehicle.drive(); // Driving a vehicle
car.drive(); // Driving a car

// ---------------------- __proto__ vs prototype ----------------------
/*
- `__proto__`: Refers to the actual prototype of an **object instance**.
- `prototype`: Refers to the prototype object attached to a **constructor function**.
Example:
let obj = new Something();
obj.__proto__ === Something.prototype // true
*/

// ---------------------- Q3: setPrototypeOf Example ----------------------
var animalPrototype = {
  sound: function () {
    console.log("Making a sound...");
  }
};

var dog = Object.create(animalPrototype); // dog inherits from animalPrototype

var cat = {
  purr: function () {
    console.log("Purring...");
  }
};

// Change prototype dynamically
Object.setPrototypeOf(dog, cat);
dog.purr(); // Purring...
// Note: `dog.sound()` would fail now as `dog` no longer inherits from animalPrototype

// ---------------------- Q4: 'instanceof' Example ----------------------
console.log("Is dog1 an instance of Animal?", dog1 instanceof Animal); // true

// ---------------------- Q5: Creating object without prototype ----------------------
var obj1 = Object.create(null);
// console.log(obj1.toString()); // Throws error as 'toString' is not inherited

// ---------------------- Q6: Prototype Chain Example ----------------------
function A() {}
A.prototype.foo = 10;

function B() {}
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;
B.prototype.foo = 20; // Override

function C() {}
C.prototype = Object.create(B.prototype);
C.prototype.constructor = C;
C.prototype.foo = 30; // Override

var objA = new A();
var objB = new B();
var objC = new C();

console.log("objA.foo:", objA.foo); // 10
console.log("objB.foo:", objB.foo); // 20
console.log("objC.foo:", objC.foo); // 30

// ---------------------- Q7: Deep Clone Function ----------------------
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  var clone = Array.isArray(obj) ? [] : {};

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}

// Test deep clone
var objToClone = {
  a: 1,
  b: {
    c: 2,
    d: [3, 4]
  }
};

var clonedObj = deepClone(objToClone);
clonedObj.b.c = 3; // Modify clone only
console.log("Cloned Object:", clonedObj);
console.log("Original Object:", objToClone); // Unchanged
