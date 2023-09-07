const models = require("../models");
const productModels = models.product;
const categoryModels = models.category;
const productCategoryModels = models.product_categories;

const { sequelize } = require("../models/index");

const addProduct = async (productDetail) => {
  try {
    const { name, categoryIds, price } = productDetail;

    const t = await sequelize.transaction();

    try {
      const product = await productModels.create(
        { name, price },
        { transaction: t }
      );

      if (categoryIds && categoryIds.length > 0) {
        await productCategoryModels.bulkCreate(
          categoryIds.map((categoryId) => ({
            productId: product.id,
            categoryId,
          })),
          { transaction: t }
        );
      }

      // Commit the transaction
      await t.commit();

      return product;
    } catch (error) {
      // Rollback the transaction if an error occurs
      await t.rollback();
      return error;
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllProduct = async () => {
  try {
    return await productModels.findAll({
      include: { model: categoryModels, through: { attributes: [] } },
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductDetail = async (condition) => {
  try {
    return await productModels.findOne({
      where: condition,
      include: { model: categoryModels, through: { attributes: [] } },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProductDetail = async (productDetail) => {
  try {
    return await productModels.update(productDetail, {
      where: { id: productDetail.id },
    });
  } catch (error) {
    console.log(error);
  }
};

const removeProduct = async (condition) => {
  try {
    const t = await sequelize.transaction();

    try {
      await productCategoryModels.destroy({
        transaction: t,
        where: { productId: condition.id },
      });

      await productModels.destroy({ where: condition, transaction: t });
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
};

module.exports = {
  addProduct,
  getAllProduct,
  getProductDetail,
  updateProductDetail,
  removeProduct,
};
