const applicationModel = require('../models/application.schema');
const accountModel = require('../models/account.schema');
const branchModel = require('../models/branch.schema');

const getAll = async (status, branchId, conceptId, user) => {
  console.log('getAll() applications started');

  const applications = await applicationModel
    .find({
      $or: [{ sender: user._id }, { receiver: user._id }],
      ...(status ? { status: { $in: status } } : {}),
      ...(conceptId ? { 'branchApplication.concept': conceptId } : {}),
      ...(branchId ? { branch: branchId } : {}),
    })
    .populate('sender')
    .populate('receiver')
    .populate('branchApplication.concept')
    .populate('branch');

  console.log('getAll() applications finished');

  return applications;
};

const getOne = async (_id) => {
  console.log('getOne() application started');

  const application = await applicationModel
    .findById(_id)
    .populate('branch')
    .populate('concept')
    .populate('branchApplication.concept')
    .populate('conceptApplication.branch')
    .populate('sender')
    .populate('receiver');

  console.log('getOne() application finished');

  return application.toObject();
};

const create = async (userId, application) => {
  console.log('create() application started');

  const isBranchApplication = !!application.branchApplication;

  const item = isBranchApplication
    ? application.branchApplication.concept
    : application.conceptApplication.branch;

  const adminPermission = isBranchApplication ? 'brand_admin' : 'branch_admin';

  const account = await accountModel.findOne({
    ...{ [isBranchApplication ? 'concepts' : 'branches']: item },
    'permissions.permission': adminPermission,
  });

  const created = await applicationModel.create({
    ...application,
    sender: userId,
    receiver: account.owner,
  });

  console.log('create() application finished');

  return created;
};

const update = async (_id, application) => {
  console.log('update() application started');

  const updatedApplication = await applicationModel.findByIdAndUpdate(
    { _id },
    application,
    { new: true }
  );

  if (application.status === 'signed') {
    // get concept account
    const conceptAccount = await accountModel.findOne({
      type: 'brand',
      concepts: updatedApplication.branchApplication.concept,
    });

    await Promise.all([
      // update branch account
      accountModel.updateOne(
        { _id: updatedApplication.account },
        {
          $push: { concepts: updatedApplication.branchApplication.concept },
        }
      ),
      // update concept account
      accountModel.updateOne(
        { _id: conceptAccount._id },
        {
          $push: { branches: updatedApplication.branch },
        }
      ),
      // update branch
      branchModel.updateOne(
        { _id: updatedApplication.branch },
        { $push: { concepts: updatedApplication.branchApplication.concept } }
      ),
    ]);
  }

  console.log('update() application finished');

  return updatedApplication;
};

module.exports = {
  getAll,
  getOne,
  update,
  create,
};
