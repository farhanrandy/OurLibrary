'use strict';
let fs = require('fs').promises
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let dataBooks = JSON.parse(await fs.readFile('./data/books.json','utf-8'))
    dataBooks.forEach(el => {
      delete el.id
      el.createdDate = new Date()
      el.updatedDate = new Date()
    });
    return queryInterface.bulkInsert('Books', dataBooks)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {})
  }
};
