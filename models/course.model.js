
module.exports = (sequelize, Sequelize) => {
	const Course = sequelize.define('course', {	
		code:{
			type: Sequelize.STRING,
			primaryKey: true
		},
		title:{
			type: Sequelize.STRING
		},
		credits: {
			type: Sequelize.STRING
		},
		core: {
			type: Sequelize.STRING
		},
		descrip: {
			type: Sequelize.STRING
		},
		sle: {
			type: Sequelize.STRING
		},
		prereq: {
				type: Sequelize.STRING
		},
		coreq: {
			type: Sequelize.STRING
		},
		hours: {
			type: Sequelize.STRING
		},
		graded: {
			type: Sequelize.STRING
		},
		register:{
			type: Sequelize.STRING
		},
		repeatable: {
			type: Sequelize.STRING
		},
		offered: {
			type: Sequelize.STRING
		}
		
	});
	
	return Course;
}



