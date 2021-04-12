// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');
const db = require('./Etown-Degree-Planner/db_connection.js');
let router = require('./routes/routes.js');


// Create a new express application named 'app'
const app = express();

app.use(bodyParser.json());
app.use(express.static('resources'));
app.use('/', router);

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

/*
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'cri6sP#ss',
  database: 'plannerdb'
});
*/
const Degree = db.degree;
/*
db.connect(function(err) {
  (err)? console.log(err): console.log(db, "Connected");

  var sql = "SHOW TABLES";
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
  })

  db.end();
});
*/

/*
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with {force: true}');
  Degree.sync().then(() => {
    for (let i=0; i<degree.length; i++) {
      Degree.get(degree[i]);
    }
  })
});
*/

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure the CORs middleware
app.use(cors());


// Require Route
const api = require('./routes/routes');

// Configure app to use route
app.use('/api/v1/', api);

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});

// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));
