const toString = require('./toString');
const { timestamps } = require('./timestamps');
const mongoose = require('mongoose');

const proposalStatuses = ['sent', 'counter', 'accepted', 'rejected'];

const StorageCapacitySchema = new mongoose.Schema({
  freezer: Number,
  fridge: Number,
  dry: Number,
});

const proposalSchema = new mongoose.Schema({
  onboardingFee: Number,
  fixedMonthlyFee: Number,
  fixedAnnualFee: Number,
  orderFee: Number,
  orderFeeUnit: String,
  kitchenMessage: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: proposalStatuses,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const BranchApplicationSchema = new mongoose.Schema({
  concept: {
    type: mongoose.Types.ObjectId,
    ref: 'Concept',
    get: toString,
  },
  experience: {
    type: String,
    enum: ['1', '2', '5', '5+'],
  },
  ordersPerDay: Number,
  staffCount: Number,
  brandsCount: Number,
  brandsTypes: String,
  storageCapacity: {
    type: StorageCapacitySchema,
  },
  message: String,
  acceptTerms: Boolean,
  sendInfo: Boolean,
  beContacted: Boolean,
});

const ConceptApplicationSchema = new mongoose.Schema({
  branch: {
    type: mongoose.Types.ObjectId,
    ref: 'Branch',
    get: toString,
  },
});

const ApplicationSchema = new mongoose.Schema(
  {
    __id: String,

    type: {
      type: String,
      enum: ['brand', 'kitchen'],
      required: true,
    },
    account: {
      type: mongoose.Types.ObjectId,
      ref: 'Account',
      get: toString,
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'sent', 'reviewing', 'reviewed', 'rejected', 'signed'],
      required: true,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      get: toString,
      required: true,
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      get: toString,
      required: true,
    },
    concept: {
      type: mongoose.Types.ObjectId,
      ref: 'Concept',
      get: toString,
    },
    branch: {
      type: mongoose.Types.ObjectId,
      ref: 'Branch',
      get: toString,
    },
    branchApplication: {
      type: BranchApplicationSchema,
    },
    conceptApplication: {
      type: ConceptApplicationSchema,
    },
    proposals: {
      type: [proposalSchema],
    },

    ...timestamps,
  },
  { timestamps: true, collection: 'applications' }
);

module.exports = mongoose.model('Application', ApplicationSchema);
