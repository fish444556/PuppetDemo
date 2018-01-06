const puppeteer = require('puppeteer');

let scrape = async () => {
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	await page.goto('http://books.toscrape.com/');

	await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');
	await page.waitFor(1000);

	const res = await page.evaluate(() => {
		let title = document.querySelector('h1').innerText;
		console.log('insile title = ',title);
		let price = document.querySelector('#content_inner > article > div.row > div.col-sm-6.product_main > p.price_color').innerText;
		return {
			title,
			price
		}
	})
	browser.close();
	return res;
};

scrape().then(val => {
	console.log(val);
})

