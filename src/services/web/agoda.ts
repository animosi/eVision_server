import * as puppeteer from 'puppeteer';

const url = 'https://www.agoda.com';

export default async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    // args: ['--proxy-server=171.96.82.155:8080'],
  });

  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector(
    '#SearchBoxContainer > div.sc-AxiKw.htayzq.TabContent > div > div.sc-AxiKw.jTgagc > div > div > div.IconBox.IconBox--autocomplete.IconBox--focused > div > div > input'
  );
  await page.click(
    'input[class="SearchBoxTextEditor SearchBoxTextEditor--autocomplete"]'
  );
  await page.type('input[data-selenium="textInput"]', 'cockbang');

  //  '"aria-label="Enter a destination or property"'
  // await page.goto('https://httpbin.org/ip');
};
