const {
  create,
  getOne,
  update,
  getAvailableBrands,
} = require('../services/branches.service');

exports.create = async (req, res, next) => {
  try {
    const branch = await create(req.body, req.user);
    return res.status(200).json({ ...branch });
  } catch (error) {
    return next(new Error(error));
  }
};

exports.update = async (req, res, next) => {
  try {
    const branch = await update(req.params?.id, req.body);
    return res.status(200).json({ ...branch });
  } catch (error) {
    return next(new Error(error));
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const branch = await getOne(req.params?.id);
    return res.status(200).json({ ...branch });
  } catch (error) {
    return next(new Error(error));
  }
};

exports.getAvailableBrands = async (req, res, next) => {
  try {
    const concepts = await getAvailableBrands(req.params?.id);
    return res.status(200).json(concepts);
  } catch (error) {
    return next(new Error(error));
  }
};
