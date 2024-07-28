const { Sequelize } = require('sequelize')
const {decrypt} = require('../utilities')
require('dotenv').config()

const sequelize = new Sequelize(
  decrypt(process.env.DATABASE_NAME),
  decrypt(process.env.DATABASE_USER_NAME),
  decrypt(process.env.DATABASE_PASSWORD),
  {
    host: decrypt(process.env.DATABASE_HOST),
    port: decrypt(process.env.DATABASE_PORT),
    dialect: process.env.DATABASE_TYPE,
  },
);

module.exports = sequelize
///* one of  | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
