import { REPLACE, REORDER, PROPS, TEXT } from "./const";
function patch(node, patches) {
  var walker = { index: 0 };
  dfsWalk(node, walker, patches);
}

function dfsWalk(node, walker, patches) {
  var currentPatches = patches[walker.index]; // 从patches拿出当前节点的差异
  var len = node.childNodes ? node.childNodes.length : 0;
  // 深度遍历子节点
  for (var i = 0; i < len; i++) {
    var child = node.childNodes[i];
    walker.index++;
    dfsWalk(child, walker, patches);
  }
  if (currentPatches) {
    applyPatches(node, currentPatches); // 对当前节点进行DOM操作
  }
}

function applyPatches(node, currentPatches) {
  currentPatches.forEach(currentPatch => {
    switch (currentPatch.type) {
      case REPLACE:
        node.parentNode.replaceChild(currentPatch.node.render(), node);
        break;
      case REORDER:
        reorderChildren(node, currentPatch.moves);
        break;
      case PROPS:
        setProps(node, currentPatch.props);
        break;
      case TEXT:
        node.textContent = currentPatch.content;
        break;
      default:
        throw new Error("Unknown patch type " + currentPatch.type);
    }
  });
}

// 重新排序
function reorderChildren() {}

// 设置属性
function setProps() {}
