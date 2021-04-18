const env = {
  database: 'plannerdb',
  username: 'root',
  password: 'cri6sP#ss',

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
