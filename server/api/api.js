'use strict'
const express = require('express');
const userRoutes = require('./user/userRoutes');
const groupRoutes = require('./group/groupRoutes');
const router = express.Router();

router.use('/user', userRoutes);
router.use('/group', groupRoutes);

module.exports = router;
