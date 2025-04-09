// Original array
const arr = [1, 2, 3, 4, 5];
console.log("Original Array:", arr);

// ==================
// Native map example
// ==================
const multiplyFive = arr.map((val) => val * 5);
console.log("Native Map (x5):", multiplyFive);

// ==================
// Polyfill for map
// ==================
console.log("Polyfill for map");

// Custom map attached to Array.prototype
Array.prototype.myMap = function (callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

// Using custom myMap
const multiplySix = arr.myMap((val) => val * 6);
console.log("Custom myMap (x6):", multiplySix);

// ==================
// Native filter example
// ==================
console.log("Filter Prototype");

const filtered = arr.filter((val) => val > 3);
console.log("Native Filter (>3):", filtered);

// ==================
// Polyfill for filter
// ==================
Array.prototype.myFilter = function (callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// Using custom myFilter
const customFiltered = arr.myFilter((val) => val > 3);
console.log("Custom myFilter (>3):", customFiltered);

// ==================
// Native reduce example
// ==================
console.log("Reduce Prototype");

const sum = arr.reduce((acc, curr) => acc + curr, 0);
console.log("Native Reduce (Sum):", sum);

// ==================
// Polyfill for reduce
// ==================
Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue;

  for (let i = 0; i < this.length; i++) {
    if (accumulator !== undefined) {
      accumulator = callback(accumulator, this[i], i, this);
    } else {
      accumulator = this[i]; // Handle case where no initialValue is passed
    }
  }

  return accumulator;
};

// Using custom myReduce
const customSum = arr.myReduce((acc, curr) => acc + curr, 0);
console.log("Custom myReduce (Sum):", customSum);
