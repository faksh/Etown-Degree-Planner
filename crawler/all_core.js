// Initialization
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const db = require('../config/db.config.js');
const Core = db.Core;

const allCoreArr = [];

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

allCore = "";

for(i in core) {
    allCoreArr.push(core[i]);
  }
console.log(allCoreArr);


// extract a core and push it to the all_cores list
for (let i=0; i<allCoreArr.length; i++) {
  const obj = extractCoreItems(allCoreArr[i]);
  insertToDB(obj);
}
//console.log(allCoreArr[i]);


  await browser.close();
} catch (error) {
  console.log(error);
}
})();

// Save to MySQL Database
function insertToDB(core) {

    Core.create(core).then(result => {
        // send uploading message to client, TEST
        console.log(core['coreID'] + " insert Successfully!");
    }).catch(err => {
        console.error(err);
        console.log(core);
    });
}

function extractCoreItems(allCores) {
    //console.log("All Cores: \n" + allCores + "\n");
    const core_items = allCores.trim().split('\n');
    //console.log(core_items);
    var object = {};
    // extract the name and type
    object['name'] = allCores.trim().split(',')[0];
    object['amount'] = allCores.trim().split(',')[1];
    //console.log(object);

    return object;
}