// Basic currying example: Converting f(a,b) into f(a)(b)
function f(a) {
  return function (b) {
    return `${a},${b}`; // Returns a string combining 'a' and 'b'
  };
}

console.log(f(1)); // Logs the first function returned from 'f(1)', which is a function expecting 'b'
console.log(f(1)(2)); // Logs "1,2" by invoking the returned function with '2'
console.log("_________________");

// Implementing a curried version of sum(1)(2)(3)

function sum(a, b, c) {
  return a + b + c; // Standard function that adds three arguments
}

console.log(sum(1, 3, 6)); // Outputs 10, non-curried version
console.log("_________________");

// Curried version of the 'sum' function
function sumCurry(a) {
  return function (b) {
    return function (c) {
      return a + b + c; // Returns the sum of 'a', 'b', and 'c'
    };
  };
}

console.log(sumCurry(1)); // Logs the first function expecting 'b'
console.log(sumCurry(1)(2)); // Logs the second function expecting 'c'
console.log(sumCurry(1)(2)(3)); // Outputs 6 by adding 1 + 2 + 3
console.log("_________________");

// Implementing a curried evaluate function for different operations
function evaluate(type) {
  return function (a) {
    return function (b) {
      // Determines the operation type and performs it on 'a' and 'b'
      if (type === "add") return a + b;
      else if (type === "subtract") return a - b;
      else if (type === "multiply") return a * b;
      else if (type === "divide") return a / b;
      else return "invalid oper"; // Fallback for unknown operation types
    };
  };
}

console.log(evaluate("add")); // Logs the first function expecting 'a'
console.log(evaluate("add")(3)); // Logs the second function expecting 'b'
console.log(evaluate("add")(3)(4)); // Outputs 7 by adding 3 + 4
console.log("_________________");

// Infinite currying example: sum(1)(2)(3)...(n)()
function add(a) {
  return function (b) {
    if (b) return add(a + b); // Keeps returning a function until no argument is provided
    return a; // Returns the accumulated sum when 'b' is not provided
  };
}

console.log(add(5)(4)(3)(2)(1)()); // Outputs 15, the sum of all arguments
console.log(add(5)(4)()); // Outputs 9, the sum of 5 and 4
console.log("_________________");

// DOM manipulation example using currying
function updateElemTxt(id) {
  return function (context) {
    document.getElementById(id).textContent = context; // Updates the text content of the specified element
  };
}

// Assuming there's an element with id="nameId"
console.log(updateElemTxt("nameId")); // Logs the curried function waiting for the content argument
console.log(updateElemTxt("nameId")("This is manipulated from js")); // Updates the element text to "This is manipulated from js"
console.log("_________________");

// Implementing a generic curry() function
// Converts a function f(a,b,c) into f(a)(b)(c)
function curry(func) {
  return function curriedFcn(...args) {
    console.log("Args->", args, "func->", func, "func.leng=>" , func.length, "args.len->" , args.length); // Logs the current arguments received
    if (func.length <= args.length) {
      // If enough arguments are provided, invoke the function
      return func(...args);
    } else {
      // Otherwise, return a function expecting more arguments
      return function (...next) {
        return curriedFcn(...args, ...next); // Combine current and next arguments
      };
    }
  };
}

const test = (a, b, c, d) => a + b + c + d; // Example function requiring 4 arguments
const totalSum = curry(test); // Curries the function

console.log(totalSum(1)(2)(3)(4)); // Outputs 10 by successively providing the arguments
