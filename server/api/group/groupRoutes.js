'use strict'
const router = require('express').Router();
const groupCtrl = require('./groupController');

router.get('/', groupCtrl.retrieve);
router.post('/', groupCtrl.create);

module.exports = router;
