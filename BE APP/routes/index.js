var express = require('express');
var router = express.Router();
const category = require('./category.route')
const product = require('./product.route')

router.use("/products", product);

router.use("/category", category);

module.exports = router;
