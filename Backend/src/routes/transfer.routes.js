const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware.js');

const {transferMoney, getTransactionHistory} = require('../controllers/transfer.controller.js');

router.use(authMiddleware);

router.post('/',transferMoney);

router.get('/', getTransactionHistory);

module.exports = router;