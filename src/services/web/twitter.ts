import * as puppeteer from 'puppeteer';

let browser = null;
let page = null;
const loginUrl = `https://twitter.com/login`;
const baseUrl = `http://twitter.com`;
const username = `misha@gmail.com`;
const password = `adfsdklkd`;

export default {
  initialize: async () => {
    browser = await puppeteer.launch({
      headless: false,
      // args: ['--proxy-server=ip:port'],
    });
    page = await browser.newPage();
  },
  scrape: async () => {
    await page.goto(loginUrl);
    await page.waitForSelector('input[name="session[username_or_email]"]');
    await page.type('input[name="session[username_or_email]"]', username, {
      delay: 25,
    });
    await page.type('input[name="session[password]"]', password, { delay: 25 });
    await page.click(
      'div[class="css-901oao r-1awozwy r-jwli3a r-6koalj r-18u37iz r-16y2uox r-1qd0xha r-a023e6 r-b88u0q r-1777fci r-eljoum r-dnmrzs r-bcqeeo r-q4m81j r-qvutc0"]'
    );
  },
  end: async () => {
    await browser.close();
  },
};
