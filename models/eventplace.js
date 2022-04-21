'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class EventPlace extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.Event);
		}
	}
	EventPlace.init({
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.BOOLEAN,
		},
		rows: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		seats: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	}, {
		sequelize,
		modelName: 'EventPlace',
		underscored: true,
	});
	return EventPlace;
};
