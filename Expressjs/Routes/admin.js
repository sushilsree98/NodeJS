const express = require('express');
const ProductController = require('../controller/product')
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product',ProductController.getProducts);

// /admin/add-product => POST
router.post('/add-product',ProductController.postProducts);

module.exports = router