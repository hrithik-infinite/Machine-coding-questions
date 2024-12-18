document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector(".clickBtn");
  const btn_press = document.querySelector(".incClick");
  const btn_trig = document.querySelector(".incTrig");
  let count = 0;
  let trigered = 0;

  function throttle(func, interval) {
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= interval) {
        lastCall = now;
        func.apply(this, args);
      }
    };
  }

  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  const debFcn = debounce(() => {
    btn_trig.innerHTML = ++trigered;
  }, 500);

  btn.addEventListener("click", function () {
    btn_press.innerHTML = ++count;
    debFcn();
  });

  const btn1 = document.querySelector(".clickBtn1");
  const btn_press1 = document.querySelector(".incClick1");
  const btn_trig1 = document.querySelector(".incTrig1");
  let count1 = 0;
  let trigered1 = 0;
  const th = throttle(() => {
    btn_trig1.innerHTML = ++trigered1;
  }, 800);
  btn1.addEventListener("click", function () {
    btn_press1.innerHTML = ++count1;
    th();
  });
});
