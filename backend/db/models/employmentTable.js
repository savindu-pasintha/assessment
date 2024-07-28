const { DataTypes } = require('sequelize')
const sequelize = require('../sequalizeDB')

const employmentTable = sequelize.define('Employment', {
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
});

module.exports = employmentTable