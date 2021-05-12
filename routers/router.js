let express = require('express');
let router = express.Router();

// ADD ALL TABLES
const degrees = require('../controllers/controller.js');
const courses = require('../controllers/controller.js')
const core = require('../controllers/controller.js')

let path = __basedir + '/view/';

router.get('/', (req,res) => {
    console.log("__basedir" + __basedir);
    res.sendFile(path + "index.html");
});

router.get('/degrees/', (req,res) => {
    console.log("__basedir" + __basedir);
    res.sendFile(path + "degrees.html");
});

router.get('/courses/', (req,res) => {
    console.log("__basedir" + __basedir);
    res.sendFile(path + "courses.html");
})

router.get('/core/', (req,res) => {
    console.log("__basedir" + __basedir);
    res.sendFile(path + "core.html");
})

router.post('/api/degree/create', degrees.create);
router.get('/api/degree/retrieveDegreeInfos', degrees.retrieveDegreeInfos);
router.get('/api/degree/findone/:id', degrees.findById);
router.put('/api/degree/updatebyid/:id', degrees.updateById);
router.delete('/api/degree/deletebyid/:id', degrees.deleteById);

router.post('/api/course/create', courses.create);
router.get('/api/course/retrieveCourseInfos', courses.retrieveCourseInfos);
router.get('/api/course/findone/:id', courses.findById);
router.put('/api/course/updatebyid/:id', courses.updateById);
router.delete('/api/course/deletebyid/:id', courses.deleteById);

router.post('/api/core/create', core.create);
router.get('/api/core/retrieveCoreInfos', core.retrieveCoreInfos);
router.get('/api/core/findone/:id', core.findById);
router.put('/api/core/updatebyid/:id', core.updateById);
router.delete('/api/core/deletebyid/:id', core.deleteById);


module.exports = router;
