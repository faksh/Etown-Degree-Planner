// Initialization
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

var linkList = "";
var courseReq = "";
var otherReqs = "";

// Scrape all courses with name, # credits, and description.
(async () => {
  try {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();


// Fetch links for each Degree/Program
 await page.goto('https://catalog.etown.edu/content.php?catoid=24&navoid=1231');

// Fetch all links for each degree/program
const links = await page.$$('ul.program-list li a');
    const propertyJsHandles = await Promise.all(
      links.map(handle => handle.getProperty('href'))
    );
    const link = await Promise.all(
      propertyJsHandles.map(handle => handle.jsonValue()),
    );

 for (let i in link) {
  linkList += link[i] + "\n";
}


// Write out courses to degreeLinks.txt
  var linktxtFile = 'C:\\Users\\shfak\\OneDrive\\Desktop\\seniorProject\\Etown-Degree-Planner\\Etown-Degree-Planner\\crawler\\degreeLinks.txt';
  if (fs.existsSync(linktxtFile)) {
    console.log("EXISTS, OVERWRITING FILE");
    fs.writeFile('./degreeLinks.txt', linkList, (error) => {
      if (error) throw error;
    })
  }
  else {
    console.log("DOES NOT EXIST");
    fs.writeFile('./degreeLinks.txt', linkList, (error) => {
      if (error) throw error;
    })
  }




  // Fetch Required and Suggested Courses for each degree
  for (let i in link) {
    await page.goto(link[i]);

   // Required Courses
   const requirements = await page.$$('div.acalog-core li');

   // Fetch Required and Suggested Courses
   const reqHandler = await Promise.all(
       requirements.map(handle => handle.getProperty('innerText'))
   );

   const reqCourse = await Promise.all(
     reqHandler.map(handle => handle.jsonValue())
   );


   // Fetch other notes and info about major
   const otherReq = await page.$$('div.acalog-core h2, div.acalog-core p');

   const req2Handler = await Promise.all(
     otherReq.map(handle => handle.getProperty('innerText'))
   );

   const reqOther = await Promise.all(
     req2Handler.map(handle => handle.jsonValue())
   );

   // Add all courses and suggested courses
   for (let i in reqCourse) {
     courseReq += reqCourse[i] + "\n";
   }

   // Add other degree requirements
   for (let k in reqOther) {
     otherReqs += reqOther[k] + "\n";
   }

   courseReq += "\n\n\n**************************** NEW DEGREE **************************** \n\n";
   otherReqs += "\n\n\n**************************** NEW DEGREE **************************** \n\n";

}

   // Write out course requirements to couseReq.txt
     var txtFile = 'C:\\Users\\shfak\\OneDrive\\Desktop\\seniorProject\\Etown-Degree-Planner\\Etown-Degree-Planner\\crawler\\courseReq.txt';
     if (fs.existsSync(txtFile)) {
       console.log("EXISTS, OVERWRITING FILE");
       fs.writeFile('./courseReq.txt', courseReq, (error) => {
         if (error) throw error;
       })
     }
     else {
       console.log("DOES NOT EXIST");
       fs.writeFile('./courseReq.txt', courseReq, (error) => {
         if (error) throw error;
       })
     }


     // Write out other requirements to otherReq.txt
       var txtFile = 'C:\\Users\\shfak\\OneDrive\\Desktop\\seniorProject\\Etown-Degree-Planner\\Etown-Degree-Planner\\crawler\\otherReqs.txt';
       if (fs.existsSync(txtFile)) {
         console.log("EXISTS, OVERWRITING FILE");
         fs.writeFile('./otherReqs.txt', otherReqs, (error) => {
           if (error) throw error;
         })
       }
       else {
         console.log("DOES NOT EXIST");
         fs.writeFile('./otherReqs.txt', otherReqs, (error) => {
           if (error) throw error;
         })
       }


await browser.close();
} catch (error) {
console.log(error);
}
})();
