import express from 'express';
import { getCategoryWithProducts, getCategoryWithSubCategory, createCategory,updateCategory, deleteCategory } from '../controllers/categoryController.js';
const router = express.Router();


// '/' means '/api/categories
router.get('/categories-with-products', getCategoryWithProducts);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory);

export default router;
