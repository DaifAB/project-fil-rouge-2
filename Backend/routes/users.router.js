const {
  setUserClaims,
  register,
  connected,
} = require('../controllers/users.controller');

const router = require('express').Router();

router.patch('/claims', setUserClaims);
router.post('/register', register);
router.get('/connected', connected);

module.exports = router;
