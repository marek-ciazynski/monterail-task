# Ticketworld API
This project was bootstrapped with Fastify-CLI.

## Getting started
1. First, you need to prepare PostgreSQL database. Create a user and database using `psql`
```
create user ticketworld;
create database ticketworld with owner ticketworld;
```
2. Configure application in `.env` file with database correct connection credentials (config described below)
3. Run migrations
```
npx sequelize db:migrate
```
4. Start API development server
```
npm run dev
```
5. You can navigate to `http://localhost:3000/swagger` to view Swagger API documentation and test the endpoints


## Note
Currently events info should be manually to the database. In the future this could be done by some "Admin API" or at the begining with simple npm task lilke `npm run event:add -- <event_info>`.
However, for testing purposes you cann seed the database with example EventPlace and Event data using:
```
npx sequelize db:seed:all
```

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
