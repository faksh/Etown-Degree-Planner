module.exports = (sequelize, Sequelize) => {
	const Core = sequelize.define('core', {
	  coreID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
      },
	  name: {
			type: Sequelize.STRING
	  },
	  amount: {
		  type: Sequelize.STRING
  	  }
	});

	return Core;
}
