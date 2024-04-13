const { timestamps } = require('./timestamps');
const mongoose = require('mongoose');
const toString = require('./toString');

const permissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      get: toString,
      required: true,
    },
    items: {
      type: [mongoose.Types.ObjectId],
      get: toString,
      required: true,
    },
    permission: {
      type: [String],
      required: true,
    },
  },
  {
    _id: false,
  }
);

const AccountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      get: toString,
      required: true,
    },
    type: {
      type: String,
      enum: ['brand', 'branch'],
      required: true,
    },
    users: {
      type: [mongoose.Types.ObjectId],
      ref: 'User',
      get: toString,
      required: true,
    },
    permissions: {
      type: [permissionSchema],
      required: true,
    },
    concepts: {
      type: [mongoose.Types.ObjectId],
      ref: 'Concept',
      get: toString,
    },
    branches: {
      type: [mongoose.Types.ObjectId],
      ref: 'Branch',
      get: toString,
    },

    ...timestamps,
  },
  { collection: 'accounts', timestamps: true }
);

module.exports = mongoose.model('Account', AccountSchema);
