const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware.js');

const {setBudget, getBudget, updateBudget, deleteBudget} = require('../controllers/budget.controller.js');

router.use(authMiddleware);

router.post('/', setBudget);
router.get('/', getBudget);
router.put('/:id', updateBudget);
router.delete('/:id',deleteBudget);

module.exports = router;