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
        node.value = vm.$data[name];
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
      node.nodeValue = node.nodeValue.replace(
        new RegExp("\\{\\{\\s*(" + name + ")\\s*\\}\\}"),
        vm.$data[name]
      );
    }
  }
}

function MVue(options) {
  this.$el = options.el;
  this.$data = options.data;

  // 模板编译
  let elem = document.querySelector(this.$el);
  elem.appendChild(nodeToFragment(elem, this));
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
