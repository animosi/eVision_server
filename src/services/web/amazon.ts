import * as puppeteer from 'puppeteer';
import amazonProd, { IAmazonproduct } from '../../models/amazon.product';

let browser = null;
let page = null;

export default {
  initialize: async () => {
    console.log('initializing...');
    try {
      browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
      });
      page = await browser.newPage();
    } catch (err) {
      console.log(err);
    }
    console.log('initialization complete');
  },
  getProduct: async (url: string) => {
    console.log('seaching for product');
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      // get product
      const productInfo: IAmazonproduct = await page.evaluate(() => {
        const title = document.querySelector<HTMLElement>('#productTitle')
          .innerText;
        const price = document.querySelector<HTMLElement>(
          '#priceblock_ourprice,#priceblock_dealprice'
        ).innerText;
        const manufacturer = document.querySelector<HTMLElement>('#bylineInfo')
          .innerText;

        const rating = document
          .querySelector('#acrPopover')
          .getAttribute('title');

        const totalRatings = document.querySelector<HTMLElement>(
          '#acrCustomerReviewText'
        ).innerText;

        return { title, price, manufacturer, rating, totalRatings };
      });
      console.log(productInfo);
      //save to db
      const product: IAmazonproduct = new amazonProd({ ...productInfo });
      await product.save();
    } catch (err) {
      console.log(err);
    }
    console.log('done');
  },

  end: async () => {
    await browser.close();

    console.log('closing browser');
  },
};
