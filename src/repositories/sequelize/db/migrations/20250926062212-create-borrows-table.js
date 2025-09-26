"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("borrowings", {
    id: {
      type: Sequelize.STRING(36),
      defaultValue: Sequelize.literal('(UUID())'),
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: Sequelize.STRING(36),
      allowNull: false,
      references: {
        model: "users",   
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    bookId: {
      type: Sequelize.STRING(36),
      allowNull: false,
      references: {
        model: "books",   
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    borrowDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    returnDate: {
      type: Sequelize.DATE,
      allowNull: true, // null → book not yet returned
    }
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("borrowings");
}
