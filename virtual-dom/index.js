/**
 * <ul id='list'>
 * <li class='item'>Item 1</li>
 * <li class='item'>Item 2</li>
 * <li class='item'>Item 3</li>
 * </ul>
 */

// var element = {
//   tagName: 'ul', // 节点标签名
//   props: { // DOM的属性，用一个对象存储键值对
//     id: 'list'
//   },
//   children: [ // 该节点的子节点
//     {tagName: 'li', props: {class: 'item'}, children: ["Item 1"]},
//     {tagName: 'li', props: {class: 'item'}, children: ["Item 2"]},
//     {tagName: 'li', props: {class: 'item'}, children: ["Item 3"]},
//   ]
// }
import el from "./element";
var ul = el("ul", { id: "list" }, [
  el("li", { class: "item" }, ["Item 1"]),
  el("li", { class: "item" }, ["Item 2"]),
  el("li", { class: "item" }, ["Item 3"])
]);

var ulRoot = ul.render();
document.body.appendChild(ulRoot);
