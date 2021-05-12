// Initialization
const fs = require('fs');
const querystring = require('querystring');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const db = require('../config/db.config.js');
const Degree = db.Degree;

// Variables
var degreeList = "";
bullet = String.fromCharCode(8226);
const bullets = new RegExp(/[\u002c]?[\u2022]\s*/, 'g');

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

for (let i in degree) {
  degreeList += degree[i] + "\n";
}

// Array of Degree Types
var degreeTypes = [];
for (let i in degree) {
  if(i%2==0)
    degreeTypes.push(degree[i]);
}

// Assign Degree Type to each degree
var count=-1;
allDegreesArr = [];
allDegrees = "";

for (let i in degree) {
  degreeGroup = "";
  eachDegree = "";
  if(i%2!=0) {
    degreeGroup = degree[i].split('\n');
    count++;
  }

  for(i in degreeGroup) {
    eachDegree = degreeGroup[i] + ", " + degreeTypes[count]  + "\n";
    eachDegree = eachDegree.replace(bullets, "");
    allDegreesArr.push(eachDegree);
  }
}


for (let i in allDegreesArr) {
  allDegrees += allDegreesArr[i];
}

// extract a degree and push it to the all_degrees list
for (let i=0; i<allDegreesArr.length; i++) {
  //console.log(allDegreesArr[i]);
  const obj = extractDegreeItems(allDegreesArr[i]);
  insertToDB(obj);
}

/* TESTING
// Write out courses to all_degrees.csv
  var dgtxtFile = 'C:\\Users\\shfak\\OneDrive\\Desktop\\seniorProject\\Etown-Degree-Planner\\Etown-Degree-Planner\\crawler\\all_degrees.csv';
  if (fs.existsSync(dgtxtFile)) {
    console.log("EXISTS, OVERWRITING FILE");
    fs.writeFile('./all_degrees.csv', allDegrees, (error) => {
      if (error) throw error;
    })
  }
  else {
    console.log("DOES NOT EXIST");
    fs.writeFile('./all_degrees.csv', allDegrees, (error) => {
      if (error) throw error;
    })
  }
*/

await browser.close();
} catch (error) {
console.log(error);
}
})();

// Save to MySQL database
function insertToDB(degree) {

    Degree.create(degree).then(result => {
        // send uploading message to client, TEST
        console.log(degree['name'] + " insert Successfully!");
    }).catch(err => {
        console.error(err);
        console.log(degree);
    });
}

function extractDegreeItems(allDegrees) {
    //console.log("All Degrees: \n" + allDegrees + "\n");
    const degree_items = allDegrees.trim().split('\n');
    //console.log(degree_items);
    var object = {};
    // extract the name and type
    object['name'] = allDegrees.trim().split(',')[0];
    object['type'] = allDegrees.trim().split(',')[1];
    //console.log(object);

    return object;
}