const { timestamps } = require('./timestamps');
const mongoose = require('mongoose');

const ConceptSchema = new mongoose.Schema(
  {
    __id: String,

    logo: {
      type: String,
    },
    cover: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    slogan: {
      type: String,
    },
    countries: {
      type: [mongoose.Types.ObjectId],
      ref: 'Country',
      get: toString,
    },
    equipments: {
      type: [mongoose.Types.ObjectId],
      ref: 'Equipment',
      get: toString,
    },
    commission: {
      type: Number,
      required: true,
    },
    averageOrderValue: {
      type: Number,
      required: true,
    },
    averageOrdersNumber: {
      type: Number,
      required: true,
    },
    cogs: {
      type: Number,
      required: true,
    },
    foodTypes: {
      type: [String],
      required: true,
    },
    websiteUrl: String,
    instagramUrl: String,
    facebookUrl: String,
    twitterUrl: String,
    account: {
      type: mongoose.Types.ObjectId,
      ref: 'Account',
      get: toString,
    },
    ...timestamps,
  },
  { timestamps: true, collection: 'concepts' }
);

module.exports = mongoose.model('Concept', ConceptSchema);
