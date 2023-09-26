const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');

router.get('/', auth, userCtrl.getAllUsers);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/delete', auth, userCtrl.deleteUser);

module.exports = router;