const { timestamps } = require('./timestamps');
const mongoose = require('mongoose');
const toString = require('./toString');

const CitySchema = new mongoose.Schema(
  {
    __id: String,
    country: {
      type: mongoose.Types.ObjectId,
      ref: 'Country',
      get: toString,
    },
    cityCode: {
      type: String,
      required: true,
    },
    geolocalisation: new mongoose.Schema({
      lat: {
        type: String,
        required: true,
      },
      long: {
        type: String,
        required: true,
      },
    }),
    nameEn: {
      required: true,
      type: String,
    },
    nameLocal: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
    },

    ...timestamps,
  },
  { timestamps: true, collection: 'cities' }
);

module.exports = mongoose.model('City', CitySchema);
