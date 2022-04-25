'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
	await queryInterface.addColumn(
		'reservations',
		'start_time',
		{
			type: Sequelize.DATE,
			allowNull: false,
		}
	)
  },

  async down (queryInterface, Sequelize) {
	await queryInterface.removeColumn('reservations', 'start_time')
  }
};
