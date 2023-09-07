// models/user.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ProdCategory = sequelize.define(
    "product_categories",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "product",
          key: "id",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category",
          key: "id",
        },
      },
    },
    {
      timestamps: false, // Disable automatic generation of createdAt and updatedAt fields
    }
  );
  ProdCategory.associate = (models) => {
    ProdCategory.belongsTo(models.product, {  foreignKey: 'productId' });
    ProdCategory.belongsTo(models.category, {  foreignKey: 'categoryId' });
  }
  return ProdCategory;
};
