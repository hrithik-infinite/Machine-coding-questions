// Define an array of numbers from 1 to 5
const arr = [1, 2, 3, 4, 5];

// Print the original array to the console
console.log(arr);

// Use the native map method to multiply each element of the array by 5
const multiplyFive = arr.map((val) => {
  return val * 5; // Return each value multiplied by 5
});

// Print the array with each value multiplied by 5
console.log(multiplyFive);

// Begin creating a custom implementation (polyfill) for the map method
console.log("Polyfill for map");
console.log(Array.prototype); // Print the Array prototype to the console for reference

// Create a custom map function and add it to Array's prototype
Array.prototype.myMap = function (callBack) {
  let temp = []; // Initialize an empty array to store results
  for (let i = 0; i < this.length; i++) {
    // Loop through each element in the array
    temp.push(callBack(this[i], i, this)); // Call the callback function with current element, index, and array
  }
  return temp; // Return the new array with transformed values
};

// Use the custom myMap function to multiply each element of the array by 5
const multiplyFive2 = arr.myMap((val) => {
  return val * 6; // Custom myMap works similarly to the native map
});

// Print the results of the custom myMap method
console.log("multiplyFive2" , multiplyFive2);

// Begin polyfilling (creating a custom implementation) for the filter method
console.log("Filter Prototype");

// Use the native filter method to filter out elements greater than 3
const f1 = arr.filter((val) => val > 3);

// Print the filtered array (values greater than 3)
console.log(f1);

// Create a custom filter function and add it to Array's prototype
Array.prototype.myFilter = function (callBack) {
  let temp = []; // Initialize an empty array to store results
  for (let i = 0; i < this.length; i++) {
    // Loop through each element in the array
    // If the callback returns true (i.e., the condition is met), push the value to temp
    if (callBack(this[i])) {
      temp.push(this[i]);
    }
  }
  return temp; // Return the new array with filtered values
};

// Use the custom myFilter method to filter out elements greater than 3
const f2 = arr.myFilter((val) => val > 3);

// Print the results of the custom myFilter method
console.log(f2);

console.log("Reduce Prototype");

const r1 = arr.reduce((acc, curr, i, arr) => {
  return acc + curr;
}, 0);
console.log(r1);

Array.prototype.myReduce = function (callBack, initVal) {
  var accum = initVal;
  for (let i = 0; i < this.length; i++) {
    accum = accum ? callBack(accum, this[i], i, this) : this[i];
  }
  return accum;
};
const r2 = arr.myReduce((acc, curr, i, arr) => {
  return acc + curr;
}, 0);
console.log(r2);
