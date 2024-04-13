const { timestamps } = require('./timestamps');
const mongoose = require('mongoose');
const toString = require('./toString');

const BrandRegistrationSchema = new mongoose.Schema(
  {
    name: String,
    ordersPerDay: Number,
    typeOfFood: [String],
    website: String,
  },
  { _id: false }
);

const BranchRegistrationSchema = new mongoose.Schema(
  {
    name: String,
    structure: [String],
    haveWifi: Boolean,
    haveBrands: Boolean,
    country: {
      type: mongoose.Types.ObjectId,
      ref: 'Country',
      get: toString,
    },
    city: {
      type: mongoose.Types.ObjectId,
      ref: 'City',
      get: toString,
    },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    __id: String,
    uid: String,
    email: String,
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    roles: {
      type: [String],
      required: true,
    },
    language: String,
    slackId: String,
    avatar: String,
    profession: String,
    bio: String,
    brandRegistration: { type: BrandRegistrationSchema },
    branchRegistration: { type: BranchRegistrationSchema },

    ...timestamps,
  },
  { collection: 'users', timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
