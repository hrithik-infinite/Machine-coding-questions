//f(a,b) into f(a)(b)

function f(a) {
  return function (b) {
    return `${a},${b}`;
  };
}
console.log(f(1));
console.log(f(1)(2));
console.log("_________________");
//implement sum(1)(2)(3)

function sum(a, b, c) {
  return a + b + c;
}
console.log(sum(1, 3, 6));
console.log("_________________");

function sumCurry(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
console.log(sumCurry(1));
console.log(sumCurry(1)(2));
console.log(sumCurry(1)(2)(3));
console.log("_________________");
//implement evaluate("add")(1)(3) => 4 , for all 4 operations

function evaluate(type) {
  return function (a) {
    return function (b) {
      if (type === "add") return a + b;
      else if (type === "subtract") return a - b;
      else if (type === "multiply") return a * b;
      else if (type === "divide") return a / b;
      else return "invalid oper";
    };
  };
}
console.log(evaluate("add"));
console.log(evaluate("add")(3));
console.log(evaluate("add")(3)(4));
console.log("_________________");
// Infinite currying sum(1)(2)(3)....(n)

function add(a) {
  return function (b) {
    if (b) return add(a + b);
    return a;
  };
}
console.log(add(5)(4)(3)(2)(1)());
console.log(add(5)(4)());
console.log("_________________");

//manipulating dom

function updateElemTxt(id) {
  return function (context) {
    document.getElementById(id).textContent = context;
  };
}
// nameId
console.log(updateElemTxt("nameId"));
console.log(updateElemTxt("nameId")("This is manipulated from js"));
console.log("_________________");

// implement curry()
// convert f(a,b,c) to f(a)(b)(c)

function curry(func) {
  return function curriedFcn(...args) {
    console.log("Args->", args);
    console.log("func->", func);
    if (func.length <= args.length) {
      return func(...args);
    } else {
      return function (...next) {
        return curriedFcn(...args, ...next);
      };
    }
  };
}
const test = (a, b, c, d) => a + b + c + d;
const totalSum = curry(test);
console.log(totalSum(1)(2)(3)(4));
