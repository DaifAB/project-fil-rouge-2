const equipmentModel = require('../models/equipment.schema');

const getAll = async () => {
  console.log('getAll() equipments started');

  const countries = await equipmentModel.find();

  console.log('getAll() equipments finished');

  return countries;
};

module.exports = {
  getAll,
};
