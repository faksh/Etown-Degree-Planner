// Create APIs interfacing with MySQL 

const db = require('../config/db.config.js');
const Degree = db.Degree;
const Course = db.Course;
const Core = db.Core;

exports.create = (req, res) => {
  let degree = {};
  let course = {};
  let core = {};

    try{
        // Building Degree object from uploading request's body
        degree.dID = req.body.dID;
        degree.name = req.body.name;
        degree.type = req.body.type;

        // Save to MySQL database
        Degree.create(degree).then(result => {
                      res.status(200).json({
                        message: "Upload Successfully!",
                        degree: result
                      });
                    });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }


    try{
        // Building Course object from uploading request's body
        course.code = req.body.code;
        course.title = req.body.title;
        course.credits = req.body.credits;
        course.core = req.body.core;
        course.descrip = req.body.descrip;
        course.sle = req.body.sle;
        course.prereq = req.body.prereq;
        course.coreq = req.body.coreq;
        course.hours = req.body.hours;
        course.graded = req.body.graded;
        course.register = req.body.register;
        course.repeatable = req.body.repeatable;


        // Save to MySQL database
        Course.create(course).then(result => {
                      res.status(200).json({
                        message: "Upload Successfully!",
                        course: result
                      });
                    });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }


    try{
        // Building Core object from uploading request's body
        core.coreID = req.body.coreID;
        core.name = req.body.name;
        core.amount = req.body.amount;

        // Save to MySQL database
        Core.create(core).then(result => {
                    res.status(200).json({
                        message: "Upload Successfully!",
                        core: result
                    });
                    });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.getDegree = (req, res) => {
  Degree.findByPk(req.params.id,
                       {attributes: ['dID', 'name', 'type']})
       .then(degree => {
         res.status(200).json(degree);
       }).catch(error => {
         // log on console
         console.log(error);

         res.status(500).json({
             message: "Error!",
             error: error
         });
       })
}

exports.getCourse = (req, res) => {
  Course.findByPk(req.params.id,
                       {attributes: ['code', 'title', 'credits', 'core', 'descrip', 'sle', 'prereq', 'coreq', 'hours', 'graded', 'register', 'repeatable']})
       .then(course => {
         res.status(200).json(course);
       }).catch(error => {
         // log on console
         console.log(error);

         res.status(500).json({
             message: "Error!",
             error: error
         });
       })
}

exports.getCore = (req, res) => {
    Core.findByPk(req.params.id,
                         {attributes: ['coreID', 'name', 'amount']})
         .then(core => {
           res.status(200).json(core);
         }).catch(error => {
           // log on console
           console.log(error);
  
           res.status(500).json({
               message: "Error!",
               error: error
           });
         })
  }

exports.findById = (req, res) => {
    // getting a degree id from request parameters
    let dID = req.params.id;

    try{
        Degree.findByPk(dID).then(degree => {
            res.status(200).json({
                message: "Successfully! Retrieve a degree by id = " + dID,
                degree: degree
            });
        });
    }catch(error) {
        // Send error to Client
        res.statas(500).json({
            message: "Error when retrieving a degree by id = " + dID,
            error: error.message
        });
    }
}

exports.findById = (req, res) => {
    // getting a course id from request parameters
    let code = req.params.code;

    try{
        Course.findByPk(code).then(course => {
            res.status(200).json({
                message: "Successfully! Retrieve a course by id = " + code,
                course: course
            });
        });
    }catch(error) {
        // Send error to Client
        res.statas(500).json({
            message: "Error when retrieving a course by id = " + course,
            error: error.message
        });
    }
}

exports.findById = (req, res) => {
    // getting a degree id from request parameters
    let coreID = req.params.id;

    try{
        Core.findByPk(coreID).then(core => {
            res.status(200).json({
                message: "Successfully! Retrieve a core by id = " + coreID,
                core: core
            });
        });
    }catch(error) {
        // Send error to Client
        res.statas(500).json({
            message: "Error when retrieving a core by id = " + coreID,
            error: error.message
        });
    }
}

exports.retrieveDegreeInfos = (req, res) => {
    // find all Degree information from
    try{
        Degree.findAll({attributes: ['dID', 'name', 'type']})
        .then(degreeInfos => {
            res.status(200).json({
                message: "Get Degrees' Infos!",
                degreeInfos: degreeInfos
            });
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Retrieving Error!",
            error: error
        });
    }
}

exports.retrieveCourseInfos = (req, res) => {
    // find all Course information from
    try{
        Course.findAll({attributes: ['code', 'title', 'credits', 'core', 'descrip', 'sle', 'prereq', 'coreq', 'hours', 'graded', 'register', 'repeatable']})
        .then(courseInfos => {
            res.status(200).json({
                message: "Get Courses' Infos!",
                courseInfos: courseInfos
            });
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Retrieving Error!",
            error: error
        });
    }
}

exports.retrieveCoreInfos = (req, res) => {
    // find all Core information from
    try{
        Core.findAll({attributes: ['coreID', 'name', 'amount']})
        .then(coreInfos => {
            res.status(200).json({
                message: "Get Core Infos!",
                coreInfos: coreInfos
            });
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Retrieving Error!",
            error: error
        });
    }
}


exports.deleteById = async (req, res) => {
    try{
        let dID = req.params.id;
        let degree = await Degree.findByPk(dID);

        if(!degree){
            res.status(404).json({
                message: "Does Not exist a Degree with id = " + dID,
                error: "Not Found"
            });
        } else {
            await degree.destroy();
            res.status(200).json({
                message: "Delete Successfully a Degree with id = " + dID,
                degree: degree
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a Degree with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let code = req.params.id;
        let course = await Course.findByPk(code);

        if(!course){
            res.status(404).json({
                message: "Does Not exist a Course with id = " + code,
                error: "Not Found"
            });
        } else {
            await course.destroy();
            res.status(200).json({
                message: "Delete Successfully a Course with id = " + code,
                degree: course
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a Course with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let coreID = req.params.id;
        let core = await Core.findByPk(coreID);

        if(!core){
            res.status(404).json({
                message: "Does Not exist a Core with id = " + coreID,
                error: "Not Found"
            });
        } else {
            await core.destroy();
            res.status(200).json({
                message: "Delete Successfully a Core with id = " + coreID,
                core: core
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a Core with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.updateById = async (req, res) => {
    try{
        let dID = req.params.id;
        let degree = await Degree.findByPk(dID);

        if(!degree){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a degree with id = " + dID
            });
        } else {
            // update new change to database
            let updatedObject = {
                dID: req.body.dID,
                name: req.body.name,
                type: req.body.type
            }
            let result = await Degree.update(updatedObject, {returning: true, where: {id: dID}});

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Degree with id = " + req.params.id,
                    error: "Can NOT Updated"
                });
            }

            res.status(200).json({
                message: "Update successfully a Degree with id = " + dID,
                degree: updatedObject
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a Degree with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.updateById = async (req, res) => {
    try{
        let code = req.params.id;
        let course = await Course.findByPk(code);

        if(!course){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a course with id = " + code
            });
        } else {
            // update new change to database
            let updatedObject = {
                code: req.body.code,
                title: req.body.title,
                credits: req.body.credits,
                core: req.body.core,
                descrip: req.body.descrip,
                sle: req.body.sle,
                prereq: req.body.prereq,
                coreq: req.body.coreq,
                hours: req.body.hours,
                graded: req.body.graded,
                register: req.body.register,
                repeatable: req.body.repeatable
            }
            let result = await Course.update(updatedObject, {returning: true, where: {id: code}});

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Course with id = " + req.params.id,
                    error: "Can not be Updated"
                });
            }

            res.status(200).json({
                message: "Update successfully a Course with id = " + code,
                degree: updatedObject
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a Course with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.updateById = async (req, res) => {
    try{
        let coreID = req.params.id;
        let core = await Core.findByPk(coreID);

        if(!core){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a core with id = " + coreID
            });
        } else {
            // update new change to database
            let updatedObject = {
                coreID: req.body.coreID,
                name: req.body.name,
                amount: req.body.amount
            }
            let result = await Core.update(updatedObject, {returning: true, where: {id: coreID}});

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Core with id = " + req.params.id,
                    error: "Can NOT Updated"
                });
            }

            res.status(200).json({
                message: "Update successfully a Core with id = " + coreID,
                core: updatedObject
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a Core with id = " + req.params.id,
            error: error.message
        });
    }
}