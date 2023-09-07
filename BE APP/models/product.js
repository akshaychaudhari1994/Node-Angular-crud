const productCategory = require("./product-category"); // Import the Category model
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: false, // Disable automatic generation of createdAt and updatedAt fields
  });
  Product.associate = (models) => {
    Product.belongsToMany(models.category, { through: "product_categories", foreignKey: 'productId' });
  }
  return Product;
};
