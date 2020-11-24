import * as puppeteer from 'puppeteer';
import amazonProduct, { IAmazonproduct } from '../../models/amazon.product';

const link = `https://www.amazon.com/ASUS-ROG-Zephyrus-i7-10750H-Backlight/dp/B08DG196CC/ref=sr_1_8_mod_primary_new?crid=THGVYCUUE31A&dchild=1&keywords=g14+zephyrus&qid=1606117881&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=g14+z%2Caps%2C417&sr=8-8`;
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
  getProduct: async () => {
    console.log('seaching for product');
    try {
      await page.goto(link, { waitUntil: 'networkidle2' });
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
      const product: IAmazonproduct = new amazonProduct({ ...productInfo });
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
