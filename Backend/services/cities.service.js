const cityModel = require('../models/city.schema');

const getAll = async (country) => {
  console.log('getAll() cities started');

  const cities = await cityModel.find({ country: country });

  console.log('getAll() cities finished');

  return cities;
};

module.exports = {
  getAll,
};
