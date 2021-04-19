# Etown-Degree-Planner
Web application to help students plan out their years at Elizabethtown College


## Steps to crawl all the courses
### STEP 1. Update the database config file
Update the ```config/env.js``` file with your MySQL configurations.


### STEP 2. Create database and table from MySQL
Create a database from MySQL. Please make sure the database name is same with the name specified in the ```config/env.js``` configuration file.


Create a ```courses``` table in your database. The ```courses``` table is created based on the ```Course``` model from ```models\course.model.js```.
```
    create table courses (
        code VARCHAR(50) primary key,
        title VARCHAR(200) NOT NULL,
        credits VARCHAR(50),
        core VARCHAR(100),
        descrip TEXT, 
        sle VARCHAR(200),
        prereq TEXT, 
        coreq VARCHAR(200),
        hours VARCHAR(200),
        graded VARCHAR(200),
        register VARCHAR(200),
        repeatable VARCHAR(200),
        offered VARCHAR(200) 
    );
```


### STEP 3. run the crawler from terminal
```node crawler/all_courses.js```

