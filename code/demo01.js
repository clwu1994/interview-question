var entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      xx: 'adxx'
    },
    e: 'ae'
  }
}
var output = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae'
}
var keys = [];
function flatMap(from, to) {
  for (var key in from) {
    var res = from[key];
    if (typeof res === "object") {
      keys.push(key);
      flatMap(res, to);
    } else {
      keys.push(key);
      to[keys.join(".")] = res;
    }
    keys.pop();
  }
}
