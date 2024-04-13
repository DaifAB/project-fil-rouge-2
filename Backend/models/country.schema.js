const { timestamps } = require('./timestamps');
const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    ...timestamps,
  },
  { collection: 'countries', timestamps: true }
);

module.exports = mongoose.model('Country', CountrySchema);
