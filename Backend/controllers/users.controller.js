const {
  setCustomUserClaims,
  register,
  connected,
} = require('../services/users.service');

exports.setUserClaims = async (req, res, next) => {
  try {
    await setCustomUserClaims(req.body);
    return res.status(200).json({ message: 'User claims updated' });
  } catch (error) {
    return next(new Error(error));
  }
};

exports.register = async (req, res, next) => {
  try {
    await register(req.body);
    return res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    return next(new Error(error));
  }
};

exports.connected = async (req, res, next) => {
  try {
    const user = await connected(req.user);
    return res.status(200).json({ ...user });
  } catch (error) {
    return next(new Error(error));
  }
};
