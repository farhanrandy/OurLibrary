'use strict';
let fs = require('fs').promises
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let dataCategory = JSON.parse(await fs.readFile('./data/categories.json','utf-8'))
    dataCategory.forEach(el => {
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
    });
    return queryInterface.bulkInsert('Categories', dataCategory)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
