'use strict'
const { Model, Op } = require('sequelize')
const config = require('../config')

module.exports = (sequelize, DataTypes) => {
	class Reservation extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Event)
			this.hasMany(models.ReservationTicket)
		}

		static ReservationNotExpired = () => {
			const now = new Date()
			return {
				startTime: {
					[Op.between]: [new Date(now.getTime() - config.reservationExpirationTime), now],
				}
			}
		}

		/**
		 * Finds all valid reservations that aren't expired (reserved longer than 15 min ago)
		 */
		static findValidReservations() {
			const now = new Date()
			console.log(now)
			const reservations = this.findAll({
				where: {
					...this.ReservationNotExpired()
				}
			});
			return reservations;
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
		startTime: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
			validate: {
				notAfterNow() {
					console.log(this.startTime)
					if (this.startTime > new Date())
						throw new Error('Cannot set reservation start time in the future')
				}
			}
		}
	}, {
		sequelize,
		modelName: 'Reservation',
		underscored: true,
	})
	return Reservation
}
