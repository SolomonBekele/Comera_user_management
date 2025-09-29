"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("books", {
    id: {
      type: Sequelize.STRING(36),
      defaultValue: Sequelize.literal('(UUID())'),
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isbn: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    publication_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    publisher: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    language: {
       type: Sequelize.ENUM('am','ar','en'), 
       defaultValue: 'en' ,
    },
    isBorrowed:{
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  await queryInterface.addIndex('books', ['isbn'], {
    name: 'idx_book_isbn',
  });
}

export async function down(queryInterface) {
  await queryInterface.removeIndex("books", "idx_book_isbn");
  await queryInterface.dropTable("books");
}
