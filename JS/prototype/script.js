function c(val) {
  console.log(val);
}
let obj = {
  name: "Hrithik",
  age: 24,
};
console.log(obj);
console.log(obj.__proto__);
console.log(Object.prototype);

let num = 10;
let name = "Hrithik";
let bool = true;

c(num);
c(num.__proto__);

c(name);
c(name.__proto__);

c(bool);
c(bool.__proto__);

//Prototype chaining

let person = {
  name: "Hrithik",
  age: 24,
};
// c(person.alias())
c(person.toString());

// we can override the proto methods

let person2 = {
  name: "Hrithik",
  age: 24,
  toString: () => {
    return "convertes to string override";
  },
};
// c(person.alias())
c(person2.toString());

//prototype inheritance

//defined a constructor function
function Animal(name) {
  this.name = name;
}

// add a method to protottype

Animal.prototype.sayName = function () {
  c(`My name is ${this.name}`);
};

// c(Animal);

let animal1 = new Animal("Tiger");
c(animal1);
animal1.sayName();

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function () {
  c("Woof!");
};
let dog1 = new Dog("Max", "Rottie");
c(dog1);
dog1.bark();

Array.prototype.myArr = function () {
  c("This is my array " + this);
};
const arr = [1, 2, 3];

arr.myArr();
c("__________________________________");

// Ques 1: What will be the output of the following code?

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

vehicle.drive();
car.drive();

// Ques 2: Explain the difference between __proto__ and prototype in JavaScript.

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

// Create an object with animalPrototype as its prototype
var dog = Object.create(animalPrototype);

// Create another object with a different prototype
var cat = {
  purr: function () {
    console.log("Purring...");
  },
};

Object.setPrototypeOf(dog, cat);
dog.purr();

//q-4 wthat is instance of

console.log(dog1 instanceof Animal);

// Ques 5: How can you create an object without a prototype in JavaScript?
var obj1 = Object.create(null);
// console.log(obj1.toString());

// Ques 6: What will be the output of the following code?
function A() {}
A.prototype.foo = 10;

function B() {}
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;
B.prototype.foo = 20;

function C() {}
C.prototype = Object.create(B.prototype);
C.prototype.constructor = C;
C.prototype.foo = 30;

var obj1 = new A();
var obj2 = new B();
var obj3 = new C();

console.log(obj1.foo);
console.log(obj2.foo);
console.log(obj3.foo);

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

var clonedObj = deepClone(obj2);
clonedObj.b.c = 3;
c(clonedObj);
