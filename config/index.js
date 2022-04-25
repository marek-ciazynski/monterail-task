'use strict'
require('dotenv').config()

const ms = require('ms')  // used for easy time format parsing like '15m', '1h' or '2 days'

/**
 * Application configuration is taken from environment variables descibed in /README.md
 * and are loaded from .env file if available. Example configuration can be found in a
 * .env.sample file.
 * Sequelize-cli requires its own configuration file which is configured to `/config/database.js`
 * and is available in app config as `database` property
 */
const config = {};

/* Application environment (production/development) set by NODE_ENV env var */
config.env = process.env.NODE_ENV || 'development'

/* Sequelize database connection config */
config.database = require('./database')[config.env]

/* Rest of the app-specific configuration */
config.reservationExpirationTime = ms(process.env.RESERVATION_EXPIRATION_TIME || '15min')

module.exports = config;
