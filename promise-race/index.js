Promise._race = promises => new Promise((resolve, reject) => {
  promises.forEach(promise => {
    promise.then(resolve, reject)
  });
});

function sleep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1000)
    }, 1000)
  });
}
function sleep1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(500)
    }, 500)
  });
}

Promise._race([sleep(), sleep1()]).then(res => {
  console.log(res);
})