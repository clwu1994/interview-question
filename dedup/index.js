/**
 * 有一个大数组,var a = ['1', '2', '3', ...]; a的长度是100,内容填充随
 * 机整数的字符串.请先构造此数组a,然后设计一个算法将其内容去重
 */
// const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
// const randomArray = Array.from({length: 100}, _ => String(getRandomInt(100)));
// const dedupedArray = [...new Set(randomArray)].sort((a, b) => a - b);

/**
 * 用100个随机整数对应的字符串填充数组。
 */
function fillArray(arr, start, end) {
  var i = arr.length;
  while(i--) {
    arr[i] = Math.floor(Math.abs(end - start) * Math.random()) + Math.min(start, end) + '';
  }
  return arr;
}

function dedup(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    if (!~result.indexOf(item)) {
      result.push(item)
    }
  }
  return result;
}
var arr = new Array(100);
var randomArray = fillArray(arr, 0, 100).sort((a, b) => a - b);
console.log(dedup(randomArray));