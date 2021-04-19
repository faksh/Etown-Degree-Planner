SET SQL_SAFE_UPDATES = 0;

show databases;

drop database etown_course_planner;

create database etown_course_planner;

use etown_course_planner;

show tables;

drop table courses;

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

delete from courses;
select * from courses;

select COUNT(*) from courses;


