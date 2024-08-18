var name = "Hrithik";
//global scopr
function local() {
  //local scope
  console.log(name);
}

local();

function subscribe() {
  var name = "Agarwal";
  function displayName() {
    console.warn(name);
  }
  displayName();
}

subscribe();

function makeFcn() {
  var name = "mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}
makeFcn()();
//closure scope chain (local, oyuter fcn scopr, global scope)

// global scope
const e = 10;
function sum(a) {
  return function (b) {
    return function (c) {
      // outer functions scope
      return function (d) {
        // local scope
        return a + b + c + d + e;
      };
    };
  };
}

console.log(sum(1)(2)(3)(4)); // 20
console.log("____________");
let count = 0;
(function printCount() {
  if (count == 0) {
    let count = 1; //shadow
    console.log(count);
  }
  console.log(count);
})();
console.log("____________");
function createBase(baseNum) {
  return function (numToBeChanged) {
    console.log(baseNum + numToBeChanged);
  };
}
var addSix = createBase(6);
addSix(10); //return 16
addSix(21); // return 27
console.log("____________");
console.log("time optimization without closure");

function time(index) {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }
  console.log(a[index]);
}
console.time("6");
time(6);
console.timeEnd("6");
console.time("50");
time(50);
console.timeEnd("50");

console.log("____________");
console.log("time optimization with closure");

function time2() {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }
  return function (index) {
    console.log(a[index]);
  };
}
const closure = time2();
console.time("6");
closure(6);
console.timeEnd("6");
console.time("50");
closure(50);
console.timeEnd("50");

console.log("____________");
// block scope and settitmeout
function q6() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i);
    }, i * 1000);
  }
}
// q6();
console.log("____________");
// block scope and settitmeout
function q7() {
  for (let i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i);
    }, i * 1000);
  }
}
// q7();

// use var only but print 012

function q8() {
  for (var i = 0; i < 3; i++) {
    function inner(i) {
      setTimeout(function log() {
        console.log(i);
      }, i * 1000);
    }
    inner(i);
  }
}
// q8();

//use closure to create private counter
console.log("____________");
function counter() {
  var _counter = 0;
  function add(num) {
    _counter += num;
  }
  function getVal() {
    return "Counter Value: " + _counter;
  }
  return {
    add,
    getVal,
  };
}
const ctr1 = counter();
console.log(ctr1.getVal());
ctr1.add(20);
console.log(ctr1.getVal());

console.log("____________");
//module pattern

var Module = (function () {
  function privateMethod() {
    console.log("Private");
  }
  return {
    publicMethod: function () {
      //here wew can call private method
      console.log("Public");
    },
  };
})();
Module.publicMethod();
try {
  Module.privateMethod();
} catch (e) {
  console.error(e);
}

console.log("____________");
console.log("____________");
console.log("____________");
//Once Polyfill
function once(func, context) {
  let ran;
  return function () {
    if (func) {
      ran = func.apply(context || this, arguments);
      func = null;
    }
    return ran;
  };
}

const hello = () => {
  console.log("hello");
};
hello();
hello();
hello();
//ran multiple times

const helloOnce = once(hello);
helloOnce();
helloOnce();
helloOnce();

console.log("____________");
console.log("____________");
//memoize polyfill

const clumsyCalc = (num1, num2) => {
  for (let i = 0; i <= 100000000; i++) {}
  return num1 * num2;
};
console.time("Clumsy");
clumsyCalc(100, 2);
console.timeEnd("Clumsy");
console.time("Clumsy2");
clumsyCalc(100, 2);
console.timeEnd("Clumsy2");
console.log("memoizing it");
function mymemo(fn, context) {
  const res = {};
  return function (...args) {
    var argsCache = JSON.stringify(args);
    if (!res[argsCache]) {
      res[argsCache] = fn.call(context || this, ...args);
    }
    return res[argsCache];
  };
}

const memizeClumsyFcn = mymemo(clumsyCalc);
console.time("Clumsy3");
memizeClumsyFcn(100, 2);
console.timeEnd("Clumsy3");
console.time("Clumsy4");
memizeClumsyFcn(100, 2);
console.timeEnd("Clumsy4");
