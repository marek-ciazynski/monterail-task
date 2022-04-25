'use strict'
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('event_places', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			address: {
				type: Sequelize.BOOLEAN
			},
			rows: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			seats: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('event_places')
	}
}
