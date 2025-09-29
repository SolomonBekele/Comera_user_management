'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    // Update the existing `isBorrowed` column to set default value to false
    await queryInterface.changeColumn('books', 'isBorrowed', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false, 
    });

    // Update existing records to set isBorrowed to false
    await queryInterface.sequelize.query(
        `UPDATE books SET isBorrowed = false WHERE isBorrowed IS NOT NULL;`
    );
}

export async function down(queryInterface, Sequelize) {
    // Revert the `isBorrowed` column back to default value true
    await queryInterface.changeColumn('books', 'isBorrowed', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Set default value back to true
    });
}