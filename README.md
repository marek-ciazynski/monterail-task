# Ticketworld API
This project was bootstrapped with Fastify-CLI.

## TODO
some notes on running;
Swagger;
events and event_places are to be inserted manually into DB and example data is in seeder; in the furure there could be "Admin API" for this or simple npm script at the begining like "npm run event:add -- <event_info>"
how to setup Postgres, run seeder & migrations

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).

## Configuration
App is configured with environment variables in `.env` file loaded at server start-up. Example configuration can be checked in `.env.sample` file.

### List of configuration variables:
**General configuration:**
* `NODE_ENV` – set to `production` when deployed to prod, default value is `development`
* `PORT` – port on which the API server is listening

**Sequelize database connection:**
* `DB_USERNAME` – database connection username
* `DB_PASSWORD` – database connection password
* `DB_NAME` – database name
* `DB_HOST` – database host, can be URL or Postgres socket file

**App-specific configuration:**
* `RESERVATION_EXPIRATION_TIME` – time for which a reservation is valid, after that time the reservation is released; it should be string parsable by [`ms`](https://www.npmjs.com/package/ms) module, like: `15m`, `1h` or `2 days`
