import * as puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https:learnscraping.com');

  debugger;

  // await browser.close();
})();
