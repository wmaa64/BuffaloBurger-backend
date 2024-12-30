import express from 'express';
import { getCategories , getCategoryWithSubCategory, getCategoriesWithProducts , createCategory,updateCategory, deleteCategory } from '../controllers/categoryController.js';
const router = express.Router();

// '/' means '/api/categories
router.get('/', getCategories);
router.get('/categories-with-products', getCategoriesWithProducts);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory);
 
export default router;
