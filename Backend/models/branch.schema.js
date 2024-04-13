const { timestamps } = require('./timestamps');
const mongoose = require('mongoose');
const toString = require('./toString');

const AddressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  city: {
    type: mongoose.Types.ObjectId,
    ref: 'City',
    get: toString,
    required: true,
  },
  geoLocation: new mongoose.Schema({
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
  }),
});

const BranchSchema = new mongoose.Schema(
  {
    __id: String,
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    equipments: {
      type: [mongoose.Types.ObjectId],
      get: toString,
      ref: 'Equipment',
    },
    legalNumber: String,
    type: {
      type: String,
    },
    foodTypes: {
      type: [String],
      required: true,
    },
    cookingLimitations: {
      type: [String],
      required: true,
    },
    cover: {
      type: String,
    },
    logo: {
      type: String,
    },
    address: AddressSchema,
    account: {
      type: mongoose.Types.ObjectId,
      get: toString,
      ref: 'Account',
    },
    concepts: {
      type: [mongoose.Types.ObjectId],
      ref: 'Concept',
      get: toString,
    },
    ...timestamps,
  },
  { timestamps: true, collection: 'branches' }
);

module.exports = mongoose.model('Branch', BranchSchema);
