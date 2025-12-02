const express = require('express');
const router = express.Router();
const { getBalance, addFunds } = require('../controllers/user.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');

router.get('/balance', authMiddleware, getBalance);
router.post('/add-funds', authMiddleware, addFunds);

module.exports = router;
