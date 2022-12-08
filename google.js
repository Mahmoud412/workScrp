const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const scrpGoogle = async (totalNumberOfPages) => {
    let counter = 0;
    const page = await browser.newPage();
    await page.goto("https://www.google.com/", { waitUntil: "networkidle2" });
    await page.waitForSelector('input[aria-label="Search"]', { visible: true });
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    ]);
    do {
      if (totalNumberOfPages === counter) {
        break;
      }
      counter++;
      try {
        await Promise.all([
          page.waitForNavigation({ waitUntil: "networkidle2" }),
          page.click("a[id=pnnext]"),
        ]);

        await page.waitForSelector(".LC20lb", { visible: true, timeout: 0 });
        const pagesLinksResults = await page.$$eval(".LC20lb", (els) =>
          els.map((e) => ({ link: e.parentNode.href }))
        );

        links = links.concat(pagesLinksResults);
        console.log(links);
        console.log("--------------------------------------------------\n");
      } catch (err) {
        console.log(err);
      }
    } while (await page.$("a[id=pnnext]"));
  };

  var links = [];
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 300,
  });
  const totalNumberOfPages = 3;
  scrpGoogle(totalNumberOfPages);
})();
