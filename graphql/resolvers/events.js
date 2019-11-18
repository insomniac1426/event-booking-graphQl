// models
const EventModel = require("../../models/event");
const UserModel = require("../../models/user");

/** this is for the time beign till we setup the login flow */
const { NOT_LOGGED_IN } = require("../constants/errorMessages");
const { transformEvent } = require("./mergeUtils");

const eventResolver = {
  events: async () => {
    const events = await EventModel.find();
    return events.map(event => transformEvent(event));
  },
  createEvent: async ({ eventInput }, req) => {
    const { isAuth, currentUser } = req;

    if (!isAuth) {
      throw Error(NOT_LOGGED_IN);
    }

    const { title, description, price } = eventInput;
    const floatPrice = parseFloat(price);
    const newEvent = new EventModel({
      title,
      description,
      date: new Date().toISOString(),
      price: Number.isNaN(floatPrice) ? 0 : floatPrice,
      creator: currentUser
    });

    try {
      const event = await newEvent.save();
      const user = await UserModel.findById(currentUser);
      if (!user) {
        throw Error(USER_NOT_FOUND);
      }
      user.createdEvents.push(event._doc._id);
      await user.save();
      return transformEvent(event);
    } catch (saveError) {
      throw saveError;
    }
  }
};

exports.transformEvent = transformEvent;
exports.eventResolver = eventResolver;
