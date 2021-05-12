// Import dependencies
const express = require('express');
// EDITED const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');

// Create a new express application named 'app'
const app = express();

var bodyParser = require('body-parser');

global.__basedir = __dirname;

const db = require('./config/db.config.js');


// force: true will drop the table if it already exists
db.sequelize.sync({}).then(() => {
//  console.log('Drop and Resync with { force: true }');
});


let router = require('./routers/router.js');
//DELETE app.use(bodyParser.json());
app.use(express.static('resources'));
app.use(express.static(__dirname + '/client/public'));
app.use('/', router);

// Create a Server
const server = app.listen(5000, function () {

  let host = server.address().address
  let port = server.address().port

  app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});


  console.log("App listening at http://%s:%s", host, port);
})
