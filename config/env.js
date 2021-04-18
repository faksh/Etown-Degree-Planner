const env = {
  // database: 'plannerdb',
  // username: 'root',
  // password: 'cri6sP#ss',

  database: 'etown_course_planner',
  username: 'root',
  password: 'jingwen',

  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;
