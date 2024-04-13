const admin = require('firebase-admin');
const userModel = require('../models/user.schema');
const accountModel = require('../models/account.schema');

const setCustomUserClaims = async (user) => {
  console.log('setCustomUserClaims() started');

  await admin.auth().setCustomUserClaims(user.uid, {
    registered: false,
    accountType: user.accountType,
  });

  console.log('setCustomUserClaims() finished');

  return true;
};

const register = async (user) => {
  console.log('register() started');

  // create user
  const createdUser = await userModel.create({
    ...user,
    uid: user.uid,
    roles: ['account_owner'],
  });

  // create account
  const account = {
    name: user.accountName,
    owner: createdUser._id,
    type: user.accountType,
    users: [createdUser.id],
    permissions: [
      {
        userId: createdUser.id,
        items: [],
        permission: [
          user.accountType === 'branch' ? 'branch_admin' : 'brand_admin',
        ],
      },
    ],
    concepts: [],
    branches: [],
    suppliers: [],
  };

  const createdAccount = await accountModel.create(account);
  await userModel.findByIdAndUpdate(createdUser._id, {
    $push: { accounts: createdAccount._id },
  });

  await Promise.all([
    admin.auth().updateUser(user.uid, {
      displayName: user.name,
    }),
    admin.auth().setCustomUserClaims(user.uid, {
      registered: true,
      accountType: user.accountType,
    }),
  ]);

  console.log('register() finished');

  return createdUser;
};

const connected = async (authUser, user = authUser) => {
  if (authUser.roles.includes('account_owner')) {
    const accounts = await accountModel.find({
      type: authUser.accountType,
      users: user._id,
    });
    const items = accounts.flatMap((account) =>
      account.permissions.flatMap((permission) => permission.items)
    );

    user.accounts = accounts;
    user.items = items;
    user.permissions =
      accounts
        .find((account) => account.id === authUser.selectedAccount?.id)
        ?.permissions.filter(
          (permission) => permission.userId === user._id.toString()
        )
        .flatMap((permission) => permission.permission) || [];
  }

  return user;
};

module.exports = { setCustomUserClaims, register, connected };
