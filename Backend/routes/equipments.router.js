const { getAll } = require('../controllers/equipments.controller');

const router = require('express').Router();

router.get('/', getAll);

module.exports = router;
