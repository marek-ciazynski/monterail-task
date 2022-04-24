'use strict'
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('reservation_tickets', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			row: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			seat: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			}
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('reservation_tickets')
	}
}
