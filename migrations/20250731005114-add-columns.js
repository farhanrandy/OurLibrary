'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Books', 'imageURL', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Books', 'description', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },


  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'password');
    await queryInterface.removeColumn('Users', 'role');
    await queryInterface.removeColumn('Books', 'imageURL');
    await queryInterface.removeColumn('Books', 'description');

  }
};
