'use strict';
const bcrypt = require('bcrypt');

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
    }
  };
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      validate: {
        notEmpty: true,
        isAlpha: true,
        len: {
          args: [2,28],
          msg: "first name should be between 2 and 28 caracters"
        }
      }
      
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        len: {
          args: [2,28],
          msg: "last name should be between 2 and 28 caracters"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
        len: {
          args: [7,50],
          msg: "email should be between 7 and 50 caracters"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      set(value) {
        if (value.length > 5 && value.length < 26 ) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue('password', hash);
        } else {
          throw new Error('password should be between 6 and 25 caracters');
        }
       
      }
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};