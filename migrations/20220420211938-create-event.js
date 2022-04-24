'use strict'
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('events', {
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
			date: {
				allowNull: false,
				type: Sequelize.DATE
			},
			reservation_mode: {
				allowNull: false,
				type: Sequelize.ENUM('even', 'all_together', 'avoid_one')
			},
			price: {
				allowNull: false,
				type: Sequelize.DECIMAL
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
		await queryInterface.dropTable('events')
	}
}
