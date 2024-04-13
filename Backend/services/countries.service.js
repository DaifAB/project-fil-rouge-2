const countryModel = require('../models/country.schema');

const getAll = async () => {
  console.log('getAll() countries started');

  const countries = await countryModel.findById('test');

  console.log('getAll() countries finished');

  return countries;
};

module.exports = {
  getAll,
};
