'use strict';
import { v4 as uuidv4 } from 'uuid';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('users', [
    {
      id: uuidv4(),
      first_name: 'Alice',
      last_name: 'Johnson',
      email: 'alice.johnson@example.com',
      password: 'password123',
      role: 'ADMIN',
      language: 'am',           // 'am' or 'ar'
      status: 'VERIFIED',       // Only 'PENDING', 'VERIFIED', 'NOT VERIFIED'
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      first_name: 'Bob',
      last_name: 'Smith',
      email: 'bob.smith@example.com',
      password: 'password123',
      role: 'USER',
      language: 'am',
      status: 'VERIFIED',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      first_name: 'Charlie',
      last_name: 'Brown',
      email: 'charlie.brown@example.com',
      password: 'password123',
      role: 'USER',
      language: 'ar',
      status: 'PENDING',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      first_name: 'Diana',
      last_name: 'Prince',
      email: 'diana.prince@example.com',
      password: 'password123',
      role: 'USER',
      language: 'am',
      status: 'VERIFIED',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      first_name: 'Ethan',
      last_name: 'Hunt',
      email: 'ethan.hunt@example.com',
      password: 'password123',
      role: 'LIBRARIAN',
      language: 'ar',
      status: 'NOT VERIFIED',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('users', null, {});
}
