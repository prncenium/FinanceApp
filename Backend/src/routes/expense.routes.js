const express = require('express');
const router = express.Router();

const {addExpense, getExpenses,getExpenseById, updateExpense, deleteExpense} = require('../controllers/expense.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');

router.use(authMiddleware);

router.post('/', addExpense);

router.get('/', getExpenses);

router.get('/:id',getExpenseById);

router.put('/:id',updateExpense);

router.delete('/:id',deleteExpense);

module.exports = router;
