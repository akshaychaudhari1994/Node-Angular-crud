const productController = require("./../controllers/product.controller");
const express = require("express");
const router = express.Router();
router.route("/add").post(productController.addProduct);
router.route("/list").get(productController.getProductList);
router.route("/detail/:id").get(productController.getDetailProduct);
router.route("/:id").delete(productController.removeProduct);
router.route("/update/:id").put(productController.updateProduct);
module.exports = router;
