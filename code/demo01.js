var obj = {
  a: {
    b: {
      c: {
        dd: 'hello',
        cc: 'world'
      },
      d: 'sasa'
    },
    xx: {
      sas: {
        name: 'xiaozhang'
      }
    }
  }
}
// output:
// var obj1 = {
//   'a.b.c.dd': 'hello',
//   'a.b.c.cc': 'world',
//   'a.b.d': 'sasa',
//   'a.xx.sas.name': 'xiaozhang'
// }
var keys = []
function flatMap(from, to) {
  for (var key in from) {
    var res = from[key];
    if (typeof res === 'object') {
      keys.push(key);
      flatMap(res, to);
      keys.pop();
    } else {
      keys.push(key);
      to[keys.join('.')] = res;
      keys.pop();
    }
  }
}

var obj1 = {};
flatMap(obj, obj1);
console.log(obj1)