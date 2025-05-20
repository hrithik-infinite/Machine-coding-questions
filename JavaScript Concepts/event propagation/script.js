// ============ Bubbling (div > section > button) ============
// Event flows from button to section to div (inner to outer)

const bubbleDiv = document.querySelector(".bubble-div");
const bubbleSection = document.querySelector(".bubble-section");
const bubbleButton = document.querySelector(".bubble-button");

bubbleDiv.addEventListener("click", () => console.log("BUBBLE: DIV clicked (bubbling phase)"));
bubbleSection.addEventListener("click", () => console.log("BUBBLE: SECTION clicked (bubbling phase)"));
bubbleButton.addEventListener("click", () => console.log("BUBBLE: BUTTON clicked (bubbling phase)"));

// ============ Capturing (nav > article > button) ============
// Event flows from nav to article to button (outer to inner)

const captureNav = document.querySelector(".capture-nav");
const captureArticle = document.querySelector(".capture-article");
const captureButton = document.querySelector(".capture-button");

captureNav.addEventListener("click", () => console.log("CAPTURE: NAV clicked (capturing phase)"), true);
captureArticle.addEventListener("click", () => console.log("CAPTURE: ARTICLE clicked (capturing phase)"), true);
captureButton.addEventListener("click", () => console.log("CAPTURE: BUTTON clicked (capturing phase)"), true);

// ============ Stop Propagation (aside > figure > button) ============
// Button stops propagation - figure and aside won't trigger

const stopAside = document.querySelector(".stop-aside");
const stopFigure = document.querySelector(".stop-figure");
const stopButton = document.querySelector(".stop-button");

stopAside.addEventListener("click", () => console.log("STOP: ASIDE clicked"));
stopFigure.addEventListener("click", () => console.log("STOP: FIGURE clicked"));
stopButton.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("STOP: BUTTON clicked (Propagation stopped)");
});

// ============ Event Delegation (ul > li) ============
// Single listener on <ul>, works for all <li> (even future ones)

const list = document.querySelector(".delegation-list");
const addItemBtn = document.querySelector(".add-item-btn");

list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log(`You clicked: ${e.target.innerText}`);
  }
});

addItemBtn.addEventListener("click", () => {
  const newItem = document.createElement("li");
  newItem.textContent = `Item ${list.children.length + 1}`;
  list.appendChild(newItem);
});
