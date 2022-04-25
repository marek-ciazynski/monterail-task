'use strict'
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('reservations', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			client_name: {
				type: Sequelize.STRING
			},
			total_cost: {
				type: Sequelize.DECIMAL
			},
			paid: {
				type: Sequelize.BOOLEAN
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
		await queryInterface.dropTable('reservations')
	}
}
