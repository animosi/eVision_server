import * as puppeteer from 'puppeteer';
import config from '../../../config/app';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://instagram.com/');
  await page.waitForSelector('#loginForm > div > div:nth-child(5) > button');
  await page.click('#loginForm > div > div:nth-child(5) > button');
  // await page.waitFor('a[href="/accounts/login/?source=auth_switcher"]');
  // await page.click('a[href="/accounts/login/?source=auth_switcher"]');
  // await page.waitFor(500);

  await page.waitForSelector('#email');
  await page.type('#email', `${config.instaUser}`);
  await page.type('#pass', `${config.instaPass}`);
  await page.click('#loginbutton');

  await browser.close();
})();
