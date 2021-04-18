
const db = require('../config/db.config.js');
const Course = db.Course;

// insert a new course to the course table 
try{
    
    let course = {
        cid: 'CS 121',
        code: 'CS 121',
        credits: '4.0',
        descript: 'Computer Science I',
        prereq: 'N/A',
        offered: 1
    }

    // Save to MySQL database
    Course.create(course).then(result => {    
        // send uploading message to client
        console.log("Upload Successfully!");
        console.log(result);
    });

}catch(error){
    console.error("Fail!");
    console.error(customer);
}


