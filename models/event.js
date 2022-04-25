'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class Event extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.EventPlace)
			this.hasMany(models.Reservation)
		}
	}
	Event.init({
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		reservationMode: {
			type: DataTypes.ENUM('even', 'all_together', 'avoid_one'),
			allowNull: false,
		},
		price: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
	}, {
		sequelize,
		modelName: 'Event',
		underscored: true,
	})
	return Event
}
