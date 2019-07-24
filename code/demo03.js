var entry = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae'
}

// 要求转换成如下对象
var output = {
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

function convert(keyStr, value) {
  let keyArr = keyStr.split('.');
  let prop;
  while(prop = keyArr.pop()) {
    let result = {};
    result[prop] = value;
    value = result;
  }
  return value;
}

function deepCopy(target, ...args) {
  if (typeof target !== 'object') target = {};
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      if (typeof target[key] === 'object' && target[key] !== null) {
        deepCopy(target[key])
      } else {
        if (target[key] !== arg[key]) {
          
        }
      }
    }
  }
}
var entriesSet = Object.entries(entry).map(([keyStr, value]) => convert(keyStr, value));
console.log(entriesSet);