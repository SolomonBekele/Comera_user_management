'use strict';

/** @type {import('sequelize-cli').Migration} */

 export async function up (queryInterface, Sequelize) {
     await queryInterface.createTable('users', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
    },
    first_name: { type: Sequelize.STRING, allowNull: false },
    last_name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, unique: true, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    role: { type: Sequelize.ENUM('USER','LIBRARIAN','ADMIN'), allowNull: false },
    language: { type: Sequelize.ENUM('am','ar'), defaultValue: 'am' },
    status: { type: Sequelize.ENUM('PENDING','VERIFIED','NOT VERIFIED'), defaultValue: 'PENDING' },
    created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updated_at: {type: Sequelize.DATE}
  });
  }

 export async function down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }

