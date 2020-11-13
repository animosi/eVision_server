import * as puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    devtools: false,
  });
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.type('#gsr', 'booty', { delay: 100 }); // type inside search box element
  await page.keyboard.press('Enter'); // press enter
  await page.waitForNavigation(); //wait for page to finish loading
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
