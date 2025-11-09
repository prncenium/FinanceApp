const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware.js');

const {createGoal, getGoals, updateGoal, deleteGoal, addSavingsToGoal} = require('../controllers/goal.controller.js');

router.use(authMiddleware);

router.post('/', createGoal);
router.get('/', getGoals);
router.put('/:id', updateGoal);
router.delete('/:id',deleteGoal);
router.post('/:id/add', addSavingsToGoal);

module.exports = router;