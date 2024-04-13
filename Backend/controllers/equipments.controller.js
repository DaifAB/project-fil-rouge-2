const { getAll } = require('../services/equipments.service');

exports.getAll = async (req, res, next) => {
  try {
    const equipments = await getAll();
    return res.status(200).json({ equipments });
  } catch (error) {
    return next(new Error(error));
  }
};
