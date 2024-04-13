const { create, getOne, update } = require('../services/concepts.service');

exports.create = async (req, res, next) => {
  try {
    const concept = await create(req.body, req.user);
    return res.status(200).json({ ...concept });
  } catch (error) {
    return next(new Error(error));
  }
};

exports.update = async (req, res, next) => {
  try {
    const concept = await update(req.params?.id, req.body);
    return res.status(200).json({ ...concept });
  } catch (error) {
    return next(new Error(error));
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const concept = await getOne(req.params?.id);
    return res.status(200).json({ ...concept });
  } catch (error) {
    return next(new Error(error));
  }
};
