'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
	const transaction = await queryInterface.sequelize.transaction();
	try {
		await queryInterface.addColumn(
			'events',
			'event_place_id',
			{
				type: Sequelize.INTEGER,
				references: {
					model: 'event_places',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			{ transaction }
		);

		await queryInterface.addColumn(
			'reservations',
			'event_id',
			{
				type: Sequelize.INTEGER,
				references: {
					model: 'events',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			{ transaction }
		);

		await queryInterface.addColumn(
			'reservation_tickets',
			'reservation_id',
			{
				type: Sequelize.INTEGER,
				references: {
					model: 'reservations',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			{ transaction }
		);
		
		transaction.commit();
	} catch (err) {
		transaction.rollback();
	}
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
	const transaction = await Sequelize.transaction();
	try {
		await queryInterface.removeColumn('events', 'event_place_id')
		await queryInterface.removeColumn('reservations', 'event_id')
		await queryInterface.removeColumn('reservation_tickets', 'reservation_id')
		transaction.commit();
	} catch (err) {
		transaction.rollback();
	}
  }
};
