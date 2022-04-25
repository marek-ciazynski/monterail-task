'use strict'

const {
	sequelize,
	Event,
	Reservation,
	ReservationTicket,
} = require("@app/models");
const { Op } = require('sequelize');
const config = require("@app/config");

const { AppError } = require("./exceptions/app-error");

/**
 * Ticket – object representing one reserved seat in some event place
 * @typedef {Object} Ticket
 * @property {number} row - Seat's row number
 * @property {number} seat - Seat's number in a row
 */

/**
 * Event for which a reservation is made
 * @typedef {Object} Event
 * @property {string} name - Name of the event
 */

/**
 * Reservation – object representing a reservation for a single event
 * @typedef {Object} Ticket
 * @property {number} id - Reservation database ID
 * @property {number} eventId - Event database ID
 * @property {string} status - Current status of a reservation, takes values: 'reserved', 'failed', 'paid'
 * @property {number} quentity - Quantity of reserved tickets/seats for an event
 * @property {number} totalCost - Total cost of all reserved tickets
 * @property {Event} Event - Object describing Event a reservation is made for
 */


/* Exported service methods */
module.exports = {
	getReservations,
	addReservation,
}

/**
 * Get a list of all current, valid reservations
 * @returns {Reservation[]}
 */
function getReservations() {
	// const reservations = [];
	const reservations = Reservation.findValidReservations()
	// console.log(reservations)
	return reservations;
}

/**
 * Creates a new reservation for an event for given seats, valid for 15 minutes
 * @param {number} eventId Event database ID
 * @param {string} clientName Name of the client who made a reservation // TODO this would be User making request when auth is ready
 * @param {Ticket[]} ticketList List of tickets/seats to be reserved
 */
async function addReservation(eventId, clientName, ticketList) {
	const event = await Event.findByPk(eventId)

	// get currently reserved 
	const reservedTickets = (await _getEventReservedSeats(event)).map(reservationTicket => {
		const { row, seat } = reservationTicket
		return { row, seat }
	})

	// validate requested tickets
	const ticketsAreAlreadyReserved = ticketList.some(ticket => reservedTickets.find(x => x.row === ticket.row && x.seat === ticket.seat))
	if (ticketsAreAlreadyReserved)
		throw new AppError("Tickets you are requesting are already reserved", 400)

	if (!event) {
		throw new AppError("Event for given id not found", 404)
	}

	const reservation = Reservation.build({
		EventId: event.id,
		clientName,
		totalCost: _getReservationTotalCost(event, ticketList),
		paid: false,
		startTime: new Date(),
	})
	const reservationTickets = ticketList.map(({row, seat}) => ReservationTicket.build({ row, seat }))

	const transaction = await sequelize.transaction()
	try {
		console.log(reservation.id)
		await reservation.save({ transaction })
		console.log(reservation.id)

		reservation.eventId = event.id;
		await Promise.all(reservationTickets.map(reservationTicket => {
			reservationTicket.ReservationId = reservation.id
			reservationTicket.save()  // TODO createOrUpdate
		}))
		transaction.commit()
	} catch (err) {
		transaction.rollback()
		throw err
	}
}

/* Helper functions */

/**
 * Calculates total cost of a reservation
 * @param {Ticket[]} ticketList 
 */
const _getReservationTotalCost = (event, ticketList) => event.price * ticketList.length


const _getEventReservedSeats = (event) => {
	return Event.findByPk(event.id, {
		include: {
			model: Reservation,
			required: true,
			where: {
				...Reservation.ReservationNotExpired()
			},
			include: {
				model: ReservationTicket
			}
		},
	})
		.then(eventReservationTickets => {
			if (!eventReservationTickets)
				return []
			else
				return eventReservationTickets.Reservations.flatMap(reservation => reservation.ReservationTickets)
		})
}

const _validateReservation = (eventId ,ticketList) => {

}
