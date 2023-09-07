const Joi = require("joi");
const categoryService = require("./../services/category.service");
var { Op } = require("sequelize");

const getCategoryList = async (req, res) => {
  try {
    const rows = await categoryService.getAllCategory();
    return res.status(200).json({
      status: "success",
      status_code: 200,
      data: rows,
    });
  } catch (error) {
    console.log("error-->", error);
    res.status(500).json({
      status: "fail",
      status_code: 500,
      error: error,
    });
  }
};

const addCategory = async (req, res) => {
  try {
    const { body } = req;
    const authSchema = Joi.object().keys({
      name: Joi.string().min(2).max(120).required(),
      parent_id: Joi.number().optional(),
    });
    let { value, error } = authSchema.validate(body);
    if (error) {
      return res.status(422).json({
        status: "fail",
        status_code: 422,
        error: error.details[0].message,
      });
    }
    let categoryExist = await categoryService.getCategoryById({
      name: value.name,
    });
    if (categoryExist) {
      return res.status(403).json({
        status: "fail",
        status_code: 403,
        error: "Category already exists",
      });
    }
    let newCategory = await categoryService.addCategory(value);
    if (!newCategory) {
      return res.status(403).json({
        status: "fail",
        status_code: 403,
        error: "Add product category failed",
      });
    }
    res.status(200).json({
      status: "success",
      status_code: 200,
      message: "Category created successfull",
    });
  } catch (error) {
    console.log("error-->", error);
    res.status(500).json({
      status: "fail",
      status_code: 500,
      error: error,
    });
  }
};

const getDetailCategory = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById({
      id: req.params.id,
    });
    return res
      .status(200)
      .json({ status: "success", status_code: 200, data: category });
  } catch (error) {
    console.log("error-->", error);
    res.status(500).json({
      status: "fail",
      status_code: 500,
      error: error,
    });
  }
};

const removeCategory = async (req, res) => {
  try {
    const category = await categoryService.removeCategory({
      id: req.params.id,
    });
    if (category)
      return res.status(200).json({
        status: "success",
        status_code: 200,
        message: "remove category successfully",
      });
    return res.status(500).json({
      status: "fail",
      status_code: 500,
      error: "COMMON_ERROR",
    });
  } catch (error) {
    console.log("error-->", error);
    res.status(500).json({
      status: "fail",
      status_code: 500,
      error: error,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { body } = req;
    const authSchema = Joi.object().keys({
      name: Joi.string().min(2).max(120).required(),
      parent_id: Joi.number().optional(),
    });
    let { value, error } = authSchema.validate(body);
    if (error) {
      return res.status(422).json({
        status: "fail",
        status_code: 422,
        error: error.details[0].message,
      });
    }

    const condition = {
      [Op.and]: [{ name: value.name }, { id: { [Op.not]: req.params.id } }],
    };
    let categoryExist = await categoryService.getCategoryById(condition);
    if (categoryExist) {
      return res.status(403).json({
        status: "fail",
        status_code: 403,
        error: "category already exists",
      });
    }
    value.id = parseInt(req.params.id);
    let updatedCategory = await categoryService.updateCategoryById(value);
    if (updatedCategory[0] === 1)
      return res.status(200).json({
        status: "success",
        status_code: 200,
        message: "category updated successfully",
      });
    return res.status(500).json({
      status: "fail",
      status_code: 500,
      error: "category update faild",
    });
  } catch (error) {
    console.log("error-->", error);
    res.status(500).json({
      status: "fail",
      status_code: 500,
      error: error,
    });
  }
};

module.exports = {
  getCategoryList,
  addCategory,
  getDetailCategory,
  removeCategory,
  updateCategory,
};
