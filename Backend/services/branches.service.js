const branchModel = require('../models/branch.schema');
const accountModel = require('../models/account.schema');
const conceptModel = require('../models/concept.schema');

const create = async (branch, user) => {
  console.log('create() branch started');

  const created = await branchModel.create({
    ...branch,
    account: user.selectedAccount?.id,
  });

  await accountModel.updateOne(
    { _id: user.selectedAccount?.id },
    {
      $push: {
        branches: created._id,
      },
    }
  );

  console.log('create() branch finished');

  return created;
};

const update = async (_id, branch) => {
  console.log('update() branch started');

  const updated = branchModel.updateOne({ _id }, branch);

  console.log('update() branch finished');

  return updated;
};

const getOne = async (_id) => {
  console.log('getOne() branch started');

  const branch = await branchModel
    .findById(_id)
    .populate('equipments')
    .populate('address.city');

  console.log('getOne() branch finished');

  return branch.toObject();
};

const getAvailableBrands = async (branchId) => {
  console.log('getAvailableBrands() started');

  const branch = await branchModel.findById(branchId).populate({
    path: 'address.city',
    populate: {
      path: 'country',
    },
  });

  const branchCountry = branch.address.city.country;

  const availableConcepts = await conceptModel.find({
    countries: branchCountry._id,
  });

  const concepts = await Promise.all(
    availableConcepts.map(async (concept) => {
      const branches = await branchModel
        .find({
          concepts: concept._id,
          address: {
            $exists: true,
          },
        })
        .populate({
          path: 'address.city',
          match: {
            country: branchCountry._id,
          },
        });

      return {
        ...concept.toObject(),
        cookedBy: branches.length,
        cookedIn: branchCountry,
      };
    })
  );

  console.log('getAvailableBrands() finished');

  return concepts;
};

module.exports = {
  create,
  getOne,
  update,
  getAvailableBrands,
};
