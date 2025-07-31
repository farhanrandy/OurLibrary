'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
   static associate(models) {
    Book.belongsTo(models.Category, { foreignKey: 'CategoryId' });
    Book.belongsToMany(models.User, { through: models.Loan, foreignKey: 'BookId' });
    Book.hasMany(models.Loan, { foreignKey: 'BookId' });
  }

  static async searchByTitle(title) {
    return await Book.findAll({
      where: {
        title: {
          [Op.iLike]: `%${title}%`
        }
      },
      include: 'Category'
    });
  }
  }
  Book.init({
    title: DataTypes.STRING,
    authorName: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    description: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Book',
    hooks: {
  beforeSave: (book, options) => {
    if (book.title) {
      book.title = book.title
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }

    if (book.authorName) {
      book.authorName = book.authorName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
  }
}

  });
  return Book;
};