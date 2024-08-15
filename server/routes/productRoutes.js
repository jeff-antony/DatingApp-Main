import express from 'express';
import { addProduct,getProducts } from '../controllers/productController.js';
import { addToCart,updateCartQuantity ,getCartByUser } from '../controllers/productController.js';
const router = express.Router();

router.get('/getProducts', getProducts);
router.post('/addProduct', addProduct);

// Cart Routes
router.post('/addCart', addToCart);
router.put('/cart/quantity/:userId', updateCartQuantity);
router.get('/cart/:userId', getCartByUser);

export default router;