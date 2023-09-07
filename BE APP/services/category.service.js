const models = require("../models");
const categoryModels = models.category;
const productCategoryModels = models.product_categories;
const { sequelize } = require("../models/index");

const addCategory = async (productCategoryDetail) => {
  try {
    return await categoryModels.create(productCategoryDetail);
  } catch (error) {
    console.log(error);
  }
};

const getAllCategory = async (condition, sort) => {
  try {
    return await categoryModels.findAll({
      distinct: true,
      include: { model: categoryModels, as: "parentCategory" },
    });
  } catch (error) {
    console.log(error);
  }
};

const getCategoryById = async (id) => {
  try {
    return await categoryModels.findOne({ where: { id: id.id } });
  } catch (error) {
    console.log(error);
  }
};

const updateCategoryById = async (productCategoryDetail) => {
  try {
    return await categoryModels.update(productCategoryDetail, {
      where: { id: productCategoryDetail.id },
    });
  } catch (error) {
    console.log(error);
  }
};

const removeCategory = async (condition) => {
  try {
    try {
      const t = await sequelize.transaction();

      try {
        await productCategoryModels.destroy({
          transaction: t,
          where: { categoryId: condition.id },
        });
        await categoryModels.update(
          { parent_id: null },
          {
            where: { parent_id: condition.id },
            transaction: t,
          }
        );

        await categoryModels.destroy({ where: condition, transaction: t });
        // Commit the transaction
        await t.commit();

        return true;
      } catch (error) {
        // Rollback the transaction if an error occurs
        await t.rollback();
        return error;
      }
    } catch (error) {
      console.log(error);
    }
    // return await categoryModels.destroy({ where: condition });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  removeCategory,
};
