var entry = {
  a: {
    b: {
      c: {
        dd: "abcdd",
        ff: "abcff"
      }
    },
    d: {
      xx: "adxx"
    },
    e: "ae"
  }
};

var keys = [];
function flatObj(from, to) {
  for (var key in from) {
    var res = from[key];
    keys.push(key);
    if (typeof res === "object") {
      flatObj(res, to);
    } else {
      to[keys.join(".")] = res;
    }
    keys.pop();
  }
}

// function en(obj) {
//   const keyArr = [];
//   const newObj = {};
//   const _c = function (o) {
//       for (k in o) {
//           keyArr.push(k);
//           if (typeof o[k] === 'object') {
//               _c(o[k]);
//           } else {
//               newObj[keyArr.join('.')] = o[k];
//               keyArr.pop();
//           }
//       }
//       keyArr.pop();
//   }
//   _c(obj);
//   return newObj;
// }

// function flatObj(obj, parentKey = "", result = {}) {
//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       let keyName = `${parentKey}${key}`;
//       if (typeof obj[key] === 'object')
//         flatObj(obj[key], keyName+".", result)
//       else
//         result[keyName] = obj[key];
//     }
//   }
//   return result;
// }

// var output = {};
// flatObj(entry, output)
// console.log(en(entry));
