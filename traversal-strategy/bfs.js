function widthTraversal(node) {
  let nodes = [];
  let stack = [];
  if (node) {
    stack.push(node);
    while(stack.length) {
      let item = stack.shift()
      let children = item.children
      nodes.push(item)
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i])
      }
    }
  }
  return nodes;
}
