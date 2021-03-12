// Initialization
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// Variables
var degreeList = "";
bullet = String.fromCharCode(8226);
const bullets = new RegExp('[\u2022]', 'g');

// Fetch all available degrees offered by Elizabethtown College
(async () => {
  try {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://catalog.etown.edu/content.php?catoid=24&navoid=1231');

//Fetch all degrees/programs
const degrees = await page.$$('.program-list, table.table_default p strong');
   const handler = await Promise.all(
     degrees.map(handle => handle.getProperty('innerText')),
   );
   const degree = await Promise.all(
      handler.map(handle => handle.jsonValue())
   );


for (var i in degree) {
  degreeList += degree[i] + "," + "\n";
  //console.log(degree[i]);
}

//console.log("ASCII value of ", degreelist[0], ": ", degreelist.charCodeAt(0)); 8226


// Regex removing bullets
degreeList.toString();
degreeList = degreeList.replace(bullets, "");
//console.log(degreeList);


// Write out courses to degrees.txt
  var dgtxtFile = 'C:\\Users\\shfak\\OneDrive\\Desktop\\seniorProject\\Etown-Degree-Planner\\Etown-Degree-Planner\\crawler\\degrees.csv';
  if (fs.existsSync(dgtxtFile)) {
    console.log("EXISTS, OVERWRITING FILE");
    fs.writeFile('./degrees.csv', degreeList, (error) => {
      if (error) throw error;
    })
  }
  else {
    console.log("DOES NOT EXIST");
    fs.writeFile('./degrees.csv', degreeList, (error) => {
      if (error) throw error;
    })
  }


await browser.close();
} catch (error) {
console.log(error);
}
})();
