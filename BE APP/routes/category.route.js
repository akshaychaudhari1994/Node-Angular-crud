const categoryController = require("./../controllers/category.controller");
const express = require("express");
const router = express.Router();
router.route("/add").post(categoryController.addCategory);
router.route("/list").get(categoryController.getCategoryList);
router.route("/detail/:id").get(categoryController.getDetailCategory);
router.route("/:id").delete(categoryController.removeCategory);
router.route("/update/:id").put(categoryController.updateCategory);

module.exports = router;
