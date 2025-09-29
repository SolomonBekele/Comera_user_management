'use strict';

/** @type {import('sequelize-cli').Migration} */

 export async function up (queryInterface, Sequelize) {
     await queryInterface.createTable('users', {
    id: {
      type: Sequelize.STRING(36),
      defaultValue: Sequelize.literal('(UUID())'),
      primaryKey: true,
      allowNull: false,
    },
    first_name: { type: Sequelize.STRING, allowNull: false },
    last_name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, unique: true, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    role: { type: Sequelize.ENUM('USER','LIBRARIAN','ADMIN'), allowNull: false },
    language: { type: Sequelize.ENUM('am','ar','en'), defaultValue: 'en' },
    status: { type: Sequelize.ENUM('PENDING','VERIFIED','NOT VERIFIED'), defaultValue: 'PENDING' },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updatedAt: {type: Sequelize.DATE}
  });

  await queryInterface.addIndex('users', ['status'], {
    name: 'idx_user_status',
  });

  await queryInterface.addIndex('users', ['email'], {
    name: 'idx_user_email',
  });

  }

 export async function down (queryInterface, Sequelize) {
    await queryInterface.removeIndex("users", "idx_user_status");
    await queryInterface.removeIndex("users", "idx_user_email");
    await queryInterface.dropTable('users');
  }

