const {
  getAll,
  getOne,
  update,
  create,
} = require('../services/applications.service');

exports.getAll = async (req, res, next) => {
  try {
    const { status: statusString, branchId, conceptId } = req.query;
    const user = req.user;
    const status = statusString.split(',');
    const applications = await getAll(status, branchId, conceptId, user);
    return res.status(200).json({ applications });
  } catch (error) {
    return next(new Error(error));
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const application = await getOne(req.params?.id);
    return res.status(200).json({ ...application });
  } catch (error) {
    return next(new Error(error));
  }
};

exports.update = async (req, res, next) => {
  try {
    const application = await update(req.params?.id, req.body);
    return res.status(200).json({ ...application });
  } catch (error) {
    return next(new Error(error));
  }
};

exports.create = async (req, res, next) => {
  try {
    const application = await create(req.user._id, req.body);
    return res.status(200).json({ ...application.toObject() });
  } catch (error) {
    return next(new Error(error));
  }
};
