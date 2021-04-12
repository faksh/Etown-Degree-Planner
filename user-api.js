module.exports = (sequelize, Sequelize) => {
  const Degree = sequelize.define('degree', {
    dID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    }
  });

  return Degree;
}
