function MVue(options) {
  this.$el = options.el;
  this.$data = options.data;
  // 数据监听
  obverser(this.$data);
  // 模板编译
  let elem = document.querySelector(this.$el);
  elem.appendChild(nodeToFragment(elem, this));
}

// vue进行编译时，将挂载目标的所有子节点劫持到DocumentFragment中，
// 经过一份解析等处理后，再将DocumentFragment整体挂载到目标节点上。
function nodeToFragment(node, vm) {
  var flag = document.createDocumentFragment();
  var child;
  while ((child = node.firstChild)) {
    compile(child, vm);
    if (child.firstChild) {
      var dom = nodeToFragment(child, vm);
      child.appendChild(dom);
    }
    flag.appendChild(child);
  }
  return flag;
}

// 模板编译（指令解析，事件绑定、初始化数据绑定）
function compile(node, vm) {
  let reg = /\{\{(.*)\}\}/;
  // 元素节点
  if (node.nodeType === 1) {
    var attrs = node.attributes;
    for (let attr of attrs) {
      if (attr.nodeName === "v-model") {
        // 获取v-model指令绑定的data属性
        var name = attr.nodeValue;
        // 绑定事件
        node.addEventListener("input", function(e) {
          vm.$data[name] = e.target.value;
        });
        // 初始化数据绑定
        // node.value = vm.$data[name];
        new Watcher(vm, node, name);
        // 移除v-model 属性
        node.removeAttribute("v-model");
      }
    }
  }
  // 文本节点
  if (node.nodeType === 3) {
    if (reg.test(node.nodeValue)) {
      var name = RegExp.$1 && RegExp.$1.trim();
      // 绑定数据到文本节点中
      // node.nodeValue = node.nodeValue.replace(
      //   new RegExp("\\{\\{\\s*(" + name + ")\\s*\\}\\}"),
      //   vm.$data[name]
      // );
      new Watcher(vm, node, name);
    }
  }
}

// 实现model=>view 发布者-订阅者模式
function Dep() {
  this.subs = [];
}
Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub);
  },
  notify() {
    this.subs.forEach(sub => {
      // 执行订阅者的update方法
      sub.update();
    });
  }
};

// 实现订阅者
function Watcher(vm, node, name) {
  // 全局的、唯一
  Dep.target = this;
  this.node = node;
  this.name = name;
  this.vm = vm;
  this.index = node.nodeType;
  this.update();
  Dep.target = null;
}
Watcher.prototype = {
  update() {
    this.get();
    let _name;
    if (this.index === 1) {
      _name = this.name;
    } else {
      _name = this.value;
    }
    if (this.node.nodeName === "INPUT") {
      this.node.value = this.value;
    } else {
      // this.node.nodeValue = this.value;
      this.node.nodeValue = this.node.nodeValue.replace(
        new RegExp("\\{?\\{?\\s*(" + _name + ")\\s*\\}?\\}?"),
        this.value
      );
    }
    ++this.index;
  },
  get() {
    this.value = this.vm.$data[this.name];
  }
};

// 实现一个obverser给data中每个属性添加一个主题对象
// 遍历data中的所有属性,包括子属性对象的属性
function obverser(obj) {
  Object.keys(obj).forEach(key => {
    if (obj[key].constructor === "Object") {
      obverser(obj[key]);
    }
    defineReactive(obj, key);
  });
}

// 使用Object.definePeoperty()来监听属性变动，给属性添加setter和getter
function defineReactive(obj, key) {
  var _value = obj[key];
  // new一个主题对象
  var dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    set(newVal) {
      if ((_value === newVal)) {
        return;
      }
      _value = newVal;
      // 作为发布者发出通知给主题对象
      dep.notify();
    },
    get() {
      // 如果订阅者存在，添加到主题对象中
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return _value;
    }
  });
}
