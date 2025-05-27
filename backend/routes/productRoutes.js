const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/product', productController.uploadMiddleware, productController.createProduct);
router.get('/product', productController.getAllProducts);
router.put('/product/:id', productController.uploadMiddleware, productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

module.exports = router;
