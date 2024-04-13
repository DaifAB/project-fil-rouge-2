const { getAll } = require('../services/countries.service');

exports.getAll = async (req, res, next) => {
  try {
    const countries = await getAll();
    return res.status(200).json({ countries });
  } catch (error) {
    return next(new Error(error));
  }
};
