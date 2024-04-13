const { timestamps } = require('./timestamps');
const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema(
  {
    name: String,
    descriptions: String,
    ...timestamps,
  },
  { collection: 'equipments', timestamps: true }
);

module.exports = mongoose.model('Equipment', EquipmentSchema);
