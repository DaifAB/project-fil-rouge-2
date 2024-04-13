const {
  create,
  getOne,
  update,
  getAvailableBrands,
} = require('../controllers/branches.controller');

const router = require('express').Router();

router.post('/', create);
router.get('/:id', getOne);
router.put('/:id', update);
router.get('/:id/concepts/available', getAvailableBrands);

module.exports = router;
