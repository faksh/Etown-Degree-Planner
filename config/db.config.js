const env = require('./env.js');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  // Uncomment when finished debugging to remove Sequelize logging in console
  //logging: false,
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

//load tables here
db.Course = require('../models/course.model.js')(sequelize, Sequelize);
db.Degree = require('../models/degree.model.js')(sequelize, Sequelize);
db.Core = require('../models/core.model.js')(sequelize, Sequelize);


module.exports = db;
