const conceptModel = require('../models/concept.schema');
const accountModel = require('../models/account.schema');

const create = async (concept, user) => {
  console.log('create() concept started');

  const created = await conceptModel.create({
    ...concept,
    account: user.selectedAccount?.id,
  });

  await accountModel.updateOne(
    { _id: user.selectedAccount?.id },
    {
      $push: {
        concepts: created._id,
      },
    }
  );

  console.log('create() concept finished');

  return created;
};

const update = async (_id, concept) => {
  console.log('update() concept started');

  const updated = conceptModel.updateOne({ _id }, concept);

  console.log('update() concept finished');

  return updated;
};

const getOne = async (_id) => {
  console.log('getOne() concept started');

  const concept = await conceptModel
    .findById(_id)
    .populate('countries')
    .populate('equipments');

  console.log('getOne() concept finished');

  return concept.toObject();
};

module.exports = {
  create,
  getOne,
  update,
};
