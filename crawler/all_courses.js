// Initialization
const fs = require('fs');
const querystring = require('querystring');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const db = require('../config/db.config.js');
const Course = db.Course;

var all_urls = [];
var all_courses = [];

// generate all the urls
const base_url = 'https://catalog.etown.edu/content.php?';
const parameters = 'filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=1&cur_cat_oid=24&expand=1&navoid=1242&print=1#acalog_template_course_filter';
var params = querystring.parse(parameters);
for (var i = 1; i <= 12; i++) {
    params['filter[cpage]'] = i;
    all_urls.push(base_url + querystring.stringify(params));
}


// Scrape all courses 
(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // all pages
        for(const url of all_urls) {
            await page.goto(url);
            const allcourses = await page.$$('table.table_default td.width');

            // all courses in one page
            for (var i in allcourses) {
                const h3_tags = await allcourses[i].$eval('h3', node => node.innerText);
                const strong_tags = await allcourses[i].$$eval('strong', nodes => nodes.map(node => node.innerText));
                var courseText = await allcourses[i].evaluate(node => node.innerText);

                // extract a course and push it to the all_courses list
                const obj = extractCourseItems(courseText, h3_tags, strong_tags);
                all_courses.push(obj);
                insertToDB(obj);
            }
            
        }
        
        await browser.close();    
    } catch (error) {
        console.log(error);
    }

    console.log('\n' + all_courses.length + " courses extracted!\n");

}) ();


// Save to MySQL database 
function insertToDB(course) {
    
    Course.create(course).then(result => {    
        // send uploading message to client
        console.log(course['code'] + " insert Successfully!");
    }).catch(err => {
        console.error(err);
        console.log(course);
    });
}


function extractCourseItems(courseText, h3_tags, strong_tags) {
    const course_items = courseText.trim().split('\n');

    var object = {};
    // extract the code and title
    object['code'] = h3_tags.trim().split(' - ')[0].trim();
    object['title'] = h3_tags.trim().split(' - ')[1].trim();

    // extract the credits
    object['credits'] = course_items[1].trim();

    // extract the core
    object['core'] = strong_tags[0];

    // extract the descript
    object['descrip'] = course_items.slice(2).toString();

    // extract the SLE
    const sle = 'Signature Learning Experience:';
    if (strong_tags.length >= 3) {
        object['sle'] = strong_tags[2].replace(sle, '');
        courseText = courseText.replace(sle, '').replace(object['sle'], '');
    }

    /* The following items extraction order matters!!! */
    // extract the semester
    const offered = ['Fall semester', 'Spring semester'];
    for (const text of offered) {
        if (courseText.includes(text)) {
            object['offered'] = text + courseText.split(text)[1].trim();
            courseText = courseText.split(text)[0].trim();
        }
    }

    // This course is repeatable for credit.
    const repeatable = 'This course is repeatable for ';
    if (courseText.includes(repeatable)) {
        if( object['code'] == 'MA 400') {
            console.log(object);
        }
        var regex = /This course is repeatable for [^.]+\./g;
        object['repeatable'] = regex.exec(courseText)[0];
        courseText = courseText.replace(object['repeatable'], '').trim();
    }

    // Register by Instructor
    const register = 'Register by Instructor.';
    if (courseText.includes(register)) {
        object['register'] = register;
        courseText = courseText.replace(register, '').trim();
    }

    // Graded Pass/No Pass
    const graded = 'Graded Pass/No Pass.';
    if (courseText.includes(graded)) {
        object['graded'] = graded;
        courseText = courseText.replace(graded, '').trim();
    }

    // extract the hours
    const hours = '. Hours:';
    if (courseText.includes(hours)) {
        object['hours'] = courseText.split(hours)[1].trim();
        courseText = courseText.split(hours)[0].trim();
    }

    // extract the requisite
    const requisites = {
        'coreq': '*Corequisite(s):',
        'prereq': '*Prerequisite(s):'
    };
    for (const key in requisites) {
        if (courseText.includes(requisites[key])) {
            object[key] = courseText.split(requisites[key])[1].trim();
            courseText = courseText.split(requisites[key])[0].trim();
        }
    }

    return object;
}
