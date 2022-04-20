'use strict'

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
		// TODO do some mocked work with payment provider API

		reply.code(303).send({
			message: 'Redirecting to payment gateway. to pay for reservation id='+request.params.reservationId,
		});
	})

}
