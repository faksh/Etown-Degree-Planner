// Initialization
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// Scrape all courses with name, # credits, and description.
(async () => {
  try {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Store all classes in String
  var courses = "";
  const re = new RegExp(',*JSHandle:*', 'g');
  const newCourse = new RegExp('^\s+', 'g');


  // Required Courses -- page 1
  await page.goto('https://catalog.etown.edu/content.php?filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=1&cur_cat_oid=24&expand=1&navoid=1242&print=1#acalog_template_course_filter');
  const allcourses1 = await page.$$('table.table_default td.width li');
  const courseHandler1 = await Promise.all(
      allcourses1.map(handle => handle.getProperty('innerText'))
  );

  const course1 = await Promise.all(
    courseHandler1.map(handle => handle.jsonValue())
  );

  for (let i in courseHandler1) {
    courses += courseHandler1[i] + ",\n";
  }

  // Required Courses -- page 2
  await page.goto('https://catalog.etown.edu/content.php?catoid=24&navoid=1242&filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=2&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&expand=1&print#acalog_template_course_filter');
  const allcourses2 = await page.$$('table.table_default td.width li');
  const courseHandler2 = await Promise.all(
      allcourses2.map(handle => handle.getProperty('innerText'))
  );

  const course2 = await Promise.all(
    courseHandler2.map(handle => handle.jsonValue())
  );

  for (var i in courseHandler2) {
    courses += courseHandler2[i] + "\n";
  }


  // Required Courses -- page 3
  await page.goto('https://catalog.etown.edu/content.php?catoid=24&catoid=24&navoid=1242&filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=3&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&expand=1&print#acalog_template_course_filter');
  const allcourses3 = await page.$$('table.table_default td.width li');
  const courseHandler3 = await Promise.all(
      allcourses3.map(handle => handle.getProperty('innerText'))
  );

  const course3 = await Promise.all(
    courseHandler3.map(handle => handle.jsonValue())
  );

  for (var i in courseHandler3) {
    courses += courseHandler3[i] + "\n";
  }

  // Required Courses -- page 4
  await page.goto('https://catalog.etown.edu/content.php?catoid=24&catoid=24&navoid=1242&filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=4&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&expand=1&print#acalog_template_course_filter');
  const allcourses4 = await page.$$('table.table_default td.width li');
  const courseHandler4 = await Promise.all(
      allcourses4.map(handle => handle.getProperty('innerText'))
  );

  const course4 = await Promise.all(
    courseHandler4.map(handle => handle.jsonValue())
  );

  for (var i in courseHandler4) {
    courses += courseHandler4[i] + "\n";
  }


  // Required Courses -- page 5
  await page.goto('https://catalog.etown.edu/content.php?catoid=24&catoid=24&navoid=1242&filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=5&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&expand=1&print#acalog_template_course_filter');
  const allcourses5 = await page.$$('table.table_default td.width li');
  const courseHandler5 = await Promise.all(
      allcourses5.map(handle => handle.getProperty('innerText'))
  );

  const course5 = await Promise.all(
    courseHandler5.map(handle => handle.jsonValue())
  );

  for (var i in courseHandler5) {
    courses += courseHandler5[i] + "\n";
  }

  // Required Courses -- page 6
  await page.goto('https://catalog.etown.edu/content.php?catoid=24&catoid=24&navoid=1242&filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=6&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&expand=1&print#acalog_template_course_filter');
  const allcourses6 = await page.$$('table.table_default td.width li');
  const courseHandler6 = await Promise.all(
      allcourses6.map(handle => handle.getProperty('innerText'))
  );

  const course6 = await Promise.all(
    courseHandler6.map(handle => handle.jsonValue())
  );

  for (var i in courseHandler6) {
    courses += courseHandler6[i] + "\n";
  }


  // Required Courses -- page 7
  await page.goto('https://catalog.etown.edu/content.php?catoid=24&catoid=24&navoid=1242&filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=7&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&expand=1&print#acalog_template_course_filter');
  const allcourses7 = await page.$$('table.table_default td.width li');
  const courseHandler7 = await Promise.all(
      allcourses7.map(handle => handle.getProperty('innerText'))
  );

  const course7 = await Promise.all(
    courseHandler7.map(handle => handle.jsonValue())
  );

  for (var i in courseHandler7) {
    courses += courseHandler7[i] + "\n";
  }

  // Required Courses -- page 8
  await page.goto('https://catalog.etown.edu/content.php?catoid=24&catoid=24&navoid=1242&filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=8&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&expand=1&print#acalog_template_course_filter');
  const allcourses8 = await page.$$('table.table_default td.width li');
  const courseHandler8 = await Promise.all(
      allcourses8.map(handle => handle.getProperty('innerText'))
  );

  const course8 = await Promise.all(
    courseHandler8.map(handle => handle.jsonValue())
  );

  for (var i in courseHandler8) {
    courses += courseHandler8[i] + "\n";
  }


  // Required Courses -- page 9
  await page.goto('https://catalog.etown.edu/content.php?catoid=24&catoid=24&navoid=1242&filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=9&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&expand=1&print#acalog_template_course_filter');
  const allcourses9 = await page.$$('table.table_default td.width li');
  const courseHandler9 = await Promise.all(
      allcourses9.map(handle => handle.getProperty('innerText'))
  );

  const course9 = await Promise.all(
    courseHandler9.map(handle => handle.jsonValue())
  );

  for (var i in courseHandler9) {
    courses += courseHandler9[i] + "\n";
  }

  // Required Courses -- page 10
  await page.goto('https://catalog.etown.edu/content.php?catoid=24&catoid=24&navoid=1242&filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=10&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&expand=1&print#acalog_template_course_filter');
  const allcourses10 = await page.$$('table.table_default td.width li');
  const courseHandler10 = await Promise.all(
      allcourses10.map(handle => handle.getProperty('innerText'))
  );

  const course10 = await Promise.all(
    courseHandler10.map(handle => handle.jsonValue())
  );

  for (var i in courseHandler10) {
    courses += courseHandler10[i] + "\n";
  }

  // Required Courses -- page 11
  await page.goto('https://catalog.etown.edu/content.php?catoid=24&catoid=24&navoid=1242&filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=11&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&expand=1&print#acalog_template_course_filter');
  const allcourses11 = await page.$$('table.table_default td.width li');
  const courseHandler11 = await Promise.all(
      allcourses11.map(handle => handle.getProperty('innerText'))
  );

  const course11 = await Promise.all(
    courseHandler11.map(handle => handle.jsonValue())
  );

  for (var i in courseHandler11) {
    courses += courseHandler11[i] + "\n";
  }


  // Required Courses -- page 12
  await page.goto('https://catalog.etown.edu/content.php?catoid=24&catoid=24&navoid=1242&filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=12&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&expand=1&print#acalog_template_course_filter');
  const allcourses12 = await page.$$('table.table_default td.width li');
  const courseHandler12 = await Promise.all(
      allcourses12.map(handle => handle.getProperty('innerText'))
  );

  const course12 = await Promise.all(
    courseHandler12.map(handle => handle.jsonValue())
  );

  for (var i in courseHandler12) {
    courses += courseHandler12[i] + "\n";
  }


  // Regex removing JSHandle, double new lines
  courseStr = courses.toString();
  courseStr = courseStr.replace(re, "");
  courses = courses.replace(newCourse, "\n");


// Write out courses to courses.txt
  var txtFile = 'C:\\Users\\shfak\\OneDrive\\Desktop\\seniorProject\\Etown-Degree-Planner\\Etown-Degree-Planner\\crawler\\courses.txt';
  if (fs.existsSync(txtFile)) {
    console.log("EXISTS, OVERWRITING FILE");
    fs.writeFile('./courses.txt', courseStr, (error) => {
      if (error) throw error;
    })
  }
  else {
    console.log("DOES NOT EXIST");
    fs.writeFile('./courses.txt', courseStr, (error) => {
      if (error) throw error;
    })
  }

  await browser.close();
} catch (error) {
  console.log(error);
}
})();
