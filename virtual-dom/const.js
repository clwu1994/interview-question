/**
 * 1. 替换掉原来的节点，例如把上面的div换成了section
 * 2. 移动、删除、新增子节点，例如上面div的子节点，把p和ul顺序互换
 * 3. 修改了节点的属性
 * 4. 对于文本节点，文本内容可能会改变。例如修改上面的文本节点2内容为Virtual DOM 2。
 */
export const REPLACE = 0;
export const REORDER = 1;
export const PROPS = 2;
export const TEXT = 3;