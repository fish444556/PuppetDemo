/*
* 作者：撸起袖子吃鸡
* 链接：https://juejin.im/post/5a506682f265da3e474435d9
* 来源：掘金
* 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

* page.type 获取输入框焦点并输入文字
* page.keyboard.press 模拟键盘按下某个按键，目前mac上组合键无效为已知bug
* page.waitFor 页面等待，可以是时间、某个元素、某个函数
* page.frames() 获取当前页面所有的 iframe，然后根据 iframe 的名字精确获取某个想要的 iframe
* iframe.$('.srchsongst') 获取 iframe 中的某个元素
* iframe.evaluate() 在浏览器中执行函数，相当于在控制台中执行函数，返回一个 Promise
* Array.from 将类数组对象转化为对象
* page.click() 点击一个元素
* iframe.$eval() 相当于在 iframe 中运行 document.queryselector 获取指定元素，并将其作为第一个参数传递
* iframe.$$eval 相当于在 iframe 中运行 document.querySelectorAll 获取指定元素数组，并将其作为第一个参数传递

*/


const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
	const browser = await (puppeteer.launch({ headless: false }));
	const page = await browser.newPage();
	// 进入页面
	await page.goto('https://music.163.com/#');

	// 点击搜索框拟人输入 鬼才会想起
	const musicName = '鬼才会想';
	await page.type('.txt.j-flag', musicName, {delay: 0});

	// 回车
	await page.keyboard.press('Enter');

	// // 获取歌曲列表的 iframe
	await page.waitFor(2000);
	console.log('*****************    frames ******************************** ')
	console.log(page.frames())
	console.log('*****************    frames ******************************** ')
	let iframe = await page.frames().find(f => f.name() === 'contentFrame');

	console.log('---------------------    iframe ---------------------- ')
	console.log(iframe)
	console.log('---------------------    iframe ---------------------- ')
	const SONG_LS_SELECTOR = await iframe.$('.srchsongst');

	console.log('---------------------    SONG_LS_SELECTOR ---------------------- ')
	console.log(SONG_LS_SELECTOR)
	console.log('---------------------    SONG_LS_SELECTOR ---------------------- ')

	// // 获取歌曲 鬼才会想起 的地址
	// const selectedSongHref = await iframe.evaluate(e => {
	// 	const songList = Array.from(e.childNodes);
	// 	const idx = songList.findIndex(v => v.childNodes[1].innerText.replace(/\s/g, '') === '鬼才会想起');
	// 	return songList[idx].childNodes[1].firstChild.firstChild.firstChild.href;
	// }, SONG_LS_SELECTOR);

	// // 进入歌曲页面
	// await page.goto(selectedSongHref);

	// // 获取歌曲页面嵌套的 iframe
	// await page.waitFor(2000);
	// iframe = await page.frames().find(f => f.name() === 'contentFrame');

	// // 点击 展开按钮
	// const unfoldButton = await iframe.$('#flag_ctrl');
	// await unfoldButton.click();

	// // 获取歌词
	// const LYRIC_SELECTOR = await iframe.$('#lyric-content');
	// const lyricCtn = await iframe.evaluate(e => {
	// 	return e.innerText;
	// }, LYRIC_SELECTOR);

	// console.log(lyricCtn);

	// // 截图
	// await page.screenshot({
	// 	path: '歌曲.png',
	// 	fullPage: true,
	// });

	// // 写入文件
	// let writerStream = fs.createWriteStream('歌词.txt');
	// writerStream.write(lyricCtn, 'UTF8');
	// writerStream.end();

	// // 获取评论数量
	// const commentCount = await iframe.$eval('.sub.s-fc3', e => e.innerText);
	// console.log(commentCount);

	// // 获取评论
	// const commentList = await iframe.$$eval('.itm', elements => {
	// 	const ctn = elements.map(v => {
	// 		return v.innerText.replace(/\s/g, '');
	// 	});
	// 	return ctn;
	// });
	// console.log(commentList);
})();

