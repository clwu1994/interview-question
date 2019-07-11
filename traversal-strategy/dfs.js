/*深度优先遍历三种方式*/
// function deepTraversal1(node, nodeList = []) {
//   if (node!== null) {
//     nodeList.push(node);
//     let children = node.children;
//     for (let i = 0; i < children.length; i++) {
//       deepTraversal1(children[i], nodeList)
//     }
//   }
//   return nodeList;
// }

// function deepTraversal2(node) {
//   debugger
//   let nodes = [];
//   if (node !== null) {
//     nodes.push(node)
//     let children = node.children;
//     for (let i = 0; i < children.length; i++) {
//       nodes = nodes.concat(deepTraversal2(children[i]));
//     }
//   }
//   return nodes;
// }

function deepTraversal3(node) {
  debugger
  let stack = [];
  let nodes = [];
  if (node) {
    // 推入当前处理的node
    stack.push(node);
    while (stack.length) {
      let item = stack.pop()
      let children = item.children
      nodes.push(item)
      // node = [] stack = [parent]
      // node = [parent] stack = [child3,child2,child1]
      // node = [parent, child1] stack = [child3,child2,child1-2,child1-1]
      // node = [parent, child1-1] stack = [child3,child2,child1-2]
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i])
      }
    }
  }
  return nodes;
}
// nodes [div.parent, div.child-1 , div.child-1-1-1] stack [ div.child-3, div.child-2]