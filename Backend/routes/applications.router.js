const {
  getAll,
  getOne,
  update,
  create,
} = require('../controllers/applications.controller');

const router = require('express').Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.patch('/:id', update);
router.post('/', create);

module.exports = router;
