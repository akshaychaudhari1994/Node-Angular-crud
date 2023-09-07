// models/user.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Category = sequelize.define(
    "category",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "category", key: "id" },
      },
    },
    {
      timestamps: false, // Disable automatic generation of createdAt and updatedAt fields
    }
  );

  Category.associate = (models) => {
    Category.belongsToMany(models.product, {
      through: "product_categories",
      foreignKey: "categoryId",
    });
    Category.belongsTo(models.category, {
      foreignKey: "parent_id",
      as: "parentCategory",
    });
  };
  return Category;
};
