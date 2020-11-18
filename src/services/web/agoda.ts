import * as puppeteer from 'puppeteer';
import cheerio from 'cheerio';

const url = 'https://www.agoda.com';

export default (async () => {
  const browser = await puppeteer.launch({ headless: false });
  console.log('agoda UP');
})();
