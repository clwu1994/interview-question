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
  while (prop = keyArr.pop()) {
    let result = {};
    result[prop] = value;
    value = result;
  }
  return value;
}

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call(Object);

function isFunction(object) {
  return toString.call(object) === '[object Function]';
}

function isPlainObject(obj) {
  var proto, Ctor;

  // Detect obvious negatives
  // Use toString instead of jQuery.type to catch host objects
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }

  proto = Object.getPrototypeOf(obj);

  // Objects with no prototype (e.g., `Object.create( null )`) are plain
  if (!proto) {
    return true;
  }

  // Objects with prototype are plain iff they were constructed by a global Object function
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
}

function deepCopy() {
  var options, name, src, copy, copyIsArray, clone,
    // 初始化目标值为参数列表第一项，如果没有是假值则为{}
    target = arguments[0] || {},
    // 下标为1;
    i = 1,
    // 参数列表长度
    length = arguments.length,
    // 默认不深拷贝
    deep = false;

  // 处理深度复制情况
  // 如果第一项是布尔值
  if (typeof target === "boolean") {
    // 把参数第一项赋值给deep变量，让用户自定义是否深度拷贝
    deep = target;

    // 跳过布尔值和目标值
    // 此时目标值为参数列表第二项
    target = arguments[i] || {};
    // 此时下标为2
    i++;
  }

  // 当目标是字符串或其他内容时处理大小写（可能是深拷贝）
  // 当目标值不是对象或者不是一个函数时（这个时候目标值可能是参数列表第一项或者第二项，即用户第一项传的布尔值时），重新为目标值赋值{}
  if (typeof target !== "object" && !isFunction(target)) {
    target = {};
  }

  // 如果只传递了一个参数，则扩展jquery本身
  // 可能是$.extend({}或者$.extend([true/false], {})	
  if (i === length) {
    target = this;
    i--; // 0 或者 1
  }

  // 这里是jquery深/浅拷贝方法的主要逻辑
  for (; i < length; i++) {

    // 只处理非空/未定义的值
    if ((options = arguments[i]) != null) {

      // 扩展基础对象
      for (name in options) {
        copy = options[name];

        // 防止对象.原型污染
        // 防止永不结束的循环
        if (name === "__proto__" || target === copy) {
          continue;
        }

        // 如果要合并纯对象或数组，则递归
        if (deep && copy && (isPlainObject(copy) ||
          (copyIsArray = Array.isArray(copy)))) {
          src = target[name];

          // 确保源值的类型正确
          if (copyIsArray && !Array.isArray(src)) {
            clone = [];
          } else if (!copyIsArray && !isPlainObject(src)) {
            clone = {};
          } else {
            clone = src;
          }
          copyIsArray = false;

          // 从不移动原始对象，克隆它们
          target[name] = deepCopy(deep, clone, copy);

          // 不要引入未定义的值
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  // 返回修改后的对象
  return target;
};
var entriesSet = Object.entries(entry).map(([keyStr, value]) => convert(keyStr, value));
var result = {}
console.log('entriesSet => ', JSON.stringify(entriesSet, 2, null));
deepCopy(true, result, ...entriesSet);
console.log('result =>', JSON.stringify(result, 2, null));