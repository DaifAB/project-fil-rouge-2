const { getAll } = require('../controllers/cities.controller');

const router = require('express').Router();

router.get('/', getAll);

module.exports = router;
