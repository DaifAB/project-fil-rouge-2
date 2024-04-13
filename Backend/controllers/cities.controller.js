const { getAll } = require('../services/cities.service');

exports.getAll = async (req, res, next) => {
  try {
    const { country } = req.query;
    const cities = await getAll(country);
    return res.status(200).json({ cities });
  } catch (error) {
    return next(new Error(error));
  }
};
