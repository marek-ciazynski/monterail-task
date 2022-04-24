'use strict'

const { Op } = require("sequelize")

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction()
		try {
			await queryInterface.bulkInsert('event_places', [{
				id: 1,
				name: 'NOSPR Katowice',
				rows: 22,
				seats: 35,
				created_at: new Date(),
				updated_at: new Date(),
			}], { transaction })

			await queryInterface.bulkInsert('events', [
				{
					name: 'Koncert 1',
					date: new Date('2022-04-30T18:45:00Z'),
					reservation_mode: 'all_together',
					price: 10.99,
					event_place_id: 1,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					name: 'Koncert 2',
					date: new Date('2022-05-13T13:00:00Z'),
					reservation_mode: 'even',
					price: 30.00,
					event_place_id: 1,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					name: 'Koncert 3',
					date: new Date('2022-05-14T09:30:00Z'),
					reservation_mode: 'avoid_one',
					price: 45.00,
					event_place_id: 1,
					created_at: new Date(),
					updated_at: new Date(),
				},
			], { transaction })
			transaction.commit()
		} catch (err) {
			transaction.rollback()
			throw err
		}
	},

	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction()
		try {
			await queryInterface.bulkDelete('event_places', { [Op.or]: [{ name: 'NOSPR Katowice' }] }, { transaction })
			await queryInterface.bulkDelete('events', { [Op.or]: [{ name: 'Koncert 1' }, { name: 'Koncert 2' }, { name: 'Koncert 3' }] }, { transaction })
			transaction.commit()
		} catch (err) {
			transaction.rollback()
			throw err
		}
	}
}
