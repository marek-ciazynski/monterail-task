'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		*/
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.bulkInsert('event_places', [{
				id: 1,
				name: 'NOSPR Katowice',
				rows: 22,
				seats: 35,
				created_at: new Date(),
				updated_at: new Date(),
			}], { transaction });

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
				}
			], { transaction })
			transaction.commit();
		} catch (err) {
			transaction.rollback();
			throw err;
		}
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('event_places', { [Op.or]: [{ name: 'NOSPR Katowice' }] });
		await queryInterface.bulkDelete('events', { [Op.or]: [{ name: 'Koncert 1' }, { name: 'Koncert 2' }] });
	}
};
