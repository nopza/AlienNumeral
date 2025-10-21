function alienToInt(s) {
  var alienValues = {
    A: 1,
    B: 5,
    Z: 10,
    L: 50,
    C: 100,
    D: 500,
    R: 1000,
  };
  var total = 0;
  for (var i = 0; i < s.length; i++) {
    var char = s[i];

    var value = alienValues[char];

    var nextValue = 0;
    if (i + 1 < s.length) {
      var nextChar = s[i + 1];
      nextValue = alienValues[nextChar];
    }
    if (value < nextValue) {
      total -= value;
    } else {
      total += value;
    }
  }
  return total;
}
var s = "RCRZCAB";
console.log("Input: s =", s);
console.log("Output =", alienToInt(s));
