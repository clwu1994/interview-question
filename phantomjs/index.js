const phantom = require('phantom')
const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')
function delay(second) {
  return new Promise((resolve) => {
    setTimeout(resolve, second * 1000);
  });
}
let url = 'https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&hs=0&xthttps=111111&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=%E5%8A%A8%E6%BC%AB+%E5%A3%81%E7%BA%B8&oq=%E5%8A%A8%E6%BC%AB+%E5%A3%81%E7%BA%B8&rsp=-1'
function save(url) {
  let ext = url.split('.').pop()
  request(url).pipe(fs.createWriteStream(`./image/${new Date().getTime()}.${ext}`));
}
(async function () {
  let instance = await phantom.create();
  let page = await instance.createPage();
  let status = await page.open(url);
  let size = await page.property('viewportSize', {
    width: 1920,
    height: 1080
  })
  let $
  async function pageScroll(i) {
    await delay(1)
    await page.property('scrollPosition', {
      left: 0,
      top: 1000 * i
    })
    let content = await page.property('content')
    $ = cheerio.load(content)
    if ($('.imgbox').length < 200) {
      await pageScroll(++i)
    }
  }
  await pageScroll(0)
  let urlList = []
  $('.imgbox').each(function () {
    urlList.push('https://image.baidu.com' + $(this).find('a').attr('href'))
  })
  async function imgSave(i) {
    let status = await page.open(urlList[i])
    await delay(1)
    let content = await page.property('content')
    $ = cheerio.load(content)
    let src = $('#currentImg').attr('src')
    save(src)
    if (i < urlList.length) {
      await imgSave(++i)
    }
  }
  await imgSave(0)
  await instance.exit()
}());
