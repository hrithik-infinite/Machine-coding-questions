document.addEventListener("DOMContentLoaded", function () {
  // 📍 Selectors for debounce demo
  const btnDebounce = document.querySelector(".clickBtn");
  const btnDebounceCount = document.querySelector(".incClick");
  const btnDebounceTriggered = document.querySelector(".incTrig");

  // 📍 Counters
  let debounceClickCount = 0;
  let debounceTriggeredCount = 0;

  // --------------------------------------------
  // Debounce Implementation
  // --------------------------------------------
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer); // Clear existing timer (reset)
      timer = setTimeout(() => {
        func.apply(this, args); // Execute after delay
      }, delay);
    };
  }

  // Debounced Function - updates triggered count after 500ms inactivity
  const debouncedTrigger = debounce(() => {
    btnDebounceTriggered.innerHTML = ++debounceTriggeredCount;
  }, 500);

  // Click Event Handler (Debounce Example)
  btnDebounce.addEventListener("click", function () {
    btnDebounceCount.innerHTML = ++debounceClickCount; // Immediate click count
    debouncedTrigger(); // Delayed trigger count (debounced)
  });

  // --------------------------------------------
  // 📍 Selectors for throttle demo
  const btnThrottle = document.querySelector(".clickBtn1");
  const btnThrottleCount = document.querySelector(".incClick1");
  const btnThrottleTriggered = document.querySelector(".incTrig1");

  // 📍 Counters
  let throttleClickCount = 0;
  let throttleTriggeredCount = 0;

  // --------------------------------------------
  // Throttle Implementation
  // --------------------------------------------
  function throttle(func, interval) {
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= interval) {
        lastCall = now;
        func.apply(this, args); // Execute if enough time passed
      }
    };
  }

  // Throttled Function - updates triggered count at max once every 800ms
  const throttledTrigger = throttle(() => {
    btnThrottleTriggered.innerHTML = ++throttleTriggeredCount;
  }, 800);

  // Click Event Handler (Throttle Example)
  btnThrottle.addEventListener("click", function () {
    btnThrottleCount.innerHTML = ++throttleClickCount; // Immediate count
    throttledTrigger(); // Throttled trigger count
  });

  // --------------------------------------------
  // Bonus: Debounce Input Example (Real World)
  // --------------------------------------------
  const searchInput = document.querySelector(".searchInput");
  const searchStatus = document.querySelector(".searchStatus");

  if (searchInput && searchStatus) {
    const debouncedSearch = debounce((query) => {
      searchStatus.textContent = `Searching for: ${query}`;
    }, 500);

    searchInput.addEventListener("input", (e) => {
      debouncedSearch(e.target.value); // Search triggered after typing stops
    });
  }
});
