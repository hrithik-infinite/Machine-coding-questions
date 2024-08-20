//Event bubbling
// const div = document.querySelector("div");
// const form = document.querySelector("form");
// const button = document.querySelector("button");

// div.addEventListener("click", function () {
//   console.log("div");
// });
// form.addEventListener("click", function () {
//   console.log("form");
// });
// button.addEventListener("click", function (event) {
//   event.preventDefault();
//   console.log("button");
// });

// targets
// const div = document.querySelector("div");
// const form = document.querySelector("form");
// const button = document.querySelector("button");

// div.addEventListener("click", func);
// form.addEventListener("click", func);
// button.addEventListener("click", func);

// function func(event) {
//   event.preventDefault();
//   console.log("currentTarget " + event.currentTarget.tagName, " target =" + event.target.tagName, " this = " + this.tagName);
// }

// event trickling
// const div = document.querySelector("div");
// const form = document.querySelector("form");
// const button = document.querySelector("button");

// div.addEventListener("click", func, { capture: true });
// form.addEventListener("click", func, { capture: true });
// button.addEventListener("click", func, { capture: true });

// function func(event) {
//   event.preventDefault();
//   console.log("currentTarget " + event.currentTarget.tagName, " target =" + event.target.tagName, " this = " + this.tagName);
// }

// stop Propogation
const div = document.querySelector("div");
const form = document.querySelector("form");
const button = document.querySelector("button");
div.addEventListener("click", function (e) {
  e.stopPropagation();
  console.log("div");
});
form.addEventListener("click", function (e) {
  e.stopPropagation();
  console.log("form");
});
button.addEventListener("click", function (e) {
  e.stopPropagation();
  e.preventDefault();
  console.log("button");
});


//event delegation