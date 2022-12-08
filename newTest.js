const puppeteer = require("puppeteer"); // ^19.0.0

let browser;
(async () => {
//   const searchQuery = "stack overflow";
let counter = 0;
  browser = await puppeteer.launch({headless:false});
  const [page] = await browser.pages();
  await page.setRequestInterception(true);
  page.on("request", request => {
    request.resourceType() === "document" ? 
      request.continue() : request.abort();
  });
  await page.goto("https://www.google.com/", {waitUntil: "domcontentloaded"});
  await page.waitForSelector('input[aria-label="Search"]', {visible: true});
  await page.keyboard.press('Enter');
  await Promise.all([
    page.waitForNavigation({waitUntil: "domcontentloaded"}),
    page.keyboard.press("Enter"),
  ]);
  await page.waitForSelector(".LC20lb", {visible: true});
  const searchResults = await page.$$eval(".LC20lb", els => 
    els.map(e => ({title: e.innerText, link: e.parentNode.href}))
  );
  console.log(searchResults);
})()
  .catch(err => console.error(err))
;