'use strict';
let formatDate = require('../helpers/formatDate')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Loan.belongsTo(models.User, { foreignKey: 'UserId' });
      Loan.belongsTo(models.Book, { foreignKey: 'BookId' });
;
    }
    get borrowFormat(){
      return formatDate(this.borrowDate)
    }
    get returnFormat(){
      return formatDate(this.returnDate)
    }
  }
  Loan.init({
    UserId: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER,
    borrowDate: DataTypes.DATE,
    returnDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Loan',
  });
  return Loan;
};