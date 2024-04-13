const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    route: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
    stack: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    at: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { collection: 'events' }
);

module.exports = mongoose.model('Event', eventSchema);
