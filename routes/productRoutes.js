import express from 'express';
import { getProducts, getProductById, getTopsellingProducts } from '../controllers/productController.js';

const router = express.Router();

// '/' means '/api/products
router.get('/', getProducts);
router.get('/topselling', getTopsellingProducts);
router.get('/:id', getProductById); // always should be last


export default router;
