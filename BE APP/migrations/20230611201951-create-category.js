module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("category", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      parent_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        references: {
          model: "category",
          key: "id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("category");
  },
};
