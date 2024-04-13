const { getAll } = require('../controllers/countries.controller');

const router = require('express').Router();

router.get('/', getAll);

module.exports = router;
