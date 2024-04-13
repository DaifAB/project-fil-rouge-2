const eventModel = require('../models/event.schema');

async function errorHandler(err, req, res, next) {
  console.log('Error:', err.message);
  const event = {
    route: req.originalUrl,
    method: req.method,
    error: err.message,
    stack: err.stack,
    type: 'error',
  };

  try {
    console.log('Saving database error event');
    await eventModel.create(event);
    console.log('Database error event saved');
  } catch (error) {
    console.error('Error saving database event:', error);
  }

  res.status(400).json({
    error: 'An error happened!',
    message: err.message,
  });
}

module.exports = errorHandler;
