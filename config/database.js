/**
 * The configuration file used by Sequelize
 */
'use strict'
require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || 'ticketworld',
    "password": process.env.DB_PASSWORD || null,
    "database": process.env.DB_NAME || 'ticketworld',
    "host": process.env.DB_HOST || '/var/run/postgresql',
    "dialect": "postgres"
  },

  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  },
}
