'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Profiles", "imageURL", {
    type: Sequelize.STRING,
    allowNull: true,
  })

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Profiles", "imageURL")

  }
};
