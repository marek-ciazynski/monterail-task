'use strict'

module.exports = async function (fastify, opts) {
	fastify.get('/', {
		schema: {
            description: 'This is an endpoint for application health check',
			tags: ['reservation'],
			response: {
				200: {
					description: 'List of reservations',
					type: 'array',
					items: {
						type: 'object',
						properties: {
							id: { type: 'integer' },
							eventId: { type: 'integer' },
							status: {
								description: 'Status of reservation payment. Can be ',
								type: 'string',
								enum: ['reserved', 'failed', 'paid'], // FIXME
							},
							quantity: { type: 'integer', min: 1 },
							totalCost: { type: 'number' },
							event: {
								type: 'object',
								properties: {
									name: { type: 'string' },
								}
							},
						},
					},
				},
			},
		},
	},
	async (request, reply) => {
		return [{
			id: 123,
			eventId: 1,
			status: 'reserved',
			quantity: 1,
			totalCost: 19.99,
			event: {
				name: 'Example event'
			}
		}]
	})

	fastify.post('/', {
		schema: {
			description: 'Endpoint for creating a new reservation for a list of available seats for a event',
			tags: ['reservation'],
			body: {
				eventId: { type: 'integer' },
				tickets: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							row: { type: 'integer' },
							seat: { type: 'integer' },
						}
					}
				},
			},
			response: {
				200: {
					description: 'Successful reservation valid for 15 minutes',
					type: 'object',
					properties: {
						message: { type: 'string' }
					}
				},
				400: {
					description: 'Seats are not available for reservation',
					type: 'object',
					properties: {
						message: { type: 'string' },
						error: { type: 'string' },
						statusCode: { type: 'integer' },
					}
				},
				404: {
					description: 'Event not found',
					type: 'object',
					properties: {
						message: { type: 'string' },
						error: { type: 'string' },
						statusCode: { type: 'integer' },
					}
				},
			},
		},
	}, async (request, reply) => {
		// throw fastify.httpErrors.badRequest('Seats are not available for reservation');
		// throw fastify.httpErrors.notFound('Event not found');

		const { tickets, eventId } = request.body;
		return { message: `Reservation made for event ${eventId} for seat (${tickets[0].row},${tickets[0].seat})` };
	})	
}
