'use strict'
const express = require('express');
const userRoutes = require('./user/userRoutes');
const router = express.Router();

router.use('/user', userRoutes);

module.exports = router;
