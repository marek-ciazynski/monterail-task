'use strict'

const config = require("@app/config");

const { AppError } = require("./exceptions/app-error");


/* Exported service methods */
module.exports = {
	createPaymentSession,
}


/**
 * Creates a new session in payment provider (like Stripe)
 * @param {number} ticketId Reservation database ID
 * @param {string} redirectUrl URL returned by payment gateway front-end should redirect to
 */
function createPaymentSession(reservationId) {
	// "Mocked" fetch request to payent gateway API
	return new Promise((resolve, reject) => {
		const redirectUrlReturnedByPaymentGatewayAPI = 'https://pay.example.com/v1/payment/ccc66c94-c477-11ec-aca7-d73b89ae99ce'
		setTimeout(() => {
			resolve(redirectUrlReturnedByPaymentGatewayAPI)
		}, Math.random()*1000)
	})
}

// TODO implement method for creating new payment record in DB
// TODO implement webhook with response from payment gateway
function addPayment() {

}

/* Helper functions */
