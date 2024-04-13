function getUserPermissions(user, accountId, accounts) {
  const account = (accounts || user.accounts).find(
    (_account) => _account.id === accountId
  );

  const permissions =
    account?.permissions.filter(
      (permission) => permission.userId.toString() === user._id.toString()
    ) || [];

  return permissions;
}

module.exports = getUserPermissions;
