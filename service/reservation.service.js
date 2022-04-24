'use strict'

const { Reservation } = require("@app/models")

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


/**
 * Get a list of all current, valid reservations
 * @returns {Reservation[]}
 */
function getReservations() {
	const reservations = Reservation.findValidReservations()
	console.log(reservations)
	return [];
}

/**
 * Creates a new reservation for an event for given seats, valid for 15 minutes
 * @param {number} eventId Event database ID
 * @param {Ticket[]} ticketList List of tickets/seats to be reserved
 */
function addReservation(eventId, seatList) {

}

/* Exported service methods */
module.exports = {
	getReservations,
	addReservation,
}
