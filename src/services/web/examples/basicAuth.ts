import * as puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.authenticate({ username: 'admin', password: '123456' });

  await page.goto('https://httpbin.org/basic-auth/admin/x');

  debugger;

  // await browser.close();
})();
