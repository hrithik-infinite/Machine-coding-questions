// Currying Master File
// ====================

// 1️⃣ Basic currying example: Convert f(a, b) to f(a)(b)

function f(a) {
  return function (b) {
    return `${a},${b}`; // Returns a string combining 'a' and 'b'
  };
}

console.log(f(1)); // Logs: [Function] expecting 'b'
console.log(f(1)(2)); // Logs: "1,2"
console.log("_________________");

// Q1: What is currying?
// ✅ Currying transforms a function of N arguments into N functions of 1 argument each.
//    Example: f(a, b, c) => f(a)(b)(c)

// --------------------------------------------------

// 2️⃣ Curried version of sum(1)(2)(3)

function sum(a, b, c) {
  return a + b + c;
}

console.log(sum(1, 3, 6)); // Non-curried: Outputs 10
console.log("_________________");

function sumCurry(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(sumCurry(1)); // Logs: [Function] waiting for 'b'
console.log(sumCurry(1)(2)); // Logs: [Function] waiting for 'c'
console.log(sumCurry(1)(2)(3)); // Logs: 6 (fully applied)
console.log("_________________");

// Q2: What's the difference between currying and partial application?
// ✅ Currying: Converts to multiple unary functions (f(a)(b)(c))
// ✅ Partial Application: Fixes a subset of arguments (f(1, 2) becomes f(c))

// --------------------------------------------------

// 3️⃣ Curried evaluate() for dynamic math operations

function evaluate(type) {
  return function (a) {
    return function (b) {
      if (type === "add") return a + b;
      if (type === "subtract") return a - b;
      if (type === "multiply") return a * b;
      if (type === "divide") return a / b;
      return "Invalid Operation";
    };
  };
}

console.log(evaluate("add")(3)(4)); // 7
console.log(evaluate("multiply")(3)(4)); // 12
console.log("_________________");

// --------------------------------------------------

// 4️⃣ Infinite currying - Dynamic sum(1)(2)...(n)()

function add(a) {
  return function (b) {
    if (b) return add(a + b); // Keeps accepting arguments
    return a; // Final return when no argument
  };
}

console.log(add(5)(4)(3)(2)(1)()); // 15
console.log(add(5)(4)()); // 9
console.log("_________________");

// Q3: How is infinite currying different from normal currying?
// ✅ Infinite currying never fixes argument count upfront. It stops when you stop passing arguments.

// --------------------------------------------------

// 5️⃣ Currying in DOM Manipulation - Update Text Content

function updateElemTxt(id) {
  return function (content) {
    document.getElementById(id).textContent = content;
  };
}

// In browser, you could run:
updateElemTxt("nameId")("This is manipulated via curry");

// --------------------------------------------------

// 6️⃣ Generic curry() utility - Converts any f(a, b, c) to f(a)(b)(c)

function curry(func) {
  return function curried(...args) {
    console.log("Current Args:", args);
    if (args.length >= func.length) {
      return func(...args); // Fully applied, execute
    } else {
      return function (...nextArgs) {
        return curried(...args, ...nextArgs); // Partially applied, wait for more args
      };
    }
  };
}

const sampleFn = (a, b, c, d) => a + b + c + d;
const curriedSample = curry(sampleFn);

console.log(curriedSample(1)(2)(3)(4)); // 10
console.log("_________________");

// Q4: What if you call curry function with fewer args than needed?
// ✅ It returns a new function waiting for the rest.

// --------------------------------------------------

// 7️⃣ Advanced Interview Case: Partial Application Example

function partial(func, ...fixedArgs) {
  return function (...remainingArgs) {
    return func(...fixedArgs, ...remainingArgs);
  };
}

function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

const sayHello = partial(greet, "Hello");
console.log(sayHello("Hrithik")); // "Hello, Hrithik!"

// Q5: How is partial application different from currying?
// ✅ Partial fixes **some** arguments upfront.
// ✅ Currying splits into **sequential 1-arg functions**.

// --------------------------------------------------

// ✅ Summary Table for Quick Revision

/*
| Concept              | Definition                                        | Example                    |
|----------------------|--------------------------------------------------|------------------|
| Currying             | f(a, b, c) → f(a)(b)(c)                          | sum(1)(2)(3)     |
| Partial Application  | Fixes some args (f(a, b) to f(b))                 | greet("Hi")("A") |
| Infinite Currying    | Keeps accepting args until a stop signal (e.g., ()) | add(1)(2)(3)()   |
*/

// --------------------------------------------------

// 🎯 Quick Quiz (Ask in Interviews)
/*
1. What is currying? How is it useful?
2. Compare currying vs partial application.
3. Implement generic curry() function.
4. Implement infinite currying sum() example.
5. Convert a DOM manipulation to a curried style.
6. Why does currying improve functional composition?
7. Difference between:
   - curry(f) vs f.bind()
   - currying vs closure?
*/

// --------------------------------------------------
