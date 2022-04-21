'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class ReservationTicket extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Reservation);
		}
	}
	ReservationTicket.init({
		row: DataTypes.INTEGER,
		seat: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'ReservationTicket',
		underscored: true,
	});
	return ReservationTicket;
};
