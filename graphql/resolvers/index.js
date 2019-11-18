const { bookingsResolver } = require("./bookings");
const { eventResolver } = require("./events");
const { authResolver } = require("./auth");

module.exports = {
  ...eventResolver,
  ...authResolver,
  ...bookingsResolver
};
