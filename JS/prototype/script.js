// Creating an object 'obj' with properties 'name' and 'age'
let obj = {
  name: "Hrithik",
  age: 24,
};

// Logging the object, its prototype, and the base Object prototype
console.log(obj);
console.log(obj.__proto__); // Points to Object.prototype
console.log(Object.prototype); // The base prototype for all objects

// Demonstrating primitive types and their prototypes
let num = 10;
let name = "Hrithik";
let bool = true;

console.log(num); // Logs 10
console.log(num.__proto__); // Logs the Number.prototype

console.log(name); // Logs "Hrithik"
console.log(name.__proto__); // Logs the String.prototype

console.log(bool); // Logs true
console.log(bool.__proto__); // Logs the Boolean.prototype

// Prototype chaining example
let person = {
  name: "Hrithik",
  age: 24,
};

// Using toString method from Object.prototype
console.log(person.toString()); // Logs "[object Object]"

// Overriding the toString method in another object 'person2'
let person2 = {
  name: "Hrithik",
  age: 24,
  toString: () => {
    return "converted to string override";
  },
};

// Using the overridden toString method
console.log(person2.toString()); // Logs "converted to string override"

// Prototype inheritance example

// Define a constructor function 'Animal'
function Animal(name) {
  this.name = name;
}

// Add a method 'sayName' to Animal's prototype
Animal.prototype.sayName = function () {
  console.log(`My name is ${this.name}`);
};

// Create an instance of Animal
let animal1 = new Animal("Tiger");
console.log(animal1); // Logs the animal1 object
animal1.sayName(); // Logs "My name is Tiger"

// Define a constructor function 'Dog' that inherits from Animal
function Dog(name, breed) {
  Animal.call(this, name); // Inherit properties from Animal
  this.breed = breed;
}

// Set Dog's prototype to be an instance of Animal
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Add a new method 'bark' to Dog's prototype
Dog.prototype.bark = function () {
  console.log("Woof!");
};

// Create an instance of Dog
let dog1 = new Dog("Max", "Rottie");
console.log(dog1); // Logs the dog1 object
dog1.bark(); // Logs "Woof!"

// Extending Array prototype with a custom method 'myArr'
Array.prototype.myArr = function () {
  console.log("This is my array " + this);
};

// Create an array and use the custom method
const arr = [1, 2, 3];
arr.myArr(); // Logs "This is my array 1,2,3"
console.log("__________________________________");

// Ques 1: What will be the output of the following code?

function Vehicle() {}
Vehicle.prototype.drive = function () {
  console.log("Driving a vehicle");
};

function Car() {}
Car.prototype = Object.create(Vehicle.prototype); // Inheriting from Vehicle
Car.prototype.constructor = Car;
Car.prototype.drive = function () {
  console.log("Driving a car");
};

var vehicle = new Vehicle();
var car = new Car();

vehicle.drive(); // Logs "Driving a vehicle"
car.drive(); // Logs "Driving a car"

// Ques 2: Difference between __proto__ and prototype in JavaScript

// - **`__proto__`**: It is an object property that points to the prototype of the object.
//                    It is used for inheritance and allows accessing the prototype chain.
// - **`prototype`**: It is a property that exists on constructor functions and is used to
//                   set up inheritance for objects created by that constructor function.
//   It defines properties and methods shared by all instances created by that constructor function.

// Ques 3: What is setPrototypeOf?

// Define a prototype object
var animalPrototype = {
  sound: function () {
    console.log("Making a sound...");
  },
};

// Create an object 'dog' with 'animalPrototype' as its prototype
var dog = Object.create(animalPrototype);

// Create another object 'cat' with a different prototype
var cat = {
  purr: function () {
    console.log("Purring...");
  },
};

// Change the prototype of 'dog' to 'cat'
Object.setPrototypeOf(dog, cat);
dog.purr(); // Logs "Purring..."

// Ques 4: What is 'instanceof' in JavaScript?

// Check if 'dog1' is an instance of 'Animal'
console.log(dog1 instanceof Animal); // Logs true

// Ques 5: How can you create an object without a prototype in JavaScript?

// Create an object with no prototype
var obj1 = Object.create(null);
// console.log(obj1.toString());  // Would throw an error as 'toString' is not available

// Ques 6: What will be the output of the following code?
function A() {}
A.prototype.foo = 10;

function B() {}
B.prototype = Object.create(A.prototype); // Inherit from A
B.prototype.constructor = B;
B.prototype.foo = 20; // Override foo

function C() {}
C.prototype = Object.create(B.prototype); // Inherit from B
C.prototype.constructor = C;
C.prototype.foo = 30; // Override foo

var obj1 = new A();
var obj2 = new B();
var obj3 = new C();

// Logs the 'foo' value based on the prototype chain
console.log(obj1.foo); // Logs 10
console.log(obj2.foo); // Logs 20
console.log(obj3.foo); // Logs 30

// Ques 7: Deep Clone an object in JS

function deepClone(obj) {
  // Handle null and non-object types
  if (obj === null || typeof obj != "object") {
    return obj;
  }

  // Create a new object or array based on the type of the input object
  var clone = Array.isArray(obj) ? [] : {};

  // Iterate through each key in the input object
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Recursively clone nested objects/arrays
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
}

var obj2 = {
  a: 1,
  b: {
    c: 2,
    d: [3, 4],
  },
};

// Deep clone the object 'obj2'
var clonedObj = deepClone(obj2);
clonedObj.b.c = 3; // Modify the clone, not the original
console.log(clonedObj); // Logs the modified clone
