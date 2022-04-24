'use strict'

module.exports = async function (fastify, opts) {
	// TODO what if database connection fails?
	fastify.get('/', {
		schema: {
			description: 'Root endpoint, can be used as health check ',
			// tags: ['health'],
			response: {
				200: {
					description: 'The API is running',
					type: 'object',
					properties: {
						ok: { type: 'boolean' }
					}
				}
			}
		},
	}, async function (request, reply) {
		return { ok: true }
	})
}
