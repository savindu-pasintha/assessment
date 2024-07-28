const { DataTypes } = require('sequelize')
const sequelize = require('../sequalizeDB')

const employeeTable = sequelize.define('Employee', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
      validate: {
        is: /^UI[0-9A-Za-z]{7}$/,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[89][0-9]{7}$/,
      },
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female'),
      allowNull: false,
    },
  });

module.exports = employeeTable