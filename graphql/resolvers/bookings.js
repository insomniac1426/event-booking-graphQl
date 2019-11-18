// models
const BookingModel = require("../../models/booking");

const { BOOKING_NOT_FOUND } = require("../constants/errorMessages");
const { findEvent, transformEvent, transformBooking } = require("./mergeUtils");

const bookingsResolver = {
  bookings: async () => {
    try {
      const bookings = await BookingModel.find();
      return bookings.map(booking => transformBooking(booking));
    } catch (error) {
      throw error;
    }
  },
  bookEvent: async ({ eventId }, req) => {
    try {
      const { isAuth, currentUser } = req;

      if (!isAuth) {
        throw Error(NOT_LOGGED_IN);
      }

      const event = await findEvent(eventId)();
      const booking = new BookingModel({
        event: event._id,
        user: currentUser
      });
      const addedBooking = await booking.save();
      return transformBooking(addedBooking);
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async ({ bookingId }) => {
    try {
      const booking = await BookingModel.findById({ _id: bookingId }).populate(
        "event"
      );
      if (!booking) throw Error(BOOKING_NOT_FOUND);
      await BookingModel.deleteOne({ _id: bookingId });
      return transformEvent(booking.event);
    } catch (error) {
      throw error;
    }
  }
};

exports.transformBooking = transformBooking;
exports.bookingsResolver = bookingsResolver;
