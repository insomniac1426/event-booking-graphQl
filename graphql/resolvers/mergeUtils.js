// models
const EventModel = require("../../models/event");
const UserModel = require("../../models/user");

// constants
const {
  USER_NOT_FOUND,
  EVENT_NOT_FOUND
} = require("../constants/errorMessages");

// CRUD operations
const findUser = userId => async () => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw Error(USER_NOT_FOUND);
    }
    return transformUser(user);
  } catch (error) {
    throw error;
  }
};

const findEvent = eventId => async () => {
  try {
    const event = await EventModel.findById(eventId);
    if (!event) {
      throw Error(EVENT_NOT_FOUND);
    }
    return transformEvent(event);
  } catch (error) {
    throw error;
  }
};

const findEvents = eventIds => async () => {
  try {
    const events = await EventModel.find({ _id: { $in: eventIds } });
    return events.map(event => transformEvent(event));
  } catch (error) {
    throw error;
  }
};

// transformations
const transformEvent = event => ({
  ...event._doc,
  date: event._doc.date.toISOString(),
  creator: findUser(event._doc.creator)
});

const transformUser = user => {
  return {
    ...user._doc,
    createdEvents: findEvents(user._doc.createdEvents)
  };
};

const transformBooking = booking => ({
  ...booking._doc,
  event: findEvent(booking._doc.event),
  user: findUser(booking._doc.user),
  createdAt: new Date(booking._doc.createdAt).toISOString(),
  updatedAt: new Date(booking._doc.updatedAt).toISOString()
});

exports.findUser = findUser;
exports.findEvent = findEvent;
exports.findEvents = findEvents;

exports.transformUser = transformUser;
exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
