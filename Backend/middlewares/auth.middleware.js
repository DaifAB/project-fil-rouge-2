const getUserPermissions = require('../utils/getUserPermissions');
const admin = require('firebase-admin');
const userModel = require('../models/user.schema');
const accountModel = require('../models/account.schema');

async function authMiddleware(req, res, next) {
  const response = {
    error: null,
    user: null,
  };

  try {
    const headers = req.headers;
    const authorization = headers.authorization;

    if (
      req.originalUrl?.includes('claims') ||
      req.originalUrl?.includes('cities') ||
      req.originalUrl?.includes('countries') ||
      req.originalUrl?.includes('users/register') ||
      req.originalUrl?.includes('messages/contact-us')
    ) {
      next();
      return { error: null, user: null };
    }

    let error = '';

    if (!authorization) {
      req.user = null;
      error = 'Authorization header missing';
    } else {
      let token = authorization.split(' ')[1];
      if (!token) {
        req.user = null;
        error = 'Token missing';
      } else {
        const firebaseUser = await admin.auth().verifyIdToken(token);
        uid = firebaseUser.uid;

        console.log('Looking for user with uid: ', uid);
        if (!uid) {
          req.user = null;
          error = 'Invalid token';
        } else {
          const user = (await userModel.findOne({ uid }))?.toObject();

          if (!user) {
            req.user = null;
            error = 'User do not exist';
          } else {
            const accounts = await accountModel.find({ users: user._id });
            const selectedAccount = accounts[0];
            const permissions = getUserPermissions(
              user,
              req.query.account,
              accounts
            );

            req.accessToken = token;
            req.user = {
              ...user,
              accounts,
              accountType: selectedAccount?.type,
              selectedAccount: selectedAccount,
              permissions: permissions.flatMap(
                (permission) => permission.permission
              ),
            };
          }
        }
      }
    }

    if (req.user) {
      next();
      response.user = req.user;
      return response;
    } else {
      res?.status(401)?.json({
        status: 401,
        message: error,
        error: 'Unauthorized',
      });
      console.log(error);
      response.error = error;
      return response;
    }
  } catch (error) {
    console.log(error);

    res?.status(401)?.json({
      statusCode: 401,
      message: 'An error happened',
      error: 'Unauthorized',
    });
    console.log(error);
    response.error = error;
    return response;
  }
}

module.exports = authMiddleware;
