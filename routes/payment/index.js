'use strict'

const { EventPlace, Event } = require("../../models");

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
	async (request, reply) => {
		// TODO do some mocked work with payment provider API
		console.log(EventPlace)
		const eventPlace = await EventPlace.create({
			name: 'NOSPR',
			rows: 10,
			seats: 25,
		})
		await eventPlace.createEvent({
			name: 'Koncert',
			date: new Date('2022-04-30T18:45:00Z'),
			reservationMode: 'all_together',
			price: 10.99,
		})
		await eventPlace.createEvent({
			name: 'Koncert 2',
			date: new Date('2022-05-13T13:00:00Z'),
			reservationMode: 'even',
			price: 30.00,
		})

		reply.code(303).send({
			message: 'Redirecting to payment gateway. to pay for reservation id='+request.params.reservationId,
		});
	})

}
