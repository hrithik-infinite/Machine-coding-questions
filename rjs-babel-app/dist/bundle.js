define("math", [], function () {
  return {
    add: function (n, e) {
      return n + e;
    }
  };
}),
  define("message", [], function () {
    return {
      hello: function (n) {
        return "Hello, ".concat(n, "!");
      }
    };
  }),
  require(["./math", "./message"], function (n, e) {
    console.log(n.add(10, 15)), console.log(e.hello("Hrithik"));
  }),
  define("main", function () {});
