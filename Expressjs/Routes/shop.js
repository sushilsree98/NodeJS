const express = require('express');

const ProductController = require('../controller/product')

const router = express.Router();

router.get('/', ProductController.shopProducts);

module.exports = router;
