const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.js');

// NEW
const degrees = require('../controllers/controllers.js');
router.post('/api/degree', degrees.createDegree);
router.get('/api/degree/:id', degrees.getDegree);
router.get('/api/degrees', degrees.degrees);
router.put('/api/degree', degrees.updateDegree);
router.delete('/api/degree/:id', degrees.deleteDegree);
//


//router.get('/say-something', controllers.saySomething);

module.exports = router;
