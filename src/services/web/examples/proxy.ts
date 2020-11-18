import * as puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--proxy-server=IP:PORT'],
  });
  const page = await browser.newPage();

  await page.goto('https://httpbin.org/ip');

  debugger;

  // await browser.close();
})();
