'use strict'
const router = require('express').Router();
const UsersCtrl = require('./usersController');

router.get('/', UsersCtrl.getUsers);

module.exports = router;
