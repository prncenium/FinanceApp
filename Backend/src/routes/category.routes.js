const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

const {createCategory,getCategory,updateCategory,deleteCategory} = require('../controllers/category.controller.js');

router.use(authMiddleware);

router.post('/', createCategory);

router.get('/', getCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);

module.exports = router;