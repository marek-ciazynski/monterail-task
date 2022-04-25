'use strict'

const paymentService = require('@app/service/payment.service')

module.exports = async function (fastify, opts) {
	fastify.get('/:reservationId', {
		schema: {
            description: 'Endpoint for making a new payment.' +
						 'Redirects user to payment gateway.',
			tags: ['payment'],
			params: {
				reservationId: { type: 'integer' },
			},
			response: {
				303: {
					description: 'Successfully created payment session at a payment provider.' +
								 'Redirecting user to finalize the order',
					type: 'object',
					properties: {
						message: { type: 'string' },
					},
				},
			},
		},
	},
	(request, reply) => {
		paymentService.createPaymentSession(request.params.reservationId)
			.then(redirectUrl => reply.redirect(redirectUrl))
			.catch(() => reply.internalServerError('Error while requesting payment session'))
	})

}
