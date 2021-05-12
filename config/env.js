const env = {
  database: 'plannerdb', // update this field with your database name
  username: 'root', // update this field with your username
  password: 'cri6sP#ss', // update this field with your password

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
