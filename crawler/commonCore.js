// Initialization
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

var coreStr = "";
const begParen = new RegExp(' [\u0028]', 'g');
const endParen = new RegExp('[\u0029]', 'g');

(async () => {
  try {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();


  await page.goto("https://catalog.etown.edu/content.php?catoid=24&navoid=1223#Common_Core");
  const coreList = await page.$$('.block_content h4');

  const handler = await Promise.all(
    coreList.map(handle => handle.getProperty('innerText')),
  );
  const core = await Promise.all(
     handler.map(handle => handle.jsonValue())
  );

  for (i in core) {
    coreStr += core[i]  + "\n";
  }

coreStr = coreStr.replace(begParen, ", ");
coreStr = coreStr.replace(endParen, " ");

// Write out courses to core.txt
  var csvFile = 'C:\\Users\\shfak\\OneDrive\\Desktop\\seniorProject\\Etown-Degree-Planner\\Etown-Degree-Planner\\crawler\\core.csv';
  if (fs.existsSync(csvFile)) {
    console.log("EXISTS, OVERWRITING FILE");
    fs.writeFile('./core.csv', coreStr, (error) => {
      if (error) throw error;
    })
  }
  else {
    console.log("DOES NOT EXIST");
    fs.writeFile('./core.csv', coreStr, (error) => {
      if (error) throw error;
    })
  }

  await browser.close();
} catch (error) {
  console.log(error);
}
})();
