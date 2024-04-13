const {
  create,
  getOne,
  update,
} = require('../controllers/concepts.controller');

const router = require('express').Router();

router.post('/', create);
router.get('/:id', getOne);
router.put('/:id', update);

module.exports = router;
