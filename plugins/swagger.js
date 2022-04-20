'use strict';

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
	fastify.register(require('fastify-swagger'), {
		routePrefix: '/swagger',
		swagger: {
			info: {
				title: 'Ticketworld API',
				description: 'Testing the Fastify swagger API',
				version: '1.0.0'
			},
			host: 'localhost:3000',
			schemes: ['http'],
			consumes: ['application/json'],
			produces: ['application/json'],
		},
		exposeRoute: true
	})
})
