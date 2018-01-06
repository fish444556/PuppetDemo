const puppeteer = require('puppeteer');
const _ = require('lodash')

const getBookNamesOfOneType = async ({type: str, link: url}) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	debugger
	const res = await page.evaluate(() => {
		const res = [];
		const lis = document.querySelectorAll('article');
		debugger
		for (var i = 0; i < lis.length; i++) {
			res.push({
				title: lis[i].querySelector('h3').innerText,
				price: lis[i].querySelector('.price_color').innerText
			});
		}
		return res;
	});
	browser.close();
	return res;
}


const getBookTypes = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('http://books.toscrape.com/');

	const bookTypes = await page.evaluate(() => {
		const lis = document.querySelector('#default > div > div > div > aside > div.side_categories > ul > li > ul').children;
		const bookTypes = [];
		for (let i = 0; i < 2; i++) {
		// for (let i = 0; i < lis.length; i++) {
			bookTypes.push({type: lis[i].innerText, link: lis[i].children[0].href});
		}
		return bookTypes;
	});
	debugger
	console.log(bookTypes);
	const bookData = [];
	await _.forEach(bookTypes, (ele) => {
		// console.log(ele.type)
		let tmp = '';
		getBookNamesOfOneType({type: ele['type'], link: ele['link']}).then(val => {
			// console.log('val = ', val)
			bookData.push({type: ele.type, titlePrice: val});
			// console.log('bbbbbbbbb', bookData)
			return bookData
		});

	})
	browser.close();
	// console.log('bookData = ', bookData);
	return bookData;
}


getBookTypes().then(val => {
	// ???? Cannot show correct value in the following value
	// I do not fully understand how to use async functions
	console.log('val +++++++++ ', val)
} )
