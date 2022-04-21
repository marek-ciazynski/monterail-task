'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Reservation extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Event);
			this.hasMany(models.ReservationTicket);
		}
	}
	Reservation.init({
		clientName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		totalCost: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
		paid: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	}, {
		sequelize,
		modelName: 'Reservation',
		underscored: true,
	});
	return Reservation;
};
