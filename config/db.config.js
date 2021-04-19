// var mysql = require('mysql');
const env = require('./env.js');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  define: {
    timestamps: false
  },

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.Degree = require('../user-api.js')(sequelize, Sequelize);
db.Course = require('../models/course.model.js')(sequelize, Sequelize);

module.exports = db;

/*

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'cri6sP#ss',
  database: 'plannerdb'
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "SHOW TABLES";
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
  })
  db.end();
});
*/
