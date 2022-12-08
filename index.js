const pup = require("puppeteer");
const fs = require("fs");

(async function () {
  const urls = [
    "https://www.festival-sochi.ru/en/home-page/",
    "https://sochi.com/company-business/company/6562/493547/",
    "https://sochi.com/company-business/company/6403/488386/",
    "https://sochi.com/company-business/company/5737/488973/",
  ];
  const outputList = [];

  const browser = await pup.launch({ headless:true });

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`scraping results from ${url}`);
    const page = await browser.newPage();
    await page.goto(url);

    const data = await page.evaluate(function () {
      function extractEmails(text) {
        const emails = new Set();
        const matches = text.match(
          /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
        );
        if (matches != null) {
          matches.forEach((e) => emails.add(e));
        }
        return emails;
      }
      function extractPhoneNumbers(text) {
        const phones = new Set();
        const matches = text.match(
          /(8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}(\s|\-)?\d{2}(\s|\-)?\d{2}))/g
        );
        if (matches != null) {
          matches.forEach((e) => phones.add(e));
        }
        return phones;
      }

      let html = document.body.innerHTML.toString();
      var emails = extractEmails(html);
      var phones = extractPhoneNumbers(html);
      console.log(phones);

      return {
        phones: Array.from(phones),
        emails: Array.from(emails),
      };
    });

    console.log(data);
    console.log("--------------------------------------------------\n");

    const item = {};
    item[url] = data;
    outputList.push(item);
  }

  const output = JSON.stringify(outputList);
  const outputFile = "./output.json";
  if (fs.existsSync(outputFile)) {
    fs.rmSync(outputFile);
  }
  fs.writeFile("./output.json", output, "utf8", function (err) {
    if (err) {
      return console.log(err);
    }
  });

  await browser.close();
})();

