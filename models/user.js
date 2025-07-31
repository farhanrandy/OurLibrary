'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { foreignKey: 'UserId' });
      User.belongsToMany(models.Book, { through: models.Loan, foreignKey: 'UserId' });
      User.hasMany(models.Loan, { foreignKey: 'UserId' });


    }
  }
  User.init({
    name: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
    notEmpty: { msg: "Name is required" },
    notNull: { msg: "Name is required" },
    len: {
      args: [3, 50],
      msg: "Name must be between 3 to 50 characters"
    }
  }
},
email: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
  validate: {
    notEmpty: { msg: "Email is required" },
    notNull: { msg: "Email is required" },
    isEmail: { msg: "Must be a valid email address" }
  }
},
password: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
    notNull: { msg: "Password is required" },
    notEmpty: { msg: "Password is required" },
    len: {
      args: [8, 100],
      msg: "Password must be at least 8 characters"
    }
  }
},
    role: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'User',
    hooks: {
    beforeCreate: async (user, options) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
    }
  }
  });
  return User;
};