'use strict'
const router = require('express').Router();
const UsersCtrl = require('./userController');

router.get('/', UsersCtrl.signin);
router.post('/', UsersCtrl.create);

module.exports = router;
